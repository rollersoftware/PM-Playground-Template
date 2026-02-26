/**
 * Single menu product: name, price, description, "Deliver to" location picker, Add to cart.
 * Adding sends item + location to cart; guest submits the whole order to tab via "Add all to tab".
 */

import { useState } from 'react';
import { WireButton, WireCard } from '../../../components/lo-fi';
import { formatTabTotal } from '../mockData';
import type { MenuItem, OrderLocation } from '../types';

export interface ProductCardProps {
  item: MenuItem;
  locations: OrderLocation[];
  onAddToCart: (item: MenuItem, locationId: string) => void;
  /** Brief "Added to cart" state with delivery location name. */
  justAdded?: boolean;
  addedLocationName?: string;
}

export function ProductCard({
  item,
  locations,
  onAddToCart,
  justAdded,
  addedLocationName,
}: ProductCardProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    locations[0]?.id ?? ''
  );

  const handleAdd = () => {
    if (!selectedLocationId) return;
    onAddToCart(item, selectedLocationId);
  };

  return (
    <WireCard variant="solid" className="wire-card--item fb-order__product-card">
      <div className="fb-order__product-head">
        <span className="fb-order__product-name">{item.name}</span>
        <span className="fb-order__product-price">{formatTabTotal(item.price)}</span>
      </div>
      <p className="fb-order__product-desc">{item.description}</p>

      <hr className="lofi-card__divider" aria-hidden="true" />

      <div className="fb-order__product-location">
        <label htmlFor={`${item.id}-location`} className="fb-order__product-location-label">
          Deliver to
        </label>
        <select
          id={`${item.id}-location`}
          className="wire-input fb-order__product-location-select"
          value={selectedLocationId}
          onChange={(e) => setSelectedLocationId(e.target.value)}
          disabled={justAdded}
          aria-label="Where to deliver this order"
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <WireButton
        type="button"
        primary
        className="fb-order__product-add"
        onClick={handleAdd}
        disabled={justAdded}
        aria-live="polite"
      >
        {justAdded && addedLocationName
          ? `Added to cart — delivering to ${addedLocationName}`
          : 'Add to cart'}
      </WireButton>
    </WireCard>
  );
}
