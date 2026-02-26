/**
 * Design system token constants (JS/TS).
 * CSS variables are the source of truth; these are for programmatic use if needed.
 * TODO: align with POS/VM Figma libraries.
 */

export const radius = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
} as const;

export const space = {
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
} as const;

export const fontSize = {
  xs: 'var(--font-size-xs)',
  sm: 'var(--font-size-sm)',
  base: 'var(--font-size-base)',
  lg: 'var(--font-size-lg)',
  xl: 'var(--font-size-xl)',
  '2xl': 'var(--font-size-2xl)',
  '3xl': 'var(--font-size-3xl)',
} as const;

export const colors = {
  bg: 'var(--color-bg)',
  surface: 'var(--color-surface)',
  border: 'var(--color-border)',
  text: 'var(--color-text)',
  muted: 'var(--color-text-muted)',
  primary: 'var(--color-primary)',
  primaryHover: 'var(--color-primary-hover)',
  primaryForeground: 'var(--color-primary-foreground)',
} as const;
