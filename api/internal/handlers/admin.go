package handlers

import (
	"net/http"

	"github.com/subculture-collective/subcult-tv/api/internal/models"
)

// DashboardStats returns aggregate counts for the admin dashboard.
func (h *Handler) DashboardStats(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var stats models.DashboardStats

	queries := []struct {
		sql  string
		dest *int64
	}{
		{`SELECT COUNT(*) FROM projects`, &stats.TotalProjects},
		{`SELECT COUNT(*) FROM posts`, &stats.TotalPosts},
		{`SELECT COUNT(*) FROM contacts`, &stats.TotalContacts},
		{`SELECT COUNT(*) FROM contacts WHERE read = false`, &stats.UnreadContacts},
		{`SELECT COUNT(*) FROM subscribers WHERE unsubscribed_at IS NULL`, &stats.TotalSubscribers},
	}

	for _, q := range queries {
		if err := h.DB.QueryRow(ctx, q.sql).Scan(q.dest); err != nil {
			writeError(w, http.StatusInternalServerError, "failed to fetch stats")
			return
		}
	}

	writeJSON(w, http.StatusOK, stats)
}
