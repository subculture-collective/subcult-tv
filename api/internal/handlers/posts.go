package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/subculture-collective/subcult-tv/api/internal/models"
)

// scanPost scans a full post row into a models.Post.
func scanPost(s scanner) (models.Post, error) {
	var p models.Post
	err := s.Scan(
		&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.Content,
		&p.Tags, &p.Author, &p.Published, &p.Date,
		&p.CreatedAt, &p.UpdatedAt,
	)
	return p, err
}

// ListPosts returns published posts (public) or all posts (admin).
func (h *Handler) ListPosts(w http.ResponseWriter, r *http.Request) {
	page, perPage, offset := pagination(r)
	onlyPublished := r.URL.Query().Get("all") != "true"

	var total int64
	countQuery := `SELECT COUNT(*) FROM posts`
	if onlyPublished {
		countQuery += ` WHERE published = true`
	}
	if err := h.DB.QueryRow(r.Context(), countQuery).Scan(&total); err != nil {
		writeError(w, http.StatusInternalServerError, "failed to count posts")
		return
	}

	query := `SELECT id, slug, title, excerpt, content, tags, author, published, date,
	           created_at, updated_at FROM posts`
	args := []interface{}{}
	argN := 1

	if onlyPublished {
		query += ` WHERE published = true`
	}
	query += fmt.Sprintf(` ORDER BY date DESC LIMIT $%d OFFSET $%d`, argN, argN+1)
	args = append(args, perPage, offset)

	rows, err := h.DB.Query(r.Context(), query, args...)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to query posts")
		return
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		p, err := scanPost(rows)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to scan post")
			return
		}
		posts = append(posts, p)
	}

	if posts == nil {
		posts = []models.Post{}
	}

	writeJSON(w, http.StatusOK, models.PaginatedResponse[models.Post]{
		Data:       posts,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages(total, perPage),
	})
}

// GetPost returns a single post by slug.
func (h *Handler) GetPost(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	var p models.Post
	row := h.DB.QueryRow(r.Context(),
		`SELECT id, slug, title, excerpt, content, tags, author, published, date,
		 created_at, updated_at FROM posts WHERE slug = $1`, slug,
	)
	p, err := scanPost(row)
	if err != nil {
		writeError(w, http.StatusNotFound, "post not found")
		return
	}

	writeJSON(w, http.StatusOK, p)
}

// CreatePost creates a new post (admin only).
func (h *Handler) CreatePost(w http.ResponseWriter, r *http.Request) {
	var req models.CreatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.Slug == "" || req.Title == "" {
		writeError(w, http.StatusBadRequest, "slug and title are required")
		return
	}
	if req.Tags == nil {
		req.Tags = []string{}
	}

	var p models.Post
	row := h.DB.QueryRow(r.Context(),
		`INSERT INTO posts (slug, title, excerpt, content, tags, author, published, date)
		 VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
		 RETURNING id, slug, title, excerpt, content, tags, author, published, date,
		  created_at, updated_at`,
		req.Slug, req.Title, req.Excerpt, req.Content, req.Tags,
		req.Author, req.Published, req.Date,
	)
	p, err := scanPost(row)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create post: "+err.Error())
		return
	}

	writeJSON(w, http.StatusCreated, p)
}

// UpdatePost updates an existing post (admin only).
func (h *Handler) UpdatePost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var req models.UpdatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Tags == nil {
		req.Tags = []string{}
	}

	var p models.Post
	row := h.DB.QueryRow(r.Context(),
		`UPDATE posts SET
		  slug=$1, title=$2, excerpt=$3, content=$4, tags=$5,
		  author=$6, published=$7, date=$8, updated_at=NOW()
		 WHERE id=$9
		 RETURNING id, slug, title, excerpt, content, tags, author, published, date,
		  created_at, updated_at`,
		req.Slug, req.Title, req.Excerpt, req.Content, req.Tags,
		req.Author, req.Published, req.Date, id,
	)
	p, err := scanPost(row)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to update post: "+err.Error())
		return
	}

	writeJSON(w, http.StatusOK, p)
}

// DeletePost deletes a post (admin only).
func (h *Handler) DeletePost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	tag, err := h.DB.Exec(r.Context(), `DELETE FROM posts WHERE id = $1`, id)
	if err != nil || tag.RowsAffected() == 0 {
		writeError(w, http.StatusNotFound, "post not found")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
