import type { ReactNode } from 'react';

export interface VmCardProgressProps {
  icon?: ReactNode;
  title: string;
  /** Progress 0–100 (e.g. 40 for 40%) */
  progressPercent: number;
  className?: string;
}

/**
 * VM progress card with icon, title, and progress bar.
 * Uses VM design tokens. Import vm.css when using.
 */
export function VmCardProgress({
  icon,
  title,
  progressPercent,
  className = '',
}: VmCardProgressProps) {
  return (
    <div className={`vm-demo__card-progress ${className}`.trim()}>
      {icon != null && <div className="vm-demo__card-progress-icon" aria-hidden>{icon}</div>}
      <p className="vm-demo__card-progress-title">{title}</p>
      <div className="vm-demo__progress-bar">
        <div
          className="vm-demo__progress-bar-fill"
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>
    </div>
  );
}
