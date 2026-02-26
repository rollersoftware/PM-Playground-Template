export type PosProductCardAccent = 'yellow' | 'blue' | 'red';

export interface PosProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  soldOut?: boolean;
  accent?: PosProductCardAccent;
  onClick?: () => void;
  className?: string;
}

/**
 * POS product card for product grid. Uses POS design tokens. Import pos.css when using.
 */
export function PosProductCard({
  id,
  name,
  description,
  price,
  soldOut = false,
  accent = 'yellow',
  onClick,
  className = '',
}: PosProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={soldOut}
      className={`pos-demo__product-card pos-demo__product-card--${accent} ${className}`.trim()}
    >
      <span className="pos-demo__product-name">{name}</span>
      <span className="pos-demo__product-desc">{description}</span>
      <div className="pos-demo__product-footer">
        <span className="pos-demo__product-price">${price.toFixed(2)}</span>
        {soldOut && <span className="pos-demo__product-soldout">Sold Out</span>}
      </div>
    </button>
  );
}
