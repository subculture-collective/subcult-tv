# Clean Code Review — subcult-tv

**Date:** 2026-02-23
**Scope:** Full codebase — TypeScript frontend (`src/`) + Go API (`api/`)
**Reviewed files:** 52 TypeScript/TSX, 22 Go files

---

## Summary

| Severity | Count |
|----------|-------|
| High     | 4     |
| Medium   | 9     |
| Low      | 5     |

Overall the codebase is well-structured, consistently styled, and readable. The main areas for improvement are **DRY violations** in admin pages and Go handlers, a **context string-key anti-pattern** in the Go auth flow, and a handful of **magic numbers**.

---

## High Severity

### 1. [DRY] Duplicated admin CRUD page structure

- **Principle**: Don't Repeat Yourself
- **Location**: `src/pages/admin/AdminProjects.tsx`, `src/pages/admin/AdminPosts.tsx`, `src/pages/admin/AdminContacts.tsx`, `src/pages/admin/AdminSubscribers.tsx`
- **Severity**: High
- **Issue**: `AdminProjects`, `AdminPosts`, and `AdminContacts` share nearly identical patterns: state for list/form/editing/error/saving, identical `load` → `useEffect` → table → form modal flow, and duplicated inline form field/button styling. The same `handleSubmit`, `handleDelete`, `openEdit`, `openNew` lifecycle is copy-pasted across pages.
- **Suggestion**: Extract a generic `AdminCRUD<T>` component or at minimum a shared `useAdminCRUD` hook that encapsulates the list/create/update/delete lifecycle. The `Field` and `Select` helper components in `AdminProjects.tsx` are already local — promote them to `src/components/admin/FormField.tsx` and reuse across all admin forms. This would eliminate ~200 lines of duplication.

### 2. [DRY] Duplicated Go handler Scan chains

- **Principle**: Don't Repeat Yourself
- **Location**: `api/internal/handlers/projects.go`, `api/internal/handlers/posts.go`
- **Severity**: High
- **Issue**: The same long `Scan(...)` chains for projects (20 fields) and posts (11 fields) are repeated verbatim across `List*`, `Get*`, `Create*`, and `Update*` functions in each handler file. E.g., the project `.Scan(&p.ID, &p.Slug, &p.Name, ...)` call with 20 arguments appears 4 times in `projects.go`.
- **Suggestion**: Extract a `scanProject(row) (models.Project, error)` helper and equivalent `scanPost`. This eliminates the risk of field-order bugs and makes schema additions one-line changes instead of multi-site edits.

### 3. [Naming / Type Safety] Context key uses bare string in auth handler

- **Principle**: Meaningful Names + Type Safety
- **Location**: `api/internal/handlers/auth.go:56` — `r.Context().Value("user_id")`
- **Severity**: High
- **Issue**: The `Me()` handler uses `r.Context().Value("user_id")` with a plain string key, while the auth middleware defines typed keys `middleware.UserIDKey` (of type `contextKey`). A plain string `"user_id"` will **never match** a `contextKey("user_id")` because Go context keys match by type+value. This means `Me()` always returns 401.
- **Suggestion**: Import and use `middleware.UserIDKey`:
  ```go
  userID := r.Context().Value(middleware.UserIDKey)
  ```

### 4. [DRY] Duplicated inline CSS class strings across forms

- **Principle**: Don't Repeat Yourself
- **Location**: `src/pages/Contact.tsx`, `src/components/NewsletterSignup.tsx`, `src/pages/admin/AdminPosts.tsx`, `src/pages/admin/AdminLogin.tsx`
- **Severity**: High
- **Issue**: The exact same Tailwind class string for text inputs is repeated 10+ times across the codebase:
  ```
  "w-full bg-soot border border-fog text-chalk font-mono text-sm px-4 py-2.5 focus:border-signal outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 transition-colors duration-200"
  ```
  Minor variants exist (`bg-void` vs `bg-soot`, `px-3` vs `px-4`), making maintenance error-prone.
- **Suggestion**: Create a shared `TextInput` component or at minimum define the class string as a constant `INPUT_CLASSES` in a shared location. The `Field` component in `AdminProjects.tsx` already does this locally — promote it to a shared component.

---

## Medium Severity

### 5. [Magic Numbers] Rate limiter values and cache TTLs are undocumented bare numbers

- **Principle**: Avoid Hardcoding
- **Location**: `api/internal/router/router.go:19-21`
- **Severity**: Medium
- **Issue**: Rate limit values (`100`, `5`, `10`) and `time.Minute` are inline:
  ```go
  generalLimiter := middleware.NewRateLimiter(100, time.Minute)
  loginLimiter := middleware.NewRateLimiter(5, time.Minute)
  ```
  These are unexplained operational constants.
