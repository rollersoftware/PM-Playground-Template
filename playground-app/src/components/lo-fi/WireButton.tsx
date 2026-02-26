import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface WireButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  className?: string;
}

/**
 * Lo-fi wireframe button. Uses .wire-btn from lo-fi.css.
 * Set primary for filled accent style.
 */
export function WireButton({
  children,
  primary = false,
  className = '',
  type = 'button',
  ...rest
}: WireButtonProps) {
  const primaryClass = primary ? ' wire-btn--primary' : '';
  return (
    <button
      type={type}
      className={`wire-btn${primaryClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
