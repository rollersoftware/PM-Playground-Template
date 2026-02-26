/**
 * Edge case: booking not found. Placeholder for unrecognised guest.
 */

import { WireCard } from '../../../components/lo-fi';

export function BookingNotFound() {
  return (
    <div className="fb-order__screen fb-order__edge-state">
      <WireCard variant="dashed" className="fb-order__edge-card">
        <h2 className="fb-order__edge-title">Booking not found</h2>
        <p className="fb-order__edge-body">
          We couldn’t find a booking linked to this device. Scan the QR at your lane or enter
          your booking details.
        </p>
        <p className="fb-order__edge-note">[Placeholder — no real action]</p>
      </WireCard>
    </div>
  );
}
