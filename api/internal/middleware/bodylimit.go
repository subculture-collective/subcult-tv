package middleware

import (
	"net/http"
)

// MaxBodySize is the maximum allowed request body size (1MB).
const MaxBodySize = 1 << 20 // 1MB

// LimitBody limits the request body size to prevent memory exhaustion attacks.
func LimitBody(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Only limit POST, PUT, PATCH requests that have bodies
		if r.Method == http.MethodPost || r.Method == http.MethodPut || r.Method == http.MethodPatch {
			r.Body = http.MaxBytesReader(w, r.Body, MaxBodySize)
		}
		next.ServeHTTP(w, r)
	})
}
