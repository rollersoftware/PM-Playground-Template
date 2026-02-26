import type { ReactNode } from 'react';

export interface PosHeaderProps {
  /** User/venue name (e.g. "FABIAN FORGIONE") */
  user: string;
  /** Time string (e.g. "2:03 pm") */
  time: string;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Optional slot for actions (date picker, buttons) */
  actions?: ReactNode;
  className?: string;
}

/**
 * POS header bar: user, time, search, and optional actions.
 * Uses POS design tokens. Import pos.css when using.
 */
export function PosHeader({
  user,
  time,
  searchPlaceholder = 'Start typing or scan...',
  actions,
  className = '',
}: PosHeaderProps) {
  return (
    <header className={`pos-demo__header ${className}`.trim()}>
      <span className="pos-demo__header-user">{user}</span>
      <span className="pos-demo__header-time">{time}</span>
      <div className="pos-demo__header-search-wrap">
        <span className="pos-demo__header-search-icon" aria-hidden>
          ⌕
        </span>
        <input
          type="search"
          className="pos-demo__header-search"
          placeholder={searchPlaceholder}
          aria-label="Search or scan"
        />
      </div>
      {actions != null && <div className="pos-demo__header-actions">{actions}</div>}
    </header>
  );
}
