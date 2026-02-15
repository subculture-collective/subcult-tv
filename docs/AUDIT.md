# Audit Summary — subcult.tv

**Date:** February 15, 2026
**Reviewer:** Automated code review agent
**Scope:** Full codebase audit for MVP professionalization

---

## Executive Summary

The subcult.tv MVP is a well-structured full-stack application with a clean separation between the Go API backend and React/Vite frontend. The design system is cohesive, and the codebase demonstrates good architectural decisions. However, several gaps exist in security hardening, testing, CI/CD, and documentation that must be addressed before production deployment.

**Overall Assessment:** Good foundation, needs hardening for production.

---

## Key Findings

### 🔴 Critical (P0) — Must Fix Before Production

| #   | Issue                             | Risk                             | Location                        |
| --- | --------------------------------- | -------------------------------- | ------------------------------- |
| 1   | **Hardcoded admin password hash** | Predictable default credentials  | `api/cmd/server/main.go:81-82`  |
| 2   | **No rate limiting**              | Brute force attacks, DoS         | All API endpoints               |
| 3   | **Weak JWT secret in example**    | Encourages weak secrets          | `.env.example`                  |
| 4   | **Missing security headers**      | XSS, clickjacking, MIME sniffing | `api/internal/router/router.go` |
| 5   | **No request body size limits**   | Memory exhaustion attacks        | All POST/PUT handlers           |

### 🟠 Important (P1) — Fix Soon

| #   | Issue                       | Impact                            | Location                          |
| --- | --------------------------- | --------------------------------- | --------------------------------- |
| 6   | **No CI/CD pipeline**       | Manual testing, deployment errors | Missing `.github/workflows/`      |
| 7   | **No tests**                | Regressions, confidence           | No `*_test.go`, no frontend tests |
| 8   | **Missing LICENSE file**    | Legal ambiguity                   | Root directory                    |
| 9   | **Port mismatch in docs**   | Developer confusion               | README vs `package.json`          |
| 10  | **No Go linting**           | Code quality drift                | Build process                     |
| 11  | **Missing CONTRIBUTING.md** | Contributor friction              | Root directory                    |

### 🟡 Minor (P2) — Polish Later

| #   | Issue                   | Impact              | Location                          |
| --- | ----------------------- | ------------------- | --------------------------------- |
| 12  | Auth context key type   | Type safety         | `api/internal/middleware/auth.go` |
| 13  | Error message exposure  | Info leakage        | Various handlers                  |
| 14  | No OpenAPI/Swagger docs | API discoverability | API layer                         |
| 15  | Go module path vs repo  | Build confusion     | `api/go.mod`                      |

---

## Detailed Analysis

### Security

#### 1. Hardcoded Admin Password (P0)

**Location:** [api/cmd/server/main.go](../api/cmd/server/main.go#L81-L82)

```go
// Default admin: admin / subcvlt2026
// CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION
hash := "$2a$12$LJ3mFGn3C3gCXz1kKDY4Z.f.RfLHr/cq4p7H9H1U2nkEXOQqLgKCi"
```

**Risk:** Anyone who reads the source code knows the default password.

**Fix:** Read admin credentials from environment variables and hash at runtime. Never commit password hashes.

#### 2. No Rate Limiting (P0)

**Risk:** Login endpoint vulnerable to brute force. Public endpoints (contact, subscribe) vulnerable to spam/abuse.

**Fix:** Add rate limiting middleware using `go-chi/httprate` or similar:

- Login: 5 attempts per minute per IP
- Contact/Subscribe: 10 requests per minute per IP
- General API: 100 requests per minute per IP

#### 3. Missing Security Headers (P0)

**Risk:** Missing headers leave the application vulnerable to:

- Clickjacking (no X-Frame-Options)
- MIME sniffing attacks (no X-Content-Type-Options)
- XSS in older browsers (no X-XSS-Protection)

**Fix:** Add security headers middleware to the router.

### Build & DevOps

#### 6. No CI/CD Pipeline (P1)

**Impact:** No automated quality gates. Manual testing is error-prone.

**Fix:** Add GitHub Actions workflow for:

- Frontend: lint, typecheck, build
- Backend: vet, lint (golangci-lint), build
- Docker build verification

#### 7. No Tests (P1)

**Current State:**

- Go: 0 test files
- Frontend: 0 test files
- Makefile declares `test` target but it's not implemented

**Fix:** Add baseline tests:

- Go: Handler tests for auth, basic CRUD
- Frontend: Smoke tests at minimum

### Documentation

#### 8. Missing LICENSE (P1)

README claims MIT license but no LICENSE file exists.

**Fix:** Create `LICENSE` file with MIT license text.

#### 9. Port Mismatch (P1)

- README documents port `5173`
- `package.json` dev script uses port `5175`
- `docker-compose.yml` CORS references `5175`

**Fix:** Align all documentation to use consistent port.

---

## Risk Matrix

| Category     | P0 Count | P1 Count | P2 Count |
| ------------ | -------- | -------- | -------- |
| Security     | 5        | 0        | 0        |
| Build/DX     | 0        | 3        | 1        |
| Docs         | 0        | 3        | 0        |
| Code Quality | 0        | 0        | 3        |
| **Total**    | **5**    | **6**    | **4**    |

---

## Recommendations

### Immediate Actions (This Sprint)

1. ✅ Remove hardcoded admin password hash
2. ✅ Add rate limiting middleware
3. ✅ Add security headers middleware
4. ✅ Create LICENSE file
5. ✅ Add CI/CD pipeline with basic checks
6. ✅ Fix documentation inconsistencies

### Short-Term (Next Sprint)

1. Add comprehensive test suite
2. Add request body size limits
3. Create CONTRIBUTING.md
4. Add OpenAPI documentation
5. Add health check endpoint improvements

### Long-Term

1. Add structured logging configuration
2. Consider adding database migrations versioning
3. Add monitoring/alerting integration
4. Security audit by third party

---

## Appendix: Files Reviewed

### Backend (Go)

- `api/cmd/server/main.go` — Entry point, admin seeding
- `api/internal/config/config.go` — Configuration loading
- `api/internal/router/router.go` — HTTP routing
- `api/internal/middleware/auth.go` — JWT authentication
- `api/internal/handlers/*.go` — All HTTP handlers
- `api/internal/database/migrations/*.sql` — Schema

### Frontend (TypeScript/React)

- `src/App.tsx` — Routing
- `src/lib/api.ts` — API client
- `src/context/AuthContext.tsx` — Auth state
- `src/pages/*.tsx` — All page components

### Configuration

- `docker-compose.yml`
- `Makefile`
- `package.json`
- `vite.config.ts`
- `.env.example`
