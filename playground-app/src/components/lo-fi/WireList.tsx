import type { ReactNode } from 'react';

export interface WireListProps {
  items: ReactNode[];
  className?: string;
}

/**
 * Lo-fi wireframe list. Uses .wire-list from lo-fi.css.
 * Renders a <ul> with each item in a <li>.
 */
export function WireList({ items, className = '' }: WireListProps) {
  return (
    <ul className={`wire-list ${className}`.trim()}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
