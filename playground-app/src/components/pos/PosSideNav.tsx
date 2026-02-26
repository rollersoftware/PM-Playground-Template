import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface PosSideNavIconItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface PosSideNavPanelItem {
  id: string;
  label: string;
}

export interface PosSideNavProps {
  /** Optional top brand bar (e.g. orange strip) */
  showBrandBar?: boolean;
  /** User name in narrow strip */
  userName?: string;
  /** Time string (e.g. "8:48 am") */
  time?: string;
  /** Icon nav items (Search, Capacity, Food and Bev, Packages) */
  iconItems: PosSideNavIconItem[];
  /** Currently active icon item id */
  activeIconId?: string;
  /** Called when an icon item is selected */
  onIconSelect?: (id: string) => void;
  /** Optional panel section (e.g. Settings) */
  panelTitle?: string;
  /** Panel menu items */
  panelItems?: PosSideNavPanelItem[];
  /** Currently active panel item id (e.g. "print-stations") */
  activePanelId?: string;
  /** Called when a panel item is selected */
  onPanelSelect?: (id: string) => void;
  /** Bottom icon items (More, Log out) */
  bottomIconItems?: PosSideNavIconItem[];
  /** Called when a bottom item is selected */
  onBottomSelect?: (id: string) => void;
  /** Back link URL (e.g. "/") - if set, back link is shown in strip */
  backTo?: string;
  backLabel?: string;
  className?: string;
}

/**
 * POS side navigation: two-column sidebar (icon strip + optional panel)
 * with user, time, icon nav, optional Settings-style panel, and bottom actions.
 * Uses POS design tokens. Import components/pos/pos.css when using.
 */
export function PosSideNav({
  showBrandBar = true,
  userName = 'FABIAN FORGIONE',
  time = '8:48 am',
  iconItems,
  activeIconId,
  onIconSelect,
  panelTitle,
  panelItems = [],
  activePanelId,
  onPanelSelect,
  bottomIconItems = [],
  onBottomSelect,
  backTo,
  backLabel = '← Back',
  className = '',
}: PosSideNavProps) {
  return (
    <aside className={`pos-sidenav ${className}`.trim()} aria-label="POS navigation">
      {showBrandBar && <div className="pos-sidenav__brand" aria-hidden />}
      <div className="pos-sidenav__inner">
        <div className="pos-sidenav__strip">
          {backTo != null && (
            <Link to={backTo} className="pos-sidenav__back">
              {backLabel}
            </Link>
          )}
          {userName && (
            <div className="pos-sidenav__user">{userName}</div>
          )}
          {time && (
            <div className="pos-sidenav__time">{time}</div>
          )}
          <nav className="pos-sidenav__icon-list" aria-label="Main">
            {iconItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onIconSelect?.(item.id)}
                className={`pos-sidenav__icon-item ${activeIconId === item.id ? 'is-active' : ''}`}
              >
                <span className="pos-sidenav__icon-symbol" aria-hidden>{item.icon}</span>
                <span className="pos-sidenav__icon-label">{item.label}</span>
              </button>
            ))}
          </nav>
          {bottomIconItems.length > 0 && (
            <nav className="pos-sidenav__bottom" aria-label="More actions">
              {bottomIconItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onBottomSelect?.(item.id)}
                  className="pos-sidenav__icon-item"
                >
                  <span className="pos-sidenav__icon-symbol" aria-hidden>{item.icon}</span>
                  <span className="pos-sidenav__icon-label">{item.label}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
        {panelTitle != null && panelTitle !== '' && (
          <div className="pos-sidenav__panel">
            <h2 className="pos-sidenav__panel-title">{panelTitle}</h2>
            <nav className="pos-sidenav__panel-list" aria-label={panelTitle}>
              {panelItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onPanelSelect?.(item.id)}
                  className={`pos-sidenav__panel-item ${activePanelId === item.id ? 'is-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
