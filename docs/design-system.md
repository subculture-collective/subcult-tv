# SUBCULT Design System

> Formal spec for subcult.tv — tokens, components, effects, constraints.
> For aesthetic rationale, see [DESIGN_NOTES.md](./DESIGN_NOTES.md).

---

## 1. Color Tokens

All colors are defined as CSS custom properties in `src/index.css` via `@theme {}` (Tailwind v4).
Use token names — never raw hex outside `index.css`.

### Neutrals (dark → light)

| Token        | Hex       | Usage                                      |
| ------------ | --------- | ------------------------------------------ |
| `void`       | `#0a0a0a` | Page background, deepest layer             |
| `soot`       | `#141414` | Card backgrounds, code blocks              |
| `ash`        | `#1a1a1a` | Elevated surfaces, nav background           |
| `smoke`      | `#2a2a2a` | Borders, dividers, inline code background  |
| `fog`        | `#3a3a3a` | Subtle borders, scrollbar thumb, halftone  |
| `dust`       | `#6b6b6b` | Decorative text only (captions, timestamps) |
| `bone`       | `#c4b9a7` | Secondary body text, blockquotes           |
| `chalk`      | `#e8e0d0` | Primary body text                          |
| `glow`       | `#f0ece4` | Headings, emphasized text                  |

**Contrast notes:**
- `chalk` on `void` ≈ 14:1 — WCAG AAA
- `bone` on `void` ≈ 9:1 — WCAG AAA
- `dust` on `void` ≈ 4.2:1 — WCAG AA for large text only; never use for body text or essential info

### Accents

| Token         | Hex       | Usage                              |
| ------------- | --------- | ---------------------------------- |
| `signal`      | `#8b5cf6` | Primary CTA, links, alerts (EVA purple) |
| `signal-dim`  | `#7c3aed` | Hover/active state for signal      |
| `static`      | `#00ff88` | Success, terminal output, cursor (EVA green) |
| `static-dim`  | `#00cc66` | Hover/active state for static      |
| `flicker`     | `#ffcc00` | Warnings, highlights, tags         |
| `flicker-dim` | `#cc9900` | Hover/active state for flicker     |
| `scan`        | `#e040fb` | Decorative, scan glow, categories (magenta) |
| `scan-dim`    | `#c026d3` | Hover/active state for scan        |
| `cyan`        | `#00ccff` | Info, external links, metadata     |
| `cyan-dim`    | `#0099cc` | Hover/active state for cyan        |

### VHS Colors (effects only)

| Token         | Hex       | Usage                        |
| ------------- | --------- | ---------------------------- |
| `vhs-purple`  | `#8b5cf6` | Chromatic aberration purple   |
| `vhs-green`   | `#00ff88` | Chromatic aberration green    |
| `vhs-magenta` | `#e040fb` | Decorative glitch highlights  |

---

## 2. Typography

### Font Stacks

| Token     | Family                                    | Role                         |
| --------- | ----------------------------------------- | ---------------------------- |
| `display` | Oswald, Impact, sans-serif                | Headings — uppercase, tight  |
| `body`    | Libre Baskerville, Georgia, serif         | Body text — editorial/zine   |
| `mono`    | JetBrains Mono, Courier New, monospace    | Code, terminal, data         |

### Type Scale

| Element | Size                          | Weight | Line Height | Transform  |
| ------- | ----------------------------- | ------ | ----------- | ---------- |
| `h1`    | `clamp(2.5rem, 6vw, 5rem)`   | 700    | 1.1         | uppercase  |
| `h2`    | `clamp(1.75rem, 4vw, 3rem)`  | 600    | 1.1         | uppercase  |
| `h3`    | `clamp(1.25rem, 3vw, 2rem)`  | 600    | 1.1         | uppercase  |
| `h4`    | `clamp(1rem, 2vw, 1.5rem)`   | 500    | 1.1         | uppercase  |
| body    | browser default (1rem)        | 400    | 1.7         | none       |
| code    | 0.875em                       | 400    | inherit     | none       |

All headings use `letter-spacing: 0.05em`.

---

## 3. Shadows

