import { useState } from 'react';
import { IoFastFoodOutline } from 'react-icons/io5';
import {
  HiOutlineCube,
  HiOutlineDotsHorizontal,
  HiOutlineLogout,
  HiOutlineSearch,
  HiOutlineViewGrid,
} from 'react-icons/hi';
import { PosSideNav } from '../../components/pos';
import '../../components/pos/pos.css';
import './pos-demo.css';

type ProductCardAccent = 'yellow' | 'blue' | 'red';

const SIDENAV_ICON_ITEMS = [
  { id: 'search', label: 'Search', icon: <HiOutlineSearch /> },
  { id: 'capacity', label: 'Capacity', icon: <HiOutlineViewGrid /> },
  { id: 'food-bev', label: 'Food and Bev', icon: <IoFastFoodOutline /> },
  { id: 'packages', label: 'Packages', icon: <HiOutlineCube /> },
];

const SIDENAV_BOTTOM_ITEMS = [
  { id: 'more', label: 'More', icon: <HiOutlineDotsHorizontal /> },
  { id: 'logout', label: 'Log out', icon: <HiOutlineLogout /> },
];

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  soldOut: boolean;
  accent?: ProductCardAccent;
};

const SECTIONS: { id: string; label: string; count: number; accent: ProductCardAccent; products: Product[] }[] = [
  {
    id: 'packages',
    label: 'Packages',
    count: 5,
    accent: 'yellow',
    products: [
      { id: 'p1', name: 'Party platter', description: 'Cold meats and cheese', price: 20, soldOut: true },
      { id: 'p2', name: 'Party platter', description: 'Cold meats and cheese', price: 20, soldOut: false },
      { id: 'p3', name: 'Party platter', description: 'Cold meats and cheese', price: 20, soldOut: true },
    ],
  },
  {
    id: 'pizza',
    label: 'Pizza',
    count: 7,
    accent: 'blue',
    products: [
      { id: 'z1', name: 'Cheese', description: 'Classic margherita', price: 14, soldOut: false },
      { id: 'z2', name: 'Ham and pineapple', description: 'With tomato base', price: 15, soldOut: true },
      { id: 'z3', name: 'Pepperoni', description: 'Spicy pepperoni', price: 15, soldOut: false },
      { id: 'z4', name: 'Supreme', description: 'Pepperoni, capsicum, olives', price: 16, soldOut: true },
      { id: 'z5', name: 'Large', description: 'Family size', price: 22, soldOut: true, accent: 'red' },
      { id: 'z6', name: 'Medium', description: 'Share size', price: 18, soldOut: false, accent: 'red' },
      { id: 'z7', name: 'Small', description: 'Personal', price: 12, soldOut: true, accent: 'red' },
    ],
  },
];

type CartItem = { id: string; name: string; price: number; quantity: number };

/**
 * POS demo — Food & Beverage select and checkout.
 * Styled with pos-demo.css (CSS only, uses design token variables).
 */
export function PosDemo() {
  const [activeNav, setActiveNav] = useState<string>('food-bev');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (id: string, name: string, price: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id, name, price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const itemCount = cart.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="pos-demo">
      <PosSideNav
        showBrandBar
        userName="FABIAN FORGIONE"
        time="2:03 pm"
        iconItems={SIDENAV_ICON_ITEMS}
        activeIconId={activeNav}
        onIconSelect={setActiveNav}
        bottomIconItems={SIDENAV_BOTTOM_ITEMS}
        onBottomSelect={(id) => id === 'logout' && setActiveNav(id)}
        backTo="/"
        backLabel="← Back"
      />
      <div className="pos-demo__body">
        <header className="pos-demo__header">
          <span className="pos-demo__header-user">FABIAN FORGIONE</span>
          <span className="pos-demo__header-time">2:03 pm</span>
          <div className="pos-demo__header-search-wrap">
            <span className="pos-demo__header-search-icon" aria-hidden>⌕</span>
            <input
              type="search"
              className="pos-demo__header-search"
              placeholder="Start typing or scan..."
              aria-label="Search or scan"
            />
          </div>
          <div className="pos-demo__header-actions">
            <input type="text" className="pos-demo__header-date" readOnly value="2026-02-23" aria-label="Date" />
            <button type="button" className="pos-demo__header-btn-ghost">
              + Redeem membership
            </button>
            <button type="button" className="pos-demo__header-btn-primary">
              <span aria-hidden>👤</span>
              + Add booking holder
            </button>
          </div>
        </header>

        <div className="pos-demo__main">
          <section className="pos-demo__products">
          {SECTIONS.map((section) => (
            <div key={section.id} className="pos-demo__section">
              <h2 className="pos-demo__section-title">
                {section.label} ({section.count})
              </h2>
              <div className="pos-demo__grid">
                {section.products.map((product) => {
                  const accent = product.accent ?? section.accent;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => !product.soldOut && addToCart(product.id, product.name, product.price)}
                      disabled={product.soldOut}
                      className={`pos-demo__product-card pos-demo__product-card--${accent}`}
                    >
                      <span className="pos-demo__product-name">{product.name}</span>
                      <span className="pos-demo__product-desc">{product.description}</span>
                      <div className="pos-demo__product-footer">
                        <span className="pos-demo__product-price">${product.price.toFixed(2)}</span>
                        {product.soldOut && <span className="pos-demo__product-soldout">Sold Out</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <aside className="pos-demo__cart">
          {cart.length === 0 ? (
            <>
              <div className="pos-demo__cart-empty">
                <div className="pos-demo__cart-empty-icon" aria-hidden>⌕</div>
                <p className="pos-demo__cart-empty-text">Your cart is empty</p>
              </div>
              <div className="pos-demo__cart-actions">
                <button type="button" className="pos-demo__cart-btn-add">
                  Add table
                </button>
                <button type="button" className="pos-demo__cart-btn-discount">
                  Discount
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="pos-demo__cart-lines">
                {cart.map((item) => (
                  <div key={item.id} className="pos-demo__cart-line">
                    <div className="pos-demo__cart-line-info">
                      <span className="pos-demo__cart-line-name">{item.name}</span>
                      <span className="pos-demo__cart-line-qty">× {item.quantity}</span>
                    </div>
                    <div className="pos-demo__cart-line-right">
                      <span className="pos-demo__cart-line-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="pos-demo__cart-line-btn"
                        aria-label={`Remove one ${item.name}`}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="pos-demo__cart-line-btn"
                        aria-label={`Add one ${item.name}`}
                      >
                        +
                      </button>
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
                <button type="button" className="pos-demo__cart-btn-pay">
                  Pay
                </button>
              </div>
            </>
          )}
        </aside>
        </div>
      </div>
    </div>
  );
}
