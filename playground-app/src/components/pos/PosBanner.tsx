import type { ReactNode } from 'react';

export interface PosBannerProps {
  children: ReactNode;
  /** Optional action (e.g. "Allow local network access") */
  action?: ReactNode;
  className?: string;
}

/**
 * POS warning/info banner (e.g. "ROLLER Connect is not connected").
 * Uses POS design tokens. Import pos.css when using.
 */
export function PosBanner({ children, action, className = '' }: PosBannerProps) {
  return (
    <div className={`pos-demo__banner ${className}`.trim()}>
      <span>{children}</span>
      {action != null && (
        <button type="button" className="pos-demo__banner-button">
          {action}
        </button>
      )}
    </div>
  );
}
