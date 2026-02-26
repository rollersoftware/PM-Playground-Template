import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface VmNavItem {
  id: string;
  label: string;
  badge?: number;
}

export interface VmSidebarProps {
  backTo: string;
  backLabel?: string;
  logoText: string;
  userLabel: string;
  searchPlaceholder?: string;
  navItems: VmNavItem[];
  activeNavId: string;
  onNavSelect: (id: string) => void;
  /** Optional bottom icon buttons (help, search, notifications, profile) */
  bottomActions?: ReactNode;
  className?: string;
}

/**
 * VM (Venue Manager) dark sidebar: back, logo, user, search, nav, bottom actions.
 * Uses VM design tokens. Import vm.css when using.
 */
export function VmSidebar({
  backTo,
  backLabel = '← Back to Directory',
  logoText,
  userLabel,
  searchPlaceholder = 'Search',
  navItems,
  activeNavId,
  onNavSelect,
  bottomActions,
  className = '',
}: VmSidebarProps) {
  return (
    <aside className={`vm-demo__sidebar ${className}`.trim()}>
      <div className="vm-demo__sidebar-top">
        <Link to={backTo} className="vm-demo__back">
          {backLabel}
        </Link>
        <div className="vm-demo__logo-row">
          <div className="vm-demo__logo" aria-hidden />
          <span className="vm-demo__logo-text">{logoText}</span>
        </div>
        <div className="vm-demo__user">{userLabel}</div>
        <div className="vm-demo__search-wrap">
          <span className="vm-demo__search-icon" aria-hidden>
            ⌕
          </span>
          <input type="search" placeholder={searchPlaceholder} aria-label="Search" />
        </div>
      </div>

      <nav className="vm-demo__nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavSelect(item.id)}
            className={`vm-demo__nav-item ${activeNavId === item.id ? 'is-active' : ''}`}
          >
            <span aria-hidden>•</span>
            {item.label}
            {item.badge != null && <span className="vm-demo__nav-badge">{item.badge}</span>}
          </button>
        ))}
      </nav>

      {bottomActions != null && <div className="vm-demo__sidebar-bottom">{bottomActions}</div>}
    </aside>
  );
}
