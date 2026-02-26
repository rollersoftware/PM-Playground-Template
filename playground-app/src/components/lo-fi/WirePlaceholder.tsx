import type { ReactNode } from 'react';

export interface WirePlaceholderProps {
  children: ReactNode;
  className?: string;
}

/**
 * Lo-fi dashed placeholder box (e.g. "Image or banner placeholder").
 * Uses .wire-placeholder from lo-fi.css.
 */
export function WirePlaceholder({ children, className = '' }: WirePlaceholderProps) {
  return <div className={`wire-placeholder ${className}`.trim()}>{children}</div>;
}
