package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/subculture-collective/subcult-tv/api/internal/models"
)

// Subscribe adds an email to the newsletter (public).
func (h *Handler) Subscribe(w http.ResponseWriter, r *http.Request) {
	var req models.SubscribeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.Email == "" {
		writeError(w, http.StatusBadRequest, "email is required")
		return
	}

	unsubToken := uuid.New().String()

	_, err := h.DB.Exec(r.Context(),
		`INSERT INTO subscribers (email, unsubscribe_token, confirmed)
		 VALUES ($1, $2, true)
		 ON CONFLICT (email) DO UPDATE SET unsubscribed_at = NULL`,
		req.Email, unsubToken,
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to subscribe")
		return
	}

	writeJSON(w, http.StatusCreated, map[string]string{
		"message": "subscribed — welcome to the signal",
	})
}

// Unsubscribe removes an email from the newsletter using a token (public).
func (h *Handler) Unsubscribe(w http.ResponseWriter, r *http.Request) {
	var req models.UnsubscribeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.Token == "" {
		writeError(w, http.StatusBadRequest, "unsubscribe token is required")
		return
	}

	tag, err := h.DB.Exec(r.Context(),
		`UPDATE subscribers SET unsubscribed_at = NOW() WHERE unsubscribe_token = $1 AND unsubscribed_at IS NULL`,
		req.Token,
	)
	if err != nil || tag.RowsAffected() == 0 {
		writeError(w, http.StatusNotFound, "invalid token or already unsubscribed")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message": "unsubscribed — signal dropped",
	})
}

// ListSubscribers returns all active subscribers (admin only).
func (h *Handler) ListSubscribers(w http.ResponseWriter, r *http.Request) {
	page, perPage, offset := pagination(r)

	var total int64
	if err := h.DB.QueryRow(r.Context(),
		`SELECT COUNT(*) FROM subscribers WHERE unsubscribed_at IS NULL`,
	).Scan(&total); err != nil {
		writeError(w, http.StatusInternalServerError, "failed to count subscribers")
		return
	}

	rows, err := h.DB.Query(r.Context(),
		`SELECT id, email, confirmed, subscribed_at, unsubscribed_at
		 FROM subscribers WHERE unsubscribed_at IS NULL
		 ORDER BY subscribed_at DESC LIMIT $1 OFFSET $2`, perPage, offset,
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to query subscribers")
		return
	}
	defer rows.Close()

	var subs []models.Subscriber
	for rows.Next() {
		var s models.Subscriber
		if err := rows.Scan(&s.ID, &s.Email, &s.Confirmed, &s.SubscribedAt, &s.UnsubscribedAt); err != nil {
			writeError(w, http.StatusInternalServerError, "failed to scan subscriber")
			return
		}
		subs = append(subs, s)
	}

	if subs == nil {
		subs = []models.Subscriber{}
	}

	writeJSON(w, http.StatusOK, models.PaginatedResponse[models.Subscriber]{
		Data:       subs,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages(total, perPage),
	})
}
