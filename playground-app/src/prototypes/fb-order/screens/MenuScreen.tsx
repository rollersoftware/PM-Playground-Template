/**
 * Menu Screen: categories, products with "Deliver to" location + Add to cart.
 * After add: confirmation "Added to cart"; guest submits whole order via "Add all to tab" in the bar.
 */

import { useMemo, useState } from 'react';
import { WireCard } from '../../../components/lo-fi';
import { MOCK_CATEGORIES, MOCK_MENU, MOCK_LOCATIONS, getLocationNameById } from '../mockData';
import type { MenuItem, CartLine } from '../types';
import { ProductCard } from '../components/ProductCard';

export interface MenuScreenProps {
  cartItems: CartLine[];
  onAddToCart: (item: MenuItem, locationId: string) => void;
  onViewTab: () => void;
}

const ADDED_FEEDBACK_MS = 4000;

export function MenuScreen({ cartItems, onAddToCart, onViewTab }: MenuScreenProps) {
  const [lastAdded, setLastAdded] = useState<{ itemId: string; locationName: string } | null>(
    null
  );

  const itemsByCategory = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of MOCK_MENU) {
      const list = map.get(item.categoryId) ?? [];
      list.push(item);
      map.set(item.categoryId, list);
    }
    return map;
  }, []);

  const handleAdd = (item: MenuItem, locationId: string) => {
    onAddToCart(item, locationId);
    setLastAdded({
      itemId: item.id,
      locationName: getLocationNameById(locationId),
    });
    window.setTimeout(() => setLastAdded(null), ADDED_FEEDBACK_MS);
  };

  return (
    <div className="fb-order__screen fb-order__menu">
      <h1 className="fb-order__menu-title">Order to your tab</h1>
      <p className="fb-order__menu-sub">
        Choose where to receive each order (e.g. your current hole). Add items to your cart, then
        add all to your tab at once. No payment now.
      </p>

      {lastAdded && (
        <WireCard variant="solid" className="fb-order__added-banner" role="status" aria-live="polite">
          <p className="fb-order__added-banner-title">Added to cart</p>
          <p className="fb-order__added-banner-detail">
            Delivering to <strong>{lastAdded.locationName}</strong>. When you’re ready, use “Add all to tab” below.
          </p>
          <p className="fb-order__added-banner-next">
            Keep adding items or view your tab.
          </p>
          <button
            type="button"
            className="fb-order__added-banner-btn"
            onClick={onViewTab}
          >
            View your tab
          </button>
        </WireCard>
      )}

      <div className="fb-order__menu-scroll">
        {MOCK_CATEGORIES.map((cat) => {
          const items = itemsByCategory.get(cat.id) ?? [];
          if (items.length === 0) return null;
          return (
            <section key={cat.id} className="wire-card wire-card--section fb-order__menu-category">
              <h2 className="lofi-card__header fb-order__menu-cat-title">{cat.name}</h2>
              <ul className="lofi-card-stack fb-order__product-list" aria-label={`${cat.name} products`}>
                {items.map((item) => (
                  <li key={item.id}>
                    <ProductCard
                      item={item}
                      locations={MOCK_LOCATIONS}
                      onAddToCart={handleAdd}
                      justAdded={lastAdded?.itemId === item.id}
                      addedLocationName={lastAdded?.itemId === item.id ? lastAdded.locationName : undefined}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
