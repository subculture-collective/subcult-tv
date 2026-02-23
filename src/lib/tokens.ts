/**
 * Design system color tokens for use in JS/TS.
 * These mirror the CSS custom properties in src/index.css.
 * Use these instead of raw hex values in component code.
 */

export const COLORS = {
  signal: '#8b5cf6',
  scan: '#e040fb',
  static: '#00ff88',
  flicker: '#ffcc00',
  cyan: '#00ccff',
  'vhs-magenta': '#e040fb',
} as const;

/**
 * Rotation of cover colors for auto-assigning to projects.
 * All values must be from the design system palette.
 * Note: scan and vhs-magenta are the same value — only one is included.
 */
export const COVER_COLOR_ROTATION = [
  COLORS.signal,
  COLORS.scan,
  COLORS.static,
  COLORS.flicker,
  COLORS.cyan,
] as const;

export const DEFAULT_COVER_COLOR = COLORS.signal;