- **Suggestion**: Define named constants:
  ```go
  const (
    GeneralRateLimit   = 100
    LoginRateLimit     = 5
    FormRateLimit      = 10
    RateLimitWindow    = time.Minute
  )
  ```

### 6. [Magic Numbers] Frontend cache TTL is a bare computation

- **Principle**: Avoid Hardcoding
- **Location**: `src/lib/github.ts:5`
- **Severity**: Medium
- **Issue**: `const CACHE_TTL = 1000 * 60 * 60; // 1 hour` — the comment helps, but `1000 * 60 * 60` is a raw millisecond computation. Similarly `10*time.Minute` for Patreon cache in `main.go:58` is undocumented.
- **Suggestion**: Name it `const ONE_HOUR_MS = 60 * 60 * 1000` or use a descriptive constant name like `GITHUB_CACHE_TTL_MS`.

### 7. [Naming] Inconsistent status label maps duplicated across components

- **Principle**: Meaningful Names / DRY
- **Location**: `src/components/ProjectCard.tsx:12-22`, `src/pages/ProjectDetail.tsx:13-22`
- **Severity**: Medium
- **Issue**: `statusColors` and `statusLabels` maps are defined twice (once in `ProjectCard.tsx`, once in `ProjectDetail.tsx`) with identical content.
- **Suggestion**: Move these to a shared location — either `src/lib/tokens.ts` or a new `src/lib/project-utils.ts` — and import from both components.

### 8. [Functions / SRP] `Patreon.tsx` mixes API mapping, HTML stripping, and rendering

- **Principle**: Small Functions + Single Responsibility
- **Location**: `src/pages/Patreon.tsx`
- **Severity**: Medium
- **Issue**: `stripHTML()` and `apiTierToDisplay()` are utility functions defined inline in a page component. `stripHTML` uses `DOMParser` which is a non-trivial transform that could be reused or tested independently.
- **Suggestion**: Move `stripHTML` to `src/lib/utils.ts` and `apiTierToDisplay` to the Patreon data layer. This keeps the page component focused on rendering.

### 9. [Naming] Inconsistent `data` variable naming for paginated responses

- **Principle**: Meaningful Names
- **Location**: `src/pages/admin/AdminContacts.tsx:12`
- **Severity**: Medium
- **Issue**: `AdminContacts` uses `data` as state name for `PaginatedResponse<APIContact>`, while `AdminPosts` uses `posts` and `AdminProjects` uses `projects`. The generic `data` name obscures intent.
- **Suggestion**: Rename to `contactsPage` or `contactsResponse` for clarity.

### 10. [Structural Clarity] `PostPage.tsx` has three near-identical 404 return blocks

- **Principle**: Readability First
- **Location**: `src/pages/PostPage.tsx:32-44`, `src/pages/PostPage.tsx:55-67`
- **Severity**: Medium
- **Issue**: Two separate JSX blocks return nearly identical "Post Not Found" UI (lines 32-44 and 55-67). They differ only in the `SEOHead` path prop.
- **Suggestion**: Extract a `PostNotFound` local component or consolidate the two conditions into one guard.

### 11. [DRY] `COVER_PATTERNS` defined in both `github.ts` and indirectly in `CoverArt.tsx` type

- **Principle**: Don't Repeat Yourself
- **Location**: `src/lib/github.ts:58-64`, `src/components/effects/CoverArt.tsx:3`
- **Severity**: Medium
- **Issue**: The pattern list `['circuit', 'grid', 'waves', 'dots', 'sigil']` exists as a runtime array in `github.ts` and as a type union in `CoverArt.tsx` and `types.ts`. If a pattern is added, three files must be updated.
- **Suggestion**: Define the patterns once in `types.ts` as `const COVER_PATTERNS = [...] as const` and derive the type from it: `type CoverPattern = (typeof COVER_PATTERNS)[number]`.

### 12. [Functions] `AdminProjects.tsx` is 270+ lines doing form + table + helpers

- **Principle**: Small Functions + SRP
- **Location**: `src/pages/admin/AdminProjects.tsx`
- **Severity**: Medium
- **Issue**: This file contains the main page component, form state management, submit/delete handlers, and three helper components (`Field`, `Select`, `StatusBadge`). It's not unmanageable, but the helper components should live elsewhere for reuse.
- **Suggestion**: Extract `Field`, `Select`, and `StatusBadge` to `src/components/admin/` for reuse in `AdminPosts` (which currently duplicates inline form fields).

### 13. [Structural Clarity] Go `ListPosts` builds SQL with string concatenation + arg counter

