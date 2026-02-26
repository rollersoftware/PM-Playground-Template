import type { ReactNode } from 'react';

/**
 * Default empty-cart actions: Add table + Discount.
 * Use inside PosCart emptyActions or compose your own.
 */
export function PosCartEmptyActions({
  onAddTable,
  onDiscount,
}: {
  onAddTable?: () => void;
  onDiscount?: () => void;
}) {
  return (
    <>
      <button type="button" className="pos-demo__cart-btn-add" onClick={onAddTable}>
        Add table
      </button>
      <button type="button" className="pos-demo__cart-btn-discount" onClick={onDiscount}>
        Discount
      </button>
    </>
  );
}

/**
 * Primary "Pay" button for PosCart summary.
 */
export function PosCartPayButton({ onClick, children = 'Pay' }: { onClick?: () => void; children?: ReactNode }) {
  return (
    <button type="button" className="pos-demo__cart-btn-pay" onClick={onClick}>
      {children}
    </button>
  );
}
