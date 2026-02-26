/**
 * Button – design system component.
 * Uses tokens from index.css; maps to Figma button (primary/secondary).
 */
export function Button({ children, variant = 'primary', onClick, className = '' }) {
  const base =
    'rounded-[var(--radius-md)] px-[var(--space-6)] py-[var(--space-3)] font-[var(--font-weight-medium)] text-[var(--font-size-base)] transition-colors cursor-pointer border'
  const variants = {
    primary:
      'border-[var(--color-primary)] bg-[var(--color-primary)] text-white hover:opacity-90',
    secondary:
      'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)]',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}
