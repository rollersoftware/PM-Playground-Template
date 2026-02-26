/**
 * Edge case: tab already closed. Placeholder — guest can't add more items.
 */

import { WireCard } from '../../../components/lo-fi';

export function TabClosed() {
  return (
    <div className="fb-order__screen fb-order__edge-state">
      <WireCard variant="dashed" className="fb-order__edge-card">
        <h2 className="fb-order__edge-title">Tab closed</h2>
        <p className="fb-order__edge-body">
          This tab has been closed. If you’d like to order more, please see staff to reopen or
          start a new tab.
        </p>
        <p className="fb-order__edge-note">[Placeholder — no real action]</p>
      </WireCard>
    </div>
  );
}
