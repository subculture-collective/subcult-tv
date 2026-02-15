package handlers

import (
	"encoding/json"
	"math"
	"net/http"
	"strconv"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Handler bundles dependencies for all HTTP handlers.
type Handler struct {
	DB        *pgxpool.Pool
	JWTSecret string
}

// New creates a new Handler.
func New(db *pgxpool.Pool, jwtSecret string) *Handler {
	return &Handler{DB: db, JWTSecret: jwtSecret}
}

// ── Helpers ──────────────────────────────────────────────────

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]interface{}{
		"error": msg,
		"code":  status,
	})
}

func pagination(r *http.Request) (page, perPage int, offset int) {
	page, _ = strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}
	perPage, _ = strconv.Atoi(r.URL.Query().Get("per_page"))
	if perPage < 1 || perPage > 100 {
		perPage = 20
	}
	offset = (page - 1) * perPage
	return
}

func totalPages(total int64, perPage int) int {
	return int(math.Ceil(float64(total) / float64(perPage)))
}
