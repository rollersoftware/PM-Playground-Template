/**
 * Card – design system component.
 * Uses tokens from index.css; maps to Figma card/surface component.
 */
export function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border p-[var(--space-6)] ${className}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {children}
    </div>
  )
}
