# Content Checklist — subcult.tv

Before launching, fill in or replace the following placeholder content.

## Brand Assets

- [ ] **Logo SVG** — Replace `public/favicon.svg` with final logo
- [ ] **OG Image** — Replace `public/og-image.svg` with a proper 1200x630 PNG (`og-image.png`)
- [ ] **Press Kit logos** — Add final assets to `public/press-kit/`:
  - `subcult-logo.svg`
  - `subcult-logo.png` (512x512)
  - `subcult-banner-wide.png` (1200x400)
  - `subcult-banner-square.png` (800x800)

## Contact & Social

- [ ] **Contact email** — Replace `hello@subcult.tv` in `src/pages/Contact.tsx`
- [ ] **Mastodon handle** — Update placeholder in `src/pages/Contact.tsx`
- [ ] **Additional social links** — Add Twitter/X, Discord, etc. to Contact page and Footer

## Content

- [ ] **Project screenshots** — Add real screenshots to replace generated CoverArt
- [ ] **Project descriptions** — Enrich `content/projects.json` with full descriptions for each project
- [ ] **Patreon tier details** — Update `src/pages/Patreon.tsx` with actual tier names and prices
- [ ] **About page copy** — Review and personalize mission/values text
- [ ] **Manifesto post** — Review and finalize `content/posts/subcult-manifesto.mdx`

## Technical

- [ ] **Domain DNS** — Point `subcult.tv` to deployment, `api.subcult.tv` to API server
- [ ] **GitHub token** — (Optional) Set `VITE_GITHUB_TOKEN` in `.env.local` for higher API rate limits
- [x] **Analytics** — Umami analytics integrated (self-hosted via Docker)
- [x] **Contact form backend** — API-backed with mailto fallback
- [ ] **OG image as PNG** — Update `index.html` meta tags to point to `.png` instead of `.svg`
- [ ] **Environment variables** — Copy `.env.example` → `.env` and fill in all values
- [ ] **JWT secret** — Generate a strong secret (min 32 chars) for `JWT_SECRET`
- [ ] **Admin password** — Set a strong `ADMIN_PASSWORD` in `.env`
- [ ] **Umami Website ID** — After Umami setup, update `data-website-id` in `index.html`
- [ ] **CORS origins** — Update `CORS_ORIGINS` in `.env` with production domains
- [ ] **API URL** — Set `VITE_API_URL` if frontend and API are on different domains

## Nice to Have

- [ ] Custom 404 illustration
- [ ] RSS/Atom feed for zine posts
- [ ] Dark/light mode (currently dark-only by design)
- [ ] Prerendering/SSG for SEO with a tool like `vite-plugin-ssr`
