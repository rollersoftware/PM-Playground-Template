import type { ReactNode } from 'react';

export interface PosCartLineItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PosCartProps {
  /** When empty, show empty state and optional actions */
  lines: PosCartLineItem[];
  /** Subtotal (computed or passed in) */
  subtotal: number;
  /** Tax amount */
  tax: number;
  /** Total (subtotal + tax) */
  total: number;
  /** Callback to change quantity: (lineId, delta) */
  onQuantityChange?: (lineId: string, delta: number) => void;
  /** Empty state actions (e.g. "Add table", "Discount" buttons) */
  emptyActions?: ReactNode;
  /** Pay button (or null to hide) */
  payButton?: ReactNode;
  className?: string;
}

/**
 * POS cart sidebar: empty state or lines + summary + pay.
 * Uses POS design tokens. Import pos.css when using.
 */
export function PosCart({
  lines,
  subtotal,
  tax,
  total,
  onQuantityChange,
  emptyActions,
  payButton,
  className = '',
}: PosCartProps) {
  const itemCount = lines.reduce((n, i) => n + i.quantity, 0);

  if (lines.length === 0) {
    return (
      <aside className={`pos-demo__cart ${className}`.trim()}>
        <div className="pos-demo__cart-empty">
          <div className="pos-demo__cart-empty-icon" aria-hidden>
            ⌕
          </div>
          <p className="pos-demo__cart-empty-text">Your cart is empty</p>
        </div>
        {emptyActions != null && <div className="pos-demo__cart-actions">{emptyActions}</div>}
      </aside>
    );
  }

  return (
    <aside className={`pos-demo__cart ${className}`.trim()}>
      <div className="pos-demo__cart-lines">
        {lines.map((item) => (
          <div key={item.id} className="pos-demo__cart-line">
            <div className="pos-demo__cart-line-info">
              <span className="pos-demo__cart-line-name">{item.name}</span>
              <span className="pos-demo__cart-line-qty">× {item.quantity}</span>
            </div>
            <div className="pos-demo__cart-line-right">
              <span className="pos-demo__cart-line-price">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              {onQuantityChange != null && (
                <>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(item.id, -1)}
                    className="pos-demo__cart-line-btn"
                    aria-label={`Remove one ${item.name}`}
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(item.id, 1)}
                    className="pos-demo__cart-line-btn"
                    aria-label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pos-demo__cart-summary">
        <div className="pos-demo__cart-summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="pos-demo__cart-summary-row">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="pos-demo__cart-summary-total">
          <span>Total ({itemCount} items):</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {payButton != null && payButton}
      </div>
    </aside>
  );
}
