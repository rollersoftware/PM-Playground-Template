import type { ReactNode } from 'react';

export interface VmWelcomeProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Optional dismiss action (e.g. "Dismiss checklist") */
  dismiss?: ReactNode;
  className?: string;
}

/**
 * VM welcome block (e.g. "Welcome, Fabian 👋" with subtitle and dismiss).
 * Uses VM design tokens. Import vm.css when using.
 */
export function VmWelcome({ title, subtitle, dismiss, className = '' }: VmWelcomeProps) {
  return (
    <div className={`vm-demo__welcome ${className}`.trim()}>
      <div className="vm-demo__welcome-text">
        <h1>{title}</h1>
        {subtitle != null && <p className="vm-demo__welcome-subtitle">{subtitle}</p>}
      </div>
      {dismiss != null && <button type="button" className="vm-demo__dismiss">{dismiss}</button>}
    </div>
  );
}
