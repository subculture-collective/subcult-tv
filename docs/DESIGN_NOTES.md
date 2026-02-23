# Design Notes — subcult.tv

## Aesthetic Direction

The visual identity of subcult.tv sits at the intersection of three aesthetics:

### 1. Analog / VHS / Glitch

- **Scanlines:** Pure CSS `repeating-linear-gradient` overlaid via `::after` pseudo-elements. No images needed.
- **Chromatic Aberration:** Achieved through `text-shadow` with offset red and blue shadows. Two levels: `chromatic` (2px) and `chromatic-mild` (1px).
- **VHS Tracking Lines:** A thin horizontal gradient bar animating vertically with `translateY`. Only active in "Full VHS" mode.
- **Static / Noise:** SVG-based `feTurbulence` filter as a tiny data URI, animated via `background-position` keyframes. Extremely lightweight — no canvas, no WebGL.
- **Glitch Text:** Simple `transform: translate()` keyframe animation with clip-path slicing for the `::before`/`::after` layers.

### 2. Punk / DIY / Zine

- **Torn Edges:** CSS `clip-path: polygon()` with hand-tuned jagged points. Applied via `.torn-edge-top` and `.torn-edge-bottom` utility classes.
- **Halftone:** `radial-gradient` dot pattern at 8px intervals.
- **Zine Margins:** Left-bordered blockquote style with a `※` annotation glyph.
- **Typography:** The Oswald + Libre Baskerville pairing was deliberate — the compressed sans-serif display face (Oswald) feels like punk poster typography, while the editorial serif (Libre Baskerville) gives body text the feel of a printed zine.
- **Copy Tone:** Terminal prompts (`> command`), system messages (`[WARN]`, `[SYSTEM]`), and BBS-style language throughout.

### 3. Occult / Gothic

- **Color Palette:** Deep void backgrounds (#0a0a0a) with warm "bone" and "chalk" text tones evoke aged paper and ash.
- **Signal Red (#ff3333):** The primary accent suggests urgency, emergency, the red of a broadcast signal.
- **Terminal Green (#00ff88):** The "static" color — evokes old CRT phosphor glow.
- **Sigil Patterns:** SVG patterns with intersecting lines and circles used as project covers.

## How Effects Work

### The Effect Level System

Three levels, stored in `localStorage`, toggled via the nav:

| Level | Scanlines | Noise | Tracking | Chromatic |
| --- | --- | --- | --- | --- |
| **Clean** | Off | Off | Off | Off |
| **Mild** | Reduced opacity | 1.5% opacity | Off | Mild |
| **Full** | Full | 3% opacity | On | Full |

All effects are implemented via CSS custom properties, pseudo-elements, and attribute selectors (`[data-effects="clean"]`). No JavaScript animation loops.

### Accessibility Integration

- `prefers-reduced-motion: reduce` → automatically sets effect level to "clean"
- High contrast mode toggle switches to pure black/white and disables all overlays
- All interactive elements have visible `focus-visible` outlines
- Skip link implemented for keyboard navigation
- All effect overlays use `pointer-events: none` so they never interfere with interaction

## Component Architecture

### GlitchFrame

A wrapper component that conditionally applies scanline, noise, and VHS tracking overlays based on the current effect level. Degrades gracefully — in "clean" mode it renders as a plain `<div>`.

### TerminalPanel

A styled container mimicking a retro terminal window with:
- Three colored dots (red/yellow/green) in the title bar
- Monospace font throughout
- Green text on dark background
- Configurable prompt character

### CoverArt

Generates unique project cover images using:
- SVG patterns (circuit, grid, waves, dots, sigil) encoded as data URIs
- Color-tinted gradient backgrounds
- Large initial glyph as watermark
- No external images required

## Token System

Design tokens are defined as CSS custom properties inside `@theme` (Tailwind CSS v4 convention), making them available as both Tailwind utilities and raw CSS variables. Key tokens:

- **Colors:** 12 named colors from void→glow (neutrals) + signal/static/flicker/scan/cyan (accents)
- **Typography:** 3 font stacks (display/body/mono)
- **Shadows:** glow, scan, static (colored glows) + hard, brutal (offset shadows)
- **Spacing:** Uses Tailwind's default scale

## Performance Notes

- All effects are CSS-only. No canvas, WebGL, or JavaScript animation loops.
- The noise overlay uses a single 256x256 SVG data URI — no external image files.
- Fonts are loaded via Google Fonts with `display=swap` and preconnect hints.
- MDX posts are code-split via dynamic imports — only loaded when visited.
- GitHub API responses are cached in localStorage with a 1-hour TTL.
- Total CSS (including design system): ~10.5KB gzipped.
- Total JS (including React + Router + MDX): ~88KB gzipped.