- **Principle**: Readability First
- **Location**: `api/internal/handlers/posts.go:14-30`
- **Severity**: Medium
- **Issue**: Manual `strconv.Itoa(argN)` SQL parameter numbering and string concatenation:
  ```go
  query += ` WHERE published = true`
  query += ` ORDER BY date DESC LIMIT $` + strconv.Itoa(argN) + ` OFFSET $` + strconv.Itoa(argN+1)
  ```
  This is fragile — changing the query requires re-counting all parameter indices.
- **Suggestion**: Use a query builder helper or `fmt.Sprintf("... LIMIT $%d OFFSET $%d", argN, argN+1)` for readability. Or use `squirrel` if complexity grows.

---

## Low Severity

### 14. [Magic Numbers] `pagination()` defaults (page size 20, max 100)

- **Principle**: Avoid Hardcoding
- **Location**: `api/internal/handlers/handlers.go:33-37`
- **Severity**: Low
- **Issue**: `if perPage < 1 || perPage > 100 { perPage = 20 }` — 100 and 20 are operational constants without names.
- **Suggestion**: Define `DefaultPerPage = 20` and `MaxPerPage = 100`.

### 15. [Conventions] `COVER_COLOR_ROTATION` includes `scan` which aliases `vhs-magenta`

- **Principle**: Consistency
- **Location**: `src/lib/tokens.ts:18-25`
- **Severity**: Low
- **Issue**: `COLORS.scan` and `COLORS['vhs-magenta']` both resolve to `#e040fb`. The rotation array includes both, creating duplicate colors in sequence.
- **Suggestion**: Remove the duplicate from the rotation, or document the intentional overlap.

### 16. [Conventions] Mixed import grouping in a few files

- **Principle**: Consistency
- **Location**: `src/pages/Patreon.tsx`, `src/pages/Invest.tsx`
- **Severity**: Low
- **Issue**: `lucide-react` (external library) imports are mixed between internal imports rather than grouped at the top. While not severe, it breaks the "external first, then internal" convention used in most other files.
- **Suggestion**: Group external (`react`, `react-router-dom`, `lucide-react`) imports before local (`@/components`, `@/lib`) imports.

### 17. [Naming] `FALLBACK_PROJECTS` uses `new Date().toISOString()` for `lastUpdated`

- **Principle**: Meaningful Names / Predictability
- **Location**: `src/lib/github.ts:108+`
- **Severity**: Low
- **Issue**: Fallback projects set `lastUpdated: new Date().toISOString()` which changes on every render/module load. This means the "last updated" shown is always "today" for fallback data, which is misleading.
- **Suggestion**: Use a fixed date string (e.g., `'2026-02-01T00:00:00Z'`) or omit it for fallback entries.

### 18. [YAGNI] `useId()` imported but only used once in `AdminProjects.tsx`

- **Principle**: YAGNI
- **Location**: `src/pages/admin/AdminProjects.tsx:1`
- **Severity**: Low
- **Issue**: `useId()` is imported and used in the `Field` and `Select` helpers, which is correct usage. However, `AdminPosts.tsx` doesn't use these helpers and instead manually assigns `id="post-slug"` etc. This inconsistency means one page generates stable IDs while the other uses hardcoded ones.
- **Suggestion**: Once `Field`/`Select` are extracted to shared components (see issue #12), use them in all admin forms for consistent ID generation.

---

## Files Reviewed (no issues found)

These files are clean and well-structured:

- `src/App.tsx` — Clear route definitions, good organization
- `src/lib/api.ts` — Well-typed API client with proper error handling
- `src/lib/posts.ts` — Clean data layer with useful helpers
- `src/context/` — Context split (def + provider + hook) is idiomatic React
- `src/components/ui/Button.tsx` — Polymorphic component, well-typed
- `src/components/ui/Card.tsx`, `Tag.tsx` — Simple, focused
- `src/components/effects/GlitchFrame.tsx`, `TerminalPanel.tsx` — Clean
- `src/components/Layout.tsx` — Minimal, correct
- `src/components/Nav.tsx` — Good accessibility, clean state
- `src/components/Footer.tsx` — Data-driven, clean
- `api/internal/config/config.go` — Clear validation
- `api/internal/middleware/` — All well-structured
- `api/internal/models/models.go` — Good use of generics, proper JSON tags
- `api/internal/patreon/client.go` — Solid caching pattern
- `api/cmd/server/main.go` — Clean startup, graceful shutdown

---

## Recommendations (priority order)

1. **Fix the auth context key bug** (issue #3) — this is a runtime defect
2. **Extract shared admin CRUD patterns** (issues #1, #4, #12) — biggest DRY win
3. **Extract Go Scan helpers** (issue #2) — prevents field-order bugs
4. **Name magic numbers** (issues #5, #6, #14) — quick wins for readability
5. **Consolidate duplicated maps/types** (issues #7, #11) — single source of truth
