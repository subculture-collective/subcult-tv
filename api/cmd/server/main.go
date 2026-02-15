package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"

	"github.com/subculture-collective/subcult-tv/api/internal/config"
	"github.com/subculture-collective/subcult-tv/api/internal/database"
	"github.com/subculture-collective/subcult-tv/api/internal/handlers"
	"github.com/subculture-collective/subcult-tv/api/internal/router"
)

func main() {
	// Load .env if present (dev mode)
	_ = godotenv.Load("../.env")
	_ = godotenv.Load(".env")

	slog.Info("starting subcvlt api server")

	cfg, err := config.Load()
	if err != nil {
		slog.Error("config", "error", err)
		os.Exit(1)
	}

	// ── Database ─────────────────────────────────────────────
	ctx := context.Background()
	pool, err := database.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		slog.Error("database connect", "error", err)
		os.Exit(1)
	}
	defer pool.Close()
	slog.Info("database connected")

	// ── Migrations ───────────────────────────────────────────
	if err := database.Migrate(ctx, pool); err != nil {
		slog.Error("migrations", "error", err)
		os.Exit(1)
	}
	slog.Info("migrations applied")

	// ── Seed admin user if none exists ───────────────────────
	if err := seedAdminUser(ctx, pool); err != nil {
		slog.Warn("seed admin", "error", err)
	}

	// ── Router ───────────────────────────────────────────────
	h := handlers.New(pool, cfg.JWTSecret)
	r := router.New(cfg, h)

	srv := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// ── Graceful shutdown ────────────────────────────────────
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		slog.Info("server listening", "port", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("server", "error", err)
			os.Exit(1)
		}
	}()

	<-quit
	slog.Info("shutting down server...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		slog.Error("forced shutdown", "error", err)
	}

	slog.Info("server stopped")
}

func seedAdminUser(ctx context.Context, pool *pgxpool.Pool) error {
	var count int64
	if err := pool.QueryRow(ctx, `SELECT COUNT(*) FROM users`).Scan(&count); err != nil {
		return err
	}
	if count > 0 {
		return nil // already has users
	}

	// Default admin: admin / subcvlt2026
	// CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION
	hash := "$2a$12$LJ3mFGn3C3gCXz1kKDY4Z.f.RfLHr/cq4p7H9H1U2nkEXOQqLgKCi"
	_, err := pool.Exec(ctx,
		`INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)`,
		"admin", "admin@subcult.tv", hash, "admin",
	)
	if err != nil {
		return fmt.Errorf("seed admin: %w", err)
	}

	slog.Info("seeded default admin user", "username", "admin")
	return nil
}
