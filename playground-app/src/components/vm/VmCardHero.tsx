import type { ReactNode } from 'react';

export interface VmCardHeroProps {
  /** Thumb area (icon or placeholder) */
  thumb: ReactNode;
  label?: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * VM hero card (e.g. getting started checklist card with thumb + body).
 * Uses VM design tokens. Import vm.css when using.
 */
export function VmCardHero({
  thumb,
  label,
  title,
  subtitle,
  onClick,
  className = '',
}: VmCardHeroProps) {
  const content = (
    <>
      <div className="vm-demo__card-hero-thumb">{thumb}</div>
      <div className="vm-demo__card-hero-body">
        {label != null && <p className="vm-demo__card-hero-label">{label}</p>}
        <p className="vm-demo__card-hero-title">{title}</p>
        {subtitle != null && <p className="vm-demo__card-hero-sub">{subtitle}</p>}
      </div>
    </>
  );

  if (onClick != null) {
    return (
      <button
        type="button"
        className={`vm-demo__card-hero ${className}`.trim()}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return <div className={`vm-demo__card-hero ${className}`.trim()}>{content}</div>;
}