| Token      | Value                                   | Usage                    |
| ---------- | --------------------------------------- | ------------------------ |
| `glow`     | `0 0 20px rgba(139, 92, 246, 0.3)`     | Signal-purple ambient glow |
| `scan`     | `0 0 30px rgba(224, 64, 251, 0.2)`     | Magenta scan glow          |
| `static`   | `0 0 15px rgba(0, 255, 136, 0.2)`      | Green terminal glow      |
| `hard`     | `4px 4px 0 rgba(0, 0, 0, 0.8)`         | Punk hard-edge shadow    |
| `brutal`   | `6px 6px 0 #0a0a0a`                    | Neubrutalist offset      |

---

## 4. Effects System

### Effect Levels

Controlled by `data-effects` attribute on `<html>`. Stored in `localStorage`.

| Level    | Scanlines     | Noise       | VHS Tracking | Chromatic     | Glitch Text |
| -------- | ------------- | ----------- | ------------ | ------------- | ----------- |
| `clean`  | Hidden        | Hidden      | Hidden       | None          | None        |
| `mild`   | 50% opacity   | 1.5% opacity| Hidden       | 1px offset    | 8s duration |
| `full`   | Full          | 3% opacity  | Active       | 2px offset    | 3s duration |

### CSS Classes

| Class             | Effect                                          | Notes                        |
| ----------------- | ----------------------------------------------- | ---------------------------- |
| `.scanlines`      | Repeating-gradient horizontal lines via `::after`| Add to container             |
| `.chromatic`      | 2px red/blue text-shadow offset                 | Apply to headings            |
| `.chromatic-mild` | 1px red/blue text-shadow offset                 | Subtler variant              |
| `.glitch-text`    | Translate-jitter animation (3s infinite)         | Limit to 1 per view          |
| `.vhs-tracking`   | Thin light bar animating vertically via `::before`| Full mode only             |
| `.noise-overlay`  | SVG feTurbulence via `::before`                 | Ambient, 3% opacity          |
| `.halftone`       | Dot-grid radial gradient (8px)                  | Background texture           |
| `.torn-edge-top`  | Jagged clip-path on top edge                    | Section dividers             |
| `.torn-edge-bottom`| Jagged clip-path on bottom edge                | Section dividers             |
| `.cursor-blink`   | Appends blinking `█` via `::after`              | Terminal prompts             |
| `.terminal-flicker`| Opacity-based flicker animation                | Limit to 1 per view          |
| `.zine-margin`    | Red left border + `※` glyph annotation          | Blockquote/aside styling     |

### Animation Constraints

- Max **1–2 animated elements** per viewport at any time
- Transitions: **150–300ms**, use `ease-out` for enter, `ease-in` for exit
- `infinite` animations: only for ambient (scanlines, noise) or loading indicators
- `.glitch-text` and `.terminal-flicker`: never apply to more than 1 element per view
- All effects use `pointer-events: none` — they never block interaction

---

## 5. Components

### Button

Variants: `primary` (signal bg), `secondary` (outline), `ghost` (text only).
All buttons must have `cursor-pointer`. Focus ring: `2px solid signal`, `2px offset`.

### Card / ProjectCard / PostCard

Background: `soot`. Border: `1px solid smoke`. Hover: border transitions to `fog` or accent color.
No layout-shifting hover states — use `opacity`, `color`, `border-color`, or `box-shadow` only.

### Tag / Badge

Small mono text. Background: `smoke` or accent-dim. Text: `chalk` or matching accent.

### TerminalPanel

- Title bar: three dots (signal, flicker, static) + mono title
- Body: mono font, `static` green text on `soot` background
- Configurable prompt character (default: `>`)

### GlitchFrame

Wrapper that conditionally applies `.scanlines`, `.noise-overlay`, `.vhs-tracking` based on current effect level. Renders as plain `<div>` in `clean` mode.

### CoverArt

Generated SVG patterns (circuit, grid, waves, dots, sigil) + gradient tint + glyph watermark. No external images.

### Nav

Background: `ash` or `void` with subtle border. Sticky — compensate with `padding-top` on main content equal to nav height. Mobile: hamburger menu.

### Footer

Background: `soot`. Mono font for links. Social icons from a consistent SVG set (Lucide recommended).

---

## 6. Accessibility

### Requirements (non-negotiable)

