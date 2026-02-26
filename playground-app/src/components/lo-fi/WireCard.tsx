import type { ReactNode } from 'react';

export type WireCardVariant = 'solid' | 'dashed' | 'shadow';

export interface WireCardProps {
  children: ReactNode;
  /** 'solid' (default), 'dashed' (placeholder), or 'shadow' */
  variant?: WireCardVariant;
  className?: string;
}

/**
 * Lo-fi wireframe card. Uses .wire-card from lo-fi.css.
 * Ensure lo-fi-theme.css and lo-fi.css are loaded (e.g. in your prototype or app).
 */
export function WireCard({
  children,
  variant = 'solid',
  className = '',
}: WireCardProps) {
  const variantClass =
    variant === 'dashed' ? ' wire-card--dashed' : variant === 'shadow' ? ' wire-card--shadow' : '';
  return <div className={`wire-card${variantClass} ${className}`.trim()}>{children}</div>;
}
