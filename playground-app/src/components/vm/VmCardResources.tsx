import type { ReactNode } from 'react';

export interface VmResourceLink {
  label: string;
  href?: string;
}

export interface VmCardResourcesProps {
  icon?: ReactNode;
  title: string;
  resources: VmResourceLink[];
  className?: string;
}

/**
 * VM resources card: icon, title, list of links with external indicator.
 * Uses VM design tokens. Import vm.css when using.
 */
export function VmCardResources({
  icon,
  title,
  resources,
  className = '',
}: VmCardResourcesProps) {
  return (
    <div className={`vm-demo__card-resources ${className}`.trim()}>
      {icon != null && (
        <div className="vm-demo__card-resources-icon" aria-hidden>
          {icon}
        </div>
      )}
      <p className="vm-demo__card-resources-title">{title}</p>
      <ul className="vm-demo__resources-list">
        {resources.map((item) => (
          <li key={item.label}>
            <a href={item.href ?? '#resources'} className="vm-demo__resources-link">
              {item.label}
            </a>
            <span className="vm-demo__resources-ext" aria-hidden>
              ↗
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
