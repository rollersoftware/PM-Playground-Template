import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface PosNavItem {
  id: string;
  label: string;
  icon?: string;
}

export interface PosNavProps {
  /** Link for "Back" (e.g. to="/") */
  backTo: string;
  backLabel?: string;
  items: PosNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * POS left sidebar nav: back link + list of items.
 * Uses POS design tokens. Import pos.css when using.
 */
export function PosNav({
  backTo,
  backLabel = '← Back',
  items,
  activeId,
  onSelect,
  className = '',
}: PosNavProps) {
  return (
    <nav className={`pos-demo__nav ${className}`.trim()}>
      <Link to={backTo} className="pos-demo__nav-back">
        {backLabel}
      </Link>
      <div className="pos-demo__nav-list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`pos-demo__nav-item ${activeId === item.id ? 'is-active' : ''}`}
          >
            {item.icon != null && <span aria-hidden>{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
