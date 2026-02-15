package middleware

import "net/http"

// SecurityHeaders adds essential security headers to all responses.
func SecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Prevent clickjacking
		w.Header().Set("X-Frame-Options", "DENY")

		// Prevent MIME type sniffing
		w.Header().Set("X-Content-Type-Options", "nosniff")

		// XSS protection for older browsers
		w.Header().Set("X-XSS-Protection", "1; mode=block")

		// Referrer policy - don't leak URLs
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

		// Permissions policy - disable unnecessary features
		w.Header().Set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

		// Content Security Policy - basic restrictive policy
		// Note: Adjust this based on your actual frontend requirements
		w.Header().Set("Content-Security-Policy", "default-src 'self'; frame-ancestors 'none'")

		next.ServeHTTP(w, r)
	})
}
