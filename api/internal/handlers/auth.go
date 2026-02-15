package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/subculture-collective/subcult-tv/api/internal/models"
	"golang.org/x/crypto/bcrypt"
)

// Login authenticates an admin user and returns a JWT.
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.Username == "" || req.Password == "" {
		writeError(w, http.StatusBadRequest, "username and password are required")
		return
	}

	var user models.User
	err := h.DB.QueryRow(r.Context(),
		`SELECT id, username, email, password_hash, role, created_at, updated_at
		 FROM users WHERE username = $1`, req.Username,
	).Scan(&user.ID, &user.Username, &user.Email, &user.PasswordHash, &user.Role, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		writeError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		writeError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":      user.ID.String(),
		"username": user.Username,
		"role":     user.Role,
		"iat":      time.Now().Unix(),
		"exp":      time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenStr, err := token.SignedString([]byte(h.JWTSecret))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to generate token")
		return
	}

	writeJSON(w, http.StatusOK, models.LoginResponse{
		Token: tokenStr,
		User:  user,
	})
}

// Me returns the currently authenticated user.
func (h *Handler) Me(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id")
	if userID == nil {
		writeError(w, http.StatusUnauthorized, "not authenticated")
		return
	}

	var user models.User
	err := h.DB.QueryRow(r.Context(),
		`SELECT id, username, email, role, created_at, updated_at
		 FROM users WHERE id = $1`, userID,
	).Scan(&user.ID, &user.Username, &user.Email, &user.Role, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		writeError(w, http.StatusNotFound, "user not found")
		return
	}

	writeJSON(w, http.StatusOK, user)
}
