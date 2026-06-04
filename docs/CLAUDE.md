You are Claude, acting as a senior designer + full-stack engineer. Build a complete, production-ready website for **subcult.tv**: a business + portfolio hub for “Subculture Collective / SUBCULT” that showcases projects, links to Patreon, and communicates the brand.

IMPORTANT LINKS (use these as sources of truth):

- Source repo: https://gitea.subcult.tv/subcult/subcult-tv
- Patreon: https://www.patreon.com/cw/subcult

STYLE / ART DIRECTION (must be visible in UI, but keep it readable and accessible)

1. 📼 Analog + Glitch

- VHS overlays, scanlines, chromatic aberration
- CMYK misalignment, static frames, image tearing, warped PNG edges

2. ☠ Punk & DIY

- torn paper textures, halftone dots, collaged edges, zine margins
- silhouettes: cryptids, fists, antennas, CRTs

3. 🕯 Occult / Gothic

- sigils, inverted glyphs, fragmented Latin phrases
- scrawled handwriting / notebook annotations
- mixed media textures (ash/ink/glitch pixels)

4. References to pull from:

- Evangelion overlays, Akira ending title cards
- Terminal UIs (WezTerm / retro BIOS)
- 90s riot grrrl zines, cassette/VHS cover art
- Soviet propaganda posters reworked as punk redesigns

5. Language / microcopy flavor:

- 90s BBS slang, zine/pamphlet language, glitch poetry
- terminal output, shell prompts, error messages
- Marxist slogans, but twisted / reframed (no cringe, no edgelord)

PRIMARY GOAL

- subcult.tv should function as:
  A) the business homepage (who/what/why, contact, credibility)
  B) a portfolio index for all projects (with deep links + status + tech)
  C) a funnel to Patreon (clear CTA, perks, what support enables)
  D) a “zine hub” (posts/manifestos/updates) that matches the aesthetic

NON-NEGOTIABLES

- Accessibility: high contrast mode option, keyboard navigation, skip links, reduced motion support.
- Performance: fast load, optimized images, avoid heavy GPU shaders by default; effects should be CSS-first and progressive.
- SEO: correct meta tags, OpenGraph/Twitter cards, sitemap, robots.txt.
- Maintainability: clean component architecture, content separated from layout.
- No copyrighted assets. Use generated patterns/gradients/SVGs you create, or public-domain textures.

TECH STACK (choose and justify briefly inside the README; then implement)

- Preferred: Next.js (App Router) + TypeScript + Tailwind + MDX for posts + static export if feasible.
- If you choose Vite+React instead, include equivalent routing + SEO strategy.
- Provide a fully working repo layout, scripts, and deployment notes.

SITE INFORMATION ARCHITECTURE (implement all pages)

1. Home

- Hero: SUBCULT identity, tagline, primary CTA (“View Projects”, “Support on Patreon”)
- Highlight 3–6 flagship projects from the curated local catalog
- “What is Subcult?” short manifesto block
- Latest updates teaser (from posts/changelog)

2. Projects (core)

- Grid/list with filters (type: software/media/tools, status: active/incubating/archived)
- Each project detail page:
  - description, screenshots/cover art (stylized), status, stack, links
  - “Why it exists” (short), “How to support” CTA
- Data source:
  - Prefer the local curated `content/projects.json` catalog for projects
  - Provide a local override file for curated titles, ordering, screenshots, and richer copy

3. Patreon

- Explain what support funds, what members get, how often you ship
- Embed Patreon link prominently; optionally use Patreon widgets if lightweight
- Include tier-style blocks even if not pulled dynamically (editable content)

4. About / Studio

- Mission, values, what you build, what you won’t build
- “DIY operations” vibe: toolchain, process, principles

5. Zine / Posts

- MDX-backed posts with zine margins, footnotes, glitch callouts
- Provide 3 starter posts:
  - “SUBCULT Manifesto”
  - “Release Log / Field Notes”
  - “How We Build: Tools, Servers, Rituals”

6. Contact

- Contact form (serverless if Next.js; otherwise mailto + instructions)
- Social links (Gitea, Patreon; leave placeholders for others)

7. Press Kit

- Downloadable assets folder structure (even if placeholders): logo marks, banners, colors, typography notes
- Short brand usage rules

DESIGN SYSTEM REQUIREMENTS

- A cohesive design system with tokens:
  - type scale, spacing, radii, shadows
  - a small palette that evokes VHS/punk/gothic without killing readability
- Components:
  - Button, Link, Card, Tag/Badge, ProjectCard, PostCard, Nav, Footer
  - “TerminalPanel” component (for sections like logs, prompts, changelogs)
  - “GlitchFrame” wrapper (applies scanlines/aberration/tearing in layers)
- Effects should be configurable:
  - global toggle: “Clean / Mild Glitch / Full VHS”
  - respects prefers-reduced-motion

CONTENT + COPY GUIDELINES

- Write copy that feels like a radical zine + terminal log, but still communicates clearly.
- Include short, sharp CTAs.
- Sprinkle subtle “system messages” and “error motifs” as flavor, not clutter.

IMPLEMENTATION DETAILS

- Repo includes:
  - README with setup, env vars, deployment steps
  - package scripts (dev/build/lint/format)
  - ESLint + Prettier
  - Basic tests if reasonable (at least lint/typecheck)
- Content management:
  - /content/posts/\*.mdx
  - /content/projects.json (curation overrides)
  - Curated project catalog sourced from local JSON (synchronous read preferred)
- Images:
  - Use SVG patterns and CSS effects; create a few generated “covers” per project if no screenshots exist
- Deployment:
  - Provide at least one path: Vercel or Cloudflare Pages (and optionally static export)
  - Include DNS/domain note for subcult.tv

DELIVERABLES

1. A complete codebase with all pages implemented.
2. A short “Design Notes” doc explaining how the aesthetic is achieved (layers, effects, tokens).
3. A “Content Checklist” for the site owner to fill in (logos, screenshots, contact email, social handles).
4. A final preview section in the README: routes list + what each page contains.

START BY DOING THIS (step-by-step inside your response)

1. Briefly restate assumptions + the chosen stack.
2. Propose the sitemap and component list.
3. Then output the full project code (file tree + files). Keep it copy/paste runnable.

Do not ask me questions unless you are blocked. If something is unknown (e.g., contact email), use a placeholder and put it in the Content Checklist.
