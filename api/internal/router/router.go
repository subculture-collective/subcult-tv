package router

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/subculture-collective/subcult-tv/api/internal/config"
	"github.com/subculture-collective/subcult-tv/api/internal/handlers"
	"github.com/subculture-collective/subcult-tv/api/internal/middleware"
)

// New creates a configured Chi router with all API routes.
func New(cfg *config.Config, h *handlers.Handler) *chi.Mux {
	r := chi.NewRouter()

	// Rate limiters for different endpoint types
	generalLimiter := middleware.NewRateLimiter(100, time.Minute)   // 100 req/min general
	loginLimiter := middleware.NewRateLimiter(5, time.Minute)       // 5 req/min for login
	publicFormLimiter := middleware.NewRateLimiter(10, time.Minute) // 10 req/min for forms

	// ── Global middleware ────────────────────────────────────
	r.Use(chimw.RealIP)
	r.Use(chimw.RequestID)
	r.Use(middleware.Logger)
	r.Use(chimw.Recoverer)
	r.Use(chimw.Compress(5))
	r.Use(middleware.SecurityHeaders)
	r.Use(middleware.LimitBody)
	r.Use(middleware.RateLimit(generalLimiter))

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   cfg.CORSOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// ── Health ───────────────────────────────────────────────
	r.Get("/healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok","service":"subcvlt-api"}`))
	})

	// ── API v1 ───────────────────────────────────────────────
	r.Route("/api/v1", func(api chi.Router) {

		// Public routes with stricter rate limiting for sensitive endpoints
		api.With(middleware.RateLimit(loginLimiter)).Post("/auth/login", h.Login)

		api.Get("/projects", h.ListProjects)
		api.Get("/projects/{slug}", h.GetProject)

		api.Get("/posts", h.ListPosts)
		api.Get("/posts/{slug}", h.GetPost)

		api.With(middleware.RateLimit(publicFormLimiter)).Post("/contacts", h.SubmitContact)

		api.With(middleware.RateLimit(publicFormLimiter)).Post("/newsletter/subscribe", h.Subscribe)
		api.With(middleware.RateLimit(publicFormLimiter)).Post("/newsletter/unsubscribe", h.Unsubscribe)

		// ── Protected (admin) routes ────────────────────────
		api.Group(func(admin chi.Router) {
			admin.Use(middleware.Auth(cfg.JWTSecret))

			admin.Get("/auth/me", h.Me)

			// Admin dashboard
			admin.Get("/admin/stats", h.DashboardStats)

			// Projects CRUD
			admin.Post("/projects", h.CreateProject)
			admin.Put("/projects/{id}", h.UpdateProject)
			admin.Delete("/projects/{id}", h.DeleteProject)

			// Posts CRUD
			admin.Post("/posts", h.CreatePost)
			admin.Put("/posts/{id}", h.UpdatePost)
			admin.Delete("/posts/{id}", h.DeletePost)

			// Contacts management
			admin.Get("/contacts", h.ListContacts)
			admin.Patch("/contacts/{id}/read", h.MarkContactRead)
			admin.Delete("/contacts/{id}", h.DeleteContact)

			// Newsletter management
			admin.Get("/newsletter/subscribers", h.ListSubscribers)
		})
	})

	return r
}
