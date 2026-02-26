/**
 * Tab Summary: booking, full list with delivery location per item, total.
 * Clear "what happens next": charged to saved card, receipt after session; Keep ordering only.
 */

import { WireButton, WireCard } from '../../../components/lo-fi';
import { formatTabTotal, getLocationNameById } from '../mockData';
import type { Booking, SavedCard, TabLineItem } from '../types';

export interface TabSummaryScreenProps {
  booking: Booking;
  savedCard: SavedCard;
  allItems: TabLineItem[];
  total: number;
  onKeepOrdering: () => void;
}

export function TabSummaryScreen({
  booking,
  savedCard,
  allItems,
  total,
  onKeepOrdering,
}: TabSummaryScreenProps) {
  return (
    <div className="fb-order__screen fb-order__tab-summary">
      <h1 className="fb-order__tab-summary-title">Your tab</h1>
      <p className="fb-order__tab-summary-sub">
        Everything you’ve ordered. Staff will bring items to the locations you chose. You’ll be
        charged at the end of your session.
      </p>

      <WireCard variant="solid" className="wire-card--item fb-order__tab-booking">
        <h2 className="fb-order__tab-booking-name">{booking.name}</h2>
        <p className="fb-order__tab-meta">
          {booking.time} · Party of {booking.partySize}
        </p>
      </WireCard>

      <section
        className="wire-card wire-card--section fb-order__tab-items-section"
        aria-label="Items on tab"
      >
        <h2 className="lofi-card__header fb-order__section-title">Items</h2>
        <ul className="wire-list fb-order__tab-items">
          {allItems.map((line) => (
            <li key={line.id} className="fb-order__tab-line">
              <div className="fb-order__tab-line-left">
                <span className="fb-order__tab-line-name">
                  {line.quantity}× {line.name}
                  {line.isNew && <span className="fb-order__tab-line-new"> (new)</span>}
                </span>
                <span className="fb-order__tab-line-location" aria-label="Delivery location">
                  → {getLocationNameById(line.locationId)}
                </span>
              </div>
              <span className="fb-order__tab-line-price">
                {formatTabTotal(line.price * line.quantity)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <WireCard variant="solid" className="wire-card--item fb-order__tab-total-card">
        <div className="fb-order__tab-total-row">
          <span className="fb-order__tab-total-label">Total</span>
          <span className="fb-order__tab-total-value">{formatTabTotal(total)}</span>
        </div>
        {savedCard.authorised && (
          <>
            <hr className="lofi-card__divider" aria-hidden="true" />
            <p className="fb-order__tab-trust">
              Charged to your saved card (•••• {savedCard.last4}). You’ll receive a final receipt
              after your session.
            </p>
          </>
        )}
      </WireCard>

      <WireCard variant="solid" className="fb-order__tab-what-next">
        <p className="fb-order__tab-what-next-title">What happens next</p>
        <p className="fb-order__tab-what-next-body">
          Orders are on their way to your chosen locations. Add more anytime, or ask staff if you
          need anything.
        </p>
      </WireCard>

      <div className="fb-order__tab-actions">
        <WireButton type="button" primary className="fb-order__btn-block" onClick={onKeepOrdering}>
          Keep ordering
        </WireButton>
      </div>
    </div>
  );
}
