/**
 * F&B Order prototype — shared types.
 * All data is mock; no real API.
 */

export interface Booking {
  id: string;
  name: string;
  time: string;
  partySize: number;
}

export interface SavedCard {
  last4: string;
  brand: string;
  authorised: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
}

export interface MenuCategory {
  id: string;
  name: string;
}

/** Venue location where order can be delivered (e.g. mini golf hole, lane). */
export interface OrderLocation {
  id: string;
  name: string;
}

/** Line item on the tab (existing or newly added). */
export interface TabLineItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  /** Where to deliver (e.g. "Hole 3"). Optional for legacy/existing items. */
  locationId?: string;
  /** True if added in this session; false if from existing tab. */
  isNew?: boolean;
}

/** Line in the cart before submitting to tab (no id until submitted). */
export interface CartLine {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  locationId: string;
}

export type FbOrderScreen = 'auth' | 'entry' | 'menu' | 'tab';
