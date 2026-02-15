# Contributing to subcult.tv

Thanks for your interest in contributing to the Subculture Collective. We welcome contributions of all kinds — bug reports, feature ideas, documentation improvements, and code.

## Code of Conduct

Be excellent to each other. No jerks.

## Getting Started

1. **Fork the repository** and clone your fork
2. **Copy `.env.example`** to `.env` and fill in values
3. **Install dependencies:**
   ```bash
   make setup
   ```
4. **Start development:**
   ```bash
   make dev
   ```

## Development Workflow

### Frontend (TypeScript/React)

```bash
npm run dev          # Start Vite dev server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run format       # Format with Prettier
```

### Backend (Go)

```bash
cd api
go run ./cmd/server  # Run API server
go vet ./...         # Static analysis
go test ./...        # Run tests
```

### Docker

```bash
make docker-up       # Start all services
make docker-down     # Stop all services
make docker-logs     # Tail logs
make db-shell        # Open psql shell
```

## Pull Request Process

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in small, logical commits

3. **Ensure all checks pass:**

   ```bash
   make check          # Frontend lint + typecheck
   cd api && go vet ./... && go test ./...
   ```

4. **Push your branch** and create a Pull Request

5. **Wait for review** — we'll respond as soon as we can

## Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]
```

Types:

- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `style` — Formatting, no code change
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `test` — Adding tests
- `chore` — Maintenance tasks

Examples:

```
feat(api): add rate limiting to login endpoint
fix(ui): correct button alignment on mobile
docs: update deployment instructions
```

## Project Structure

```
subcult_tv/
├── api/              # Go backend
│   ├── cmd/server/   # Entry point
│   └── internal/     # Internal packages
├── src/              # React frontend
│   ├── components/   # UI components
│   ├── context/      # React contexts
│   ├── lib/          # Utilities
│   └── pages/        # Page components
├── content/          # MDX posts, project data
├── public/           # Static assets
└── docs/             # Documentation
```

## Security

- **Never commit secrets** — Use `.env` files
- **Report vulnerabilities privately** — Email security@subcult.tv

## Style Guide

### Go

- Follow [Effective Go](https://golang.org/doc/effective_go)
- Run `go vet` and `go fmt` before committing
- Write tests for new functionality

### TypeScript/React

- Use functional components with hooks
- Follow existing component patterns
- Run ESLint and Prettier before committing

## Questions?

Open an issue or reach out via the contact form at [subcult.tv/contact](https://subcult.tv/contact).

---

_"We build tools, media, and infrastructure for the counterculture."_
