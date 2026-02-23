package patreon

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"sort"
	"sync"
	"time"
)

// ── Public response types ────────────────────────────────────

// CampaignData is the cleaned-up shape returned to callers.
type CampaignData struct {
	Campaign *CampaignInfo `json:"campaign"`
	Tiers    []TierInfo    `json:"tiers"`
	CachedAt *time.Time    `json:"cached_at"`
}

type CampaignInfo struct {
	PatronCount  int    `json:"patron_count"`
	CreationName string `json:"creation_name"`
	URL          string `json:"url"`
}

type TierInfo struct {
	Title       string `json:"title"`
	AmountCents int    `json:"amount_cents"`
	PatronCount int    `json:"patron_count"`
	Description string `json:"description"`
	Published   bool   `json:"published"`
}

// ── JSON:API envelope types (Patreon v2 format) ──────────────

type jsonAPIResponse struct {
	Data     jsonAPIResource   `json:"data"`
	Included []jsonAPIResource `json:"included"`
}

type jsonAPIResource struct {
	Type       string          `json:"type"`
	ID         string          `json:"id"`
	Attributes json.RawMessage `json:"attributes"`
}

type campaignAttrs struct {
	PatronCount  int    `json:"patron_count"`
	CreationName string `json:"creation_name"`
	URL          string `json:"url"`
}

type tierAttrs struct {
	Title       string `json:"title"`
	AmountCents int    `json:"amount_cents"`
	PatronCount int    `json:"patron_count"`
	Description string `json:"description"`
	Published   bool   `json:"published"`
}

// ── Client ───────────────────────────────────────────────────

const baseURL = "https://www.patreon.com/api/oauth2/v2"

// Client fetches and caches Patreon campaign data.
type Client struct {
	httpClient *http.Client
	token      string
	campaignID string
	cacheTTL   time.Duration

	mu       sync.Mutex
	cached   *CampaignData
	cachedAt time.Time
}

// New creates a Patreon API client. Pass empty token/campaignID
// to create a disabled client (Enabled() returns false).
func New(token, campaignID string, ttl time.Duration) *Client {
	return &Client{
		httpClient: &http.Client{Timeout: 10 * time.Second},
		token:      token,
		campaignID: campaignID,
		cacheTTL:   ttl,
	}
}

// Enabled returns true if the client has credentials configured.
func (c *Client) Enabled() bool {
	return c.token != "" && c.campaignID != ""
}

// GetCampaign returns campaign + tier data, using cache when fresh.
func (c *Client) GetCampaign(ctx context.Context) (*CampaignData, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.cached != nil && time.Since(c.cachedAt) < c.cacheTTL {
		return c.cached, nil
	}

	data, err := c.fetch(ctx)
	if err != nil {
		if c.cached != nil {
			slog.Warn("patreon fetch failed, returning stale cache", "error", err)
			return c.cached, nil
		}
		return nil, fmt.Errorf("patreon fetch: %w", err)
	}

	now := time.Now().UTC()
	data.CachedAt = &now
	c.cached = data
	c.cachedAt = now
	return data, nil
}

func (c *Client) fetch(ctx context.Context) (*CampaignData, error) {
	url := fmt.Sprintf(
		"%s/campaigns/%s?include=tiers&fields[campaign]=patron_count,creation_name,url&fields[tier]=title,amount_cents,patron_count,description,published",
		baseURL, c.campaignID,
	)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+c.token)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(io.LimitReader(resp.Body, 1024))
		return nil, fmt.Errorf("patreon API %d: %s", resp.StatusCode, string(body))
	}

	var envelope jsonAPIResponse
	if err := json.NewDecoder(resp.Body).Decode(&envelope); err != nil {
		return nil, fmt.Errorf("decode response: %w", err)
	}

	// Parse campaign attributes
	var ca campaignAttrs
	if err := json.Unmarshal(envelope.Data.Attributes, &ca); err != nil {
		return nil, fmt.Errorf("decode campaign attrs: %w", err)
	}

	// Parse included tiers
	var tiers []TierInfo
	for _, inc := range envelope.Included {
		if inc.Type != "tier" {
			continue
		}
		var ta tierAttrs
		if err := json.Unmarshal(inc.Attributes, &ta); err != nil {
			slog.Warn("skipping malformed tier", "id", inc.ID, "error", err)
			continue
		}
		if !ta.Published {
			continue
		}
		tiers = append(tiers, TierInfo{
			Title:       ta.Title,
			AmountCents: ta.AmountCents,
			PatronCount: ta.PatronCount,
			Description: ta.Description,
			Published:   ta.Published,
		})
	}

	sort.Slice(tiers, func(i, j int) bool {
		return tiers[i].AmountCents < tiers[j].AmountCents
	})

	return &CampaignData{
		Campaign: &CampaignInfo{
			PatronCount:  ca.PatronCount,
			CreationName: ca.CreationName,
			URL:          ca.URL,
		},
		Tiers: tiers,
	}, nil
}
