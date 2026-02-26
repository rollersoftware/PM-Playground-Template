/**
 * Sticky footer: when cart has items, show "X in cart · $Y" + "Add all to tab"; else show tab summary + "View your tab".
 */

import { WireButton } from '../../../components/lo-fi';
import { formatTabTotal, totalFromCart } from '../mockData';
import type { CartLine } from '../types';

export interface FloatingTabSummaryProps {
  cartItems: CartLine[];
  tabItemsCount: number;
  tabTotal: number;
  onSubmitOrder: () => void;
  onViewTab: () => void;
}

export function FloatingTabSummary({
  cartItems,
  tabItemsCount,
  tabTotal,
  onSubmitOrder,
  onViewTab,
}: FloatingTabSummaryProps) {
  const hasCartItems = cartItems.length > 0;
  const cartCount = cartItems.reduce((n, line) => n + line.quantity, 0);
  const cartTotal = totalFromCart(cartItems);

  return (
    <div className="fb-order__tab-bar" role="region" aria-label="Cart and tab summary">
      <div className="fb-order__tab-bar-inner">
        <div className="fb-order__tab-bar-info">
          {hasCartItems ? (
            <>
              <span className="fb-order__tab-bar-summary">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
              </span>
              <span className="fb-order__tab-bar-total">{formatTabTotal(cartTotal)}</span>
            </>
          ) : (
            <>
              <span className="fb-order__tab-bar-summary">
                {tabItemsCount} {tabItemsCount === 1 ? 'item' : 'items'} on your tab
              </span>
              <span className="fb-order__tab-bar-total">{formatTabTotal(tabTotal)}</span>
            </>
          )}
        </div>
        <div className="fb-order__tab-bar-actions">
          {hasCartItems && (
            <WireButton
              type="button"
              primary
              className="fb-order__tab-bar-btn"
              onClick={onSubmitOrder}
            >
              Add all to tab
            </WireButton>
          )}
          <WireButton
            type="button"
            primary={!hasCartItems}
            className={hasCartItems ? 'fb-order__tab-bar-btn fb-order__tab-bar-btn--secondary' : 'fb-order__tab-bar-btn'}
            onClick={onViewTab}
          >
            View your tab
          </WireButton>
        </div>
      </div>
    </div>
  );
}
