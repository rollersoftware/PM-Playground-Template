import type { ReactNode } from 'react';

/**
 * Typography – design system text helpers. TODO: align to Figma (POS/VM type scale).
 */

export interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'label';
}

const styles = {
  h1: 'text-[var(--font-size-3xl)] font-[var(--font-weight-bold)] leading-[var(--line-height-tight)] text-[var(--color-text)]',
  h2: 'text-[var(--font-size-2xl)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] text-[var(--color-text)]',
  h3: 'text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] leading-[var(--line-height-normal)] text-[var(--color-text)]',
  body: 'text-[var(--font-size-base)] font-[var(--font-weight-normal)] leading-[var(--line-height-normal)] text-[var(--color-text)]',
  bodySm: 'text-[var(--font-size-sm)] font-[var(--font-weight-normal)] leading-[var(--line-height-normal)] text-[var(--color-text)]',
  label: 'text-[var(--font-size-sm)] font-[var(--font-weight-medium)] leading-[var(--line-height-normal)] text-[var(--color-text)]',
  muted: 'text-[var(--font-size-sm)] text-[var(--color-text-muted)]',
} as const;

export function H1({ children, className = '', as: Component = 'h1' }: TypographyProps) {
  return <Component className={`${styles.h1} ${className}`}>{children}</Component>;
}

export function H2({ children, className = '', as: Component = 'h2' }: TypographyProps) {
  return <Component className={`${styles.h2} ${className}`}>{children}</Component>;
}

export function H3({ children, className = '', as: Component = 'h3' }: TypographyProps) {
  return <Component className={`${styles.h3} ${className}`}>{children}</Component>;
}

export function Body({ children, className = '', as: Component = 'p' }: TypographyProps) {
  return <Component className={`${styles.body} ${className}`}>{children}</Component>;
}

export function BodySm({ children, className = '', as: Component = 'p' }: TypographyProps) {
  return <Component className={`${styles.bodySm} ${className}`}>{children}</Component>;
}

export function Label({ children, className = '', as: Component = 'label' }: TypographyProps) {
  return <Component className={`${styles.label} ${className}`}>{children}</Component>;
}

export function Muted({ children, className = '', as: Component = 'span' }: TypographyProps) {
  return <Component className={`${styles.muted} ${className}`}>{children}</Component>;
}

/** Class names only (for composition with other classes) */
export const typographyClasses = styles;
