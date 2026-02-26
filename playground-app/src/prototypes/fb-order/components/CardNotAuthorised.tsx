/**
 * Edge case: card not authorised. Placeholder — no real payment flow.
 */

import { WireCard } from '../../../components/lo-fi';

export function CardNotAuthorised() {
  return (
    <div className="fb-order__screen fb-order__edge-state">
      <WireCard variant="dashed" className="fb-order__edge-card">
        <h2 className="fb-order__edge-title">Card not authorised</h2>
        <p className="fb-order__edge-body">
          Your card hasn’t been authorised for this booking. Please see staff to add a payment
          method before ordering.
        </p>
        <p className="fb-order__edge-note">[Placeholder — no real action]</p>
      </WireCard>
    </div>
  );
}
