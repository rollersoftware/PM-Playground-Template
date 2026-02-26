# F&B Order — Self-service tab ordering (prototype)

Mobile-first guest ordering for a ROLLER-style venue. Guest has an existing booking and authorised card; they order F&B to their tab with no checkout. Each item has a **delivery location** (e.g. mini golf hole) for roaming guests.

## Flow

1. **Auth** — Verify you can order to your tab: “Send code” (mock SMS), then “Enter the code we sent you” and “Verify and continue”. Any 4–8 digit code accepts for demo.
2. **Entry** — Guest recognised → booking name, time, party size, current tab total, “Continue to Order”.
3. **Menu** — Categories + products. Each product has **“Deliver to”** (location picker: Hole 1–9, Bar) + “Add to cart”. Items go into a cart; confirmation banner “Added to cart”.
4. **Floating bar** — When cart has items: “X items in cart · $XX.XX” + “Add all to tab” (submit order) + “View your tab”. When cart empty: “X items on your tab · $XX.XX” + “View your tab”.
5. **Submit** — “Add all to tab” adds every cart item to the tab at once, then navigates to Tab summary.
6. **Tab summary** — Full list with **delivery location per line**, total, “What happens next”, “Keep ordering” only.

## UX principles

- No checkout; no payment form. Add items to cart, then submit the whole order to your tab; staff bring to your chosen locations, charged at end of session.
- Clear feedback: “Added to cart” per item; one action to add all to tab.

## State (mock)

- `booking`, `savedCard`, `existingTabItems`, `MOCK_LOCATIONS` from `mockData.ts`.
- `cartItems`: lines in cart (not yet on tab). `newItems`: lines added to tab after “Add all to tab”. Totals computed client-side.

## File structure

- `index.tsx` — Shell, state, screen routing, dev toggles.
- `types.ts` — Shared types.
- `mockData.ts` — Mock booking, menu, existing tab items.
- `fb-order.css` — Mobile-first layout (lo-fi tokens).
- `screens/` — AuthScreen, EntryScreen, MenuScreen, TabSummaryScreen.
- `components/` — FloatingTabSummary, ProductCard, edge-state placeholders.

## How to run

Open the app, go to the prototype directory, and click **F&B Order — Self-service tab ordering** (or navigate to `/p/fb-order`).
