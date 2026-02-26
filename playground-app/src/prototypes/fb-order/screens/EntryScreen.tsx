/**
 * Entry Screen (QR / Auto-Recognised).
 * Simulates recognised guest: booking name, time, party size, current tab total.
 * "Continue to Order" → Menu. Trust: card already authorised, items go to tab.
 */

import { WireButton, WireCard } from '../../../components/lo-fi';
import { formatTabTotal } from '../mockData';
import type { Booking, SavedCard } from '../types';

export interface EntryScreenProps {
  booking: Booking;
  savedCard: SavedCard;
  tabTotal: number;
  onContinue: () => void;
}

export function EntryScreen({ booking, savedCard, tabTotal, onContinue }: EntryScreenProps) {
  return (
    <div className="fb-order__screen fb-order__entry">
      <div className="fb-order__entry-hero">
        <p className="fb-order__entry-greeting">You’re all set</p>
        <p className="fb-order__entry-sub">
          Order food & drinks to your tab — no payment needed now.
        </p>
      </div>

      <WireCard variant="solid" className="wire-card--item fb-order__entry-card">
        <h2 className="fb-order__entry-booking-name">{booking.name}</h2>
        <ul className="wire-list fb-order__entry-meta">
          <li>Time: {booking.time}</li>
          <li>Party size: {booking.partySize}</li>
          <li>Current tab: {formatTabTotal(tabTotal)}</li>
        </ul>
        {savedCard.authorised && (
          <>
            <hr className="lofi-card__divider" aria-hidden="true" />
            <p className="fb-order__entry-trust" aria-label="Payment method">
            Your card ending in {savedCard.last4} is securely saved. You’ll receive a final
            receipt after your session.
          </p>
          </>
        )}
      </WireCard>

      <div className="fb-order__entry-actions">
        <WireButton type="button" primary className="fb-order__btn-block" onClick={onContinue}>
          Continue to Order
        </WireButton>
      </div>
    </div>
  );
}