| Rule                        | Implementation                                              |
| --------------------------- | ----------------------------------------------------------- |
| Skip link                   | `.skip-link` — focuses to `#main-content`                   |
| Focus visibility            | `focus-visible` outline on all interactive elements          |
| Reduced motion              | `prefers-reduced-motion: reduce` → disables all animation   |
| High contrast mode          | `[data-contrast='high']` → pure `#000`/`#fff`, no overlays  |
| Alt text                    | All `<img>` must have descriptive `alt` (decorative: `alt=""`) |
| Form labels                 | Every `<input>` must have an associated `<label>`            |
| ARIA labels                 | Icon-only buttons must have `aria-label`                     |
| Color not sole indicator    | Use icons/text alongside color for status/errors             |
| Error announcement          | Use `role="alert"` or `aria-live` for dynamic errors         |
| Keyboard navigation         | All interactive elements reachable and operable via keyboard |

### Color Contrast Minimums

| Pair                    | Ratio  | WCAG Level | Allowed for            |
| ----------------------- | ------ | ---------- | ---------------------- |
| `chalk` on `void`       | ~14:1  | AAA        | Body text              |
| `bone` on `void`        | ~9:1   | AAA        | Secondary text         |
| `glow` on `void`        | ~15:1  | AAA        | Headings               |
| `dust` on `void`        | ~4.2:1 | AA Large   | Captions, timestamps only |
| `signal` on `void`      | ~4.7:1 | AA         | Links, CTAs            |
| `static` on `void`      | ~9:1   | AAA        | Terminal/success text   |

---

## 7. Layout

### Spacing

Uses Tailwind's default spacing scale (4px base). Key patterns:
- Section padding: `py-16` to `py-24`
- Container: max-width `1280px`, centered with `mx-auto`, `px-4` to `px-6`
- Card gap: `gap-6` to `gap-8`

### Breakpoints

| Name   | Width    | Key changes                  |
| ------ | -------- | ---------------------------- |
| `sm`   | `640px`  | Stack → 2-col for cards      |
| `md`   | `768px`  | Nav expands, grid 2–3 cols   |
| `lg`   | `1024px` | Full grid, sidebar layouts   |
| `xl`   | `1280px` | Max container width          |

### Constraints

- No horizontal scroll at any breakpoint (test at 320px minimum)
- Fixed/sticky nav must not obscure content — compensate with top padding
- Content must be readable without effects enabled

---

## 8. Icons

Use a **single consistent SVG icon set** — recommended: [Lucide](https://lucide.dev/).

Rules:
- No emoji as UI icons
- Normalize sizing: `24x24` default, `16x16` small, `32x32` large
- Icon-only buttons must include `aria-label`
- Brand logos: use official SVG sources only (GitHub, Patreon, etc.)

---

## 9. Interaction States

| State          | Treatment                                          | Duration |
| -------------- | -------------------------------------------------- | -------- |
| Hover          | Color/opacity/border-color/box-shadow change       | 200ms    |
| Active/Pressed | Slight darken or scale(0.98)                       | 100ms    |
| Focus          | `2px solid signal` outline, `2px` offset           | instant  |
| Disabled       | `opacity: 0.5`, `cursor: not-allowed`              | —        |
| Loading        | Spinner or `animate-pulse`, never layout-shifting  | —        |

**Never** use `transform: scale()` or `translate()` on hover for interactive elements — it causes layout shift. Use only non-layout properties: `color`, `background`, `border-color`, `box-shadow`, `opacity`.

---

## 10. Acceptance Checklist

### Visual Quality
- [ ] No emoji used as UI icons
- [ ] Icons from a single set (Lucide)
- [ ] Brand logos are correct official SVGs
- [ ] Hover states do not cause layout shift
- [ ] All colors use token names — no raw hex outside `index.css`

### Interaction
- [ ] All clickable surfaces have `cursor-pointer`
- [ ] Hover/focus states provide clear feedback
- [ ] Transitions consistent at 150–300ms
- [ ] Keyboard focus visible on all interactives

### Layout & Responsive
- [ ] Works at 320px / 768px / 1024px / 1440px
- [ ] No horizontal scroll on mobile
- [ ] Fixed elements do not cover content

### Accessibility
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the sole indicator
- [ ] Respects `prefers-reduced-motion`
- [ ] High contrast mode disables all overlays
- [ ] `dust` never used for essential text

### Performance
- [ ] All effects CSS-only (no canvas/WebGL)
- [ ] Fonts loaded with `display=swap` + preconnect
- [ ] Max 1–2 animated elements per viewport
- [ ] Effect level toggle works (clean/mild/full)
