/**
 * F&B Order — Mobile-first self-service ordering prototype (ROLLER-style venue).
 *
 * FLOW:
 * 1. Auth → Send code to phone, then enter code to verify you can add to tab and order.
 * 2. Entry → Guest recognised → Entry Screen: booking + tab total + "Continue to Order".
 * 3. Menu → Categories + products; each has "Deliver to" (location) + "Add to cart". Items go into cart.
 * 4. Floating bar → "X items in cart · $XX.XX" + "Add all to tab" (submit order); or "View your tab".
 * 5. On "Add all to tab" → all cart items are added to tab at once, then Tab Summary.
 * 6. Tab Summary → Full list, total, "What happens next", Keep ordering only.
 *
 * UX: Verify with a code first; then add to cart and submit to tab; staff bring to chosen locations.
 */

import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FloatingTabSummary } from './components/FloatingTabSummary';
import { AuthScreen } from './screens/AuthScreen';
import { EntryScreen } from './screens/EntryScreen';
import { MenuScreen } from './screens/MenuScreen';
import { TabSummaryScreen } from './screens/TabSummaryScreen';
import {
  MOCK_BOOKING,
  MOCK_SAVED_CARD,
  MOCK_EXISTING_TAB_ITEMS,
  totalFromItems,
} from './mockData';
import type { FbOrderScreen, TabLineItem, CartLine, MenuItem } from './types';
import './fb-order.css';

function generateLineId(): string {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function FbOrder() {
  const [screen, setScreen] = useState<FbOrderScreen>('auth');
  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [newItems, setNewItems] = useState<TabLineItem[]>([]);

  const booking = MOCK_BOOKING;
  const savedCard = MOCK_SAVED_CARD;
  const existingTabItems = MOCK_EXISTING_TAB_ITEMS;
  const allItems = useMemo(
    () => [...existingTabItems, ...newItems],
    [existingTabItems, newItems]
  );
  const total = useMemo(() => totalFromItems(allItems), [allItems]);
  const tabItemsCount = allItems.reduce((n, line) => n + line.quantity, 0);

  const handleAddToCart = useCallback((item: MenuItem, locationId: string) => {
    setCartItems((prev) => [
      ...prev,
      {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        locationId,
      },
    ]);
  }, []);

  const handleSubmitOrder = useCallback(() => {
    const lines: TabLineItem[] = cartItems.map((line) => ({
      id: generateLineId(),
      menuItemId: line.menuItemId,
      name: line.name,
      price: line.price,
      quantity: line.quantity,
      locationId: line.locationId,
      isNew: true,
    }));
    setNewItems((prev) => [...prev, ...lines]);
    setCartItems([]);
    setScreen('tab');
  }, [cartItems]);

  const handleViewTab = useCallback(() => setScreen('tab'), []);
  const handleKeepOrdering = useCallback(() => setScreen('menu'), []);

  return (
    <div className="fb-order lo-fi-scope">
      <header className="fb-order__header">
        <Link to="/" className="fb-order__back">
          ← Back to Directory
        </Link>
        <h1 className="fb-order__title">F&B Order</h1>
      </header>

      <main className="fb-order__main">
        {screen === 'auth' && (
          <AuthScreen onVerified={() => setScreen('entry')} />
        )}

        {screen === 'entry' && (
          <EntryScreen
            booking={booking}
            savedCard={savedCard}
            tabTotal={total}
            onContinue={() => setScreen('menu')}
          />
        )}

        {screen === 'menu' && (
          <>
            <MenuScreen
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onViewTab={handleViewTab}
            />
            <FloatingTabSummary
              cartItems={cartItems}
              tabItemsCount={tabItemsCount}
              tabTotal={total}
              onSubmitOrder={handleSubmitOrder}
              onViewTab={handleViewTab}
            />
          </>
        )}

        {screen === 'tab' && (
          <TabSummaryScreen
            booking={booking}
            savedCard={savedCard}
            allItems={allItems}
            total={total}
            onKeepOrdering={handleKeepOrdering}
          />
        )}
      </main>
    </div>
  );
}
