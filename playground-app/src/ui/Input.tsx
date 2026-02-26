import type { InputHTMLAttributes } from 'react';

/**
 * Input – design system. TODO: align to Figma (POS/VM input height, radius, focus).
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = '', ...rest }: InputProps) {
  const base =
    'w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] ' +
    'px-[var(--space-4)] py-[var(--space-3)] text-[var(--font-size-base)] ' +
    'border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent';
  return <input className={`${base} ${className}`} {...rest} />;
}
