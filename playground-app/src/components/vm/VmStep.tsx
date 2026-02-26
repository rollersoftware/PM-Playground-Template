import type { ReactNode } from 'react';

export interface VmStepProps {
  stepNumber: number | string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  action?: ReactNode;
  className?: string;
}

/**
 * VM checklist step row: number badge, title, description, link, action button.
 * Uses VM design tokens. Import vm.css when using.
 */
export function VmStep({
  stepNumber,
  title,
  description,
  link,
  action,
  className = '',
}: VmStepProps) {
  return (
    <div className={`vm-demo__step ${className}`.trim()}>
      <span className="vm-demo__step-num">{stepNumber}</span>
      <div className="vm-demo__step-body">
        <p className="vm-demo__step-title">{title}</p>
        {description != null && <p className="vm-demo__step-desc">{description}</p>}
        {link != null && (
          <a href={link.href} className="vm-demo__step-link">
            {link.label}
          </a>
        )}
      </div>
      {action != null && action}
    </div>
  );
}
