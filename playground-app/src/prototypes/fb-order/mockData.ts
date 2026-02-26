/**
 * F&B Order prototype — mock data.
 * No API calls; all state is local.
 */

import type { Booking, SavedCard, MenuCategory, MenuItem, TabLineItem, CartLine, OrderLocation } from './types';

export const MOCK_BOOKING: Booking = {
  id: 'bkg-001',
  name: "Fabian's Bowling Booking",
  time: 'Today, 2:00 PM',
  partySize: 4,
};

export const MOCK_SAVED_CARD: SavedCard = {
  last4: '4242',
  brand: 'Visa',
  authorised: true,
};

/** Venue locations for delivery (e.g. mini golf holes, lanes). */
export const MOCK_LOCATIONS: OrderLocation[] = [
  { id: 'hole-1', name: 'Hole 1' },
  { id: 'hole-2', name: 'Hole 2' },
  { id: 'hole-3', name: 'Hole 3' },
  { id: 'hole-4', name: 'Hole 4' },
  { id: 'hole-5', name: 'Hole 5' },
  { id: 'hole-6', name: 'Hole 6' },
  { id: 'hole-7', name: 'Hole 7' },
  { id: 'hole-8', name: 'Hole 8' },
  { id: 'hole-9', name: 'Hole 9' },
  { id: 'bar', name: 'Bar / counter' },
];

export const MOCK_CATEGORIES: MenuCategory[] = [
  { id: 'drinks', name: 'Drinks' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'mains', name: 'Mains' },
];

export const MOCK_MENU: MenuItem[] = [
  { id: 'm1', name: 'House Lager', price: 6.5, description: '330ml draught', categoryId: 'drinks' },
  { id: 'm2', name: 'Soft Drink', price: 3.0, description: 'Pepsi, Lemonade, or Orange', categoryId: 'drinks' },
  { id: 'm3', name: 'Coffee', price: 4.0, description: 'Flat white, latte, or long black', categoryId: 'drinks' },
  { id: 'm4', name: 'Fries', price: 5.0, description: 'Salted, with dipping sauce', categoryId: 'snacks' },
  { id: 'm5', name: 'Nachos', price: 9.0, description: 'Cheese, jalapeños, sour cream', categoryId: 'snacks' },
  { id: 'm6', name: 'Garlic Bread', price: 6.0, description: 'Half or full', categoryId: 'snacks' },
  { id: 'm7', name: 'Burger & Fries', price: 18.0, description: 'Beef, cheese, house sauce', categoryId: 'mains' },
  { id: 'm8', name: 'Margherita Pizza', price: 14.0, description: '12" wood-fired', categoryId: 'mains' },
  { id: 'm9', name: 'Fish & Chips', price: 16.0, description: 'Beer-battered, mushy peas', categoryId: 'mains' },
];

/** Existing items already on the tab before this session (mock history). */
export const MOCK_EXISTING_TAB_ITEMS: TabLineItem[] = [
  { id: 't1', menuItemId: 'm1', name: 'House Lager', price: 6.5, quantity: 2, locationId: 'bar', isNew: false },
  { id: 't2', menuItemId: 'm4', name: 'Fries', price: 5.0, quantity: 1, locationId: 'hole-2', isNew: false },
];

function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/** Sum line items into a total. */
export function totalFromItems(items: TabLineItem[]): number {
  return items.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

/** Sum cart lines into a total. */
export function totalFromCart(cart: CartLine[]): number {
  return cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

export function formatTabTotal(amount: number): string {
  return formatPrice(amount);
}

export function getLocationNameById(locationId: string | undefined): string {
  if (!locationId) return '—';
  return MOCK_LOCATIONS.find((l) => l.id === locationId)?.name ?? locationId;
}
