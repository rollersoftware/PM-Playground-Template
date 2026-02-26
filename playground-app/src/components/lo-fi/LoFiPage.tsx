import type { ReactNode } from 'react';

export interface LoFiPageProps {
  /** Header content (back link, title) */
  header: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Optional wrapper class for the root (e.g. lo-fi-scope is applied by consumer) */
  className?: string;
}

/**
 * Lo-fi page layout: header (with border) + main content area.
 * Use with .lofi-demo and .lo-fi-scope on the root; styles from lo-fi-demo.css.
 * For full page layout, wrap in a div with classes "lofi-demo lo-fi-scope" and import lo-fi-demo.css.
 */
export function LoFiPage({ header, children, className = '' }: LoFiPageProps) {
  return (
    <div className={`lofi-demo ${className}`.trim()}>
      <header className="lofi-demo__header">{header}</header>
      <main className="lofi-demo__main">{children}</main>
    </div>
  );
}
