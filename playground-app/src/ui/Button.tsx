import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button – design system. TODO: align to Figma (POS/VM button variants).
 * Variants: primary, secondary, ghost. Sizes: sm, md.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90',
  secondary:
    'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)]',
  ghost:
    'border-transparent bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-[var(--space-4)] py-[var(--space-2)] text-[var(--font-size-sm)]',
  md: 'px-[var(--space-6)] py-[var(--space-3)] text-[var(--font-size-base)]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const base =
    'rounded-[var(--radius-md)] font-[var(--font-weight-medium)] transition-colors cursor-pointer border inline-flex items-center justify-center';
  return (
    <button
      type={type}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
