import type { ReactNode } from 'react';

export interface VmCardCollapseProps {
  title: string;
  description?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * VM collapsible card: header (title, description, chevron) + body.
 * Uses VM design tokens. Import vm.css when using.
 */
export function VmCardCollapse({
  title,
  description,
  open,
  onToggle,
  children,
  className = '',
}: VmCardCollapseProps) {
  return (
    <div className={`vm-demo__card-collapse ${open ? 'is-open' : ''} ${className}`.trim()}>
      <button type="button" className="vm-demo__card-collapse-header" onClick={onToggle}>
        <div>
          <p className="vm-demo__card-collapse-title">{title}</p>
          {description != null && <p className="vm-demo__card-collapse-desc">{description}</p>}
        </div>
        <span className="vm-demo__card-collapse-chevron" aria-hidden>
          ▼
        </span>
      </button>
      <div className="vm-demo__card-collapse-body">{children}</div>
    </div>
  );
}
