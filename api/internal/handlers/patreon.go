package handlers

import "net/http"

// GetPatreonCampaign returns live Patreon campaign + tier data.
func (h *Handler) GetPatreonCampaign(w http.ResponseWriter, r *http.Request) {
	if h.Patreon == nil || !h.Patreon.Enabled() {
		writeJSON(w, http.StatusOK, map[string]interface{}{
			"campaign":  nil,
			"tiers":     []interface{}{},
			"cached_at": nil,
		})
		return
	}

	data, err := h.Patreon.GetCampaign(r.Context())
	if err != nil {
		writeError(w, http.StatusBadGateway, "failed to fetch Patreon data")
		return
	}

	writeJSON(w, http.StatusOK, data)
}
