import type { ReactNode } from 'react';

/**
 * Card – design system container. TODO: align to Figma (POS/VM card/surface).
 * Supports optional header + body pattern.
 */
export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

const cardBase =
  'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]';

export function Card({ children, className = '' }: CardProps) {
  return <div className={`${cardBase} ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div
      className={`border-b border-[var(--color-border)] px-[var(--space-6)] py-[var(--space-4)] ${className}`}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-[var(--space-6)] ${className}`}>{children}</div>;
}
