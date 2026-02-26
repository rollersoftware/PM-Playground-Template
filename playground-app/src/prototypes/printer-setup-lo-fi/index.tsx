import { useState } from 'react';
import { Link } from 'react-router-dom';
import './printer-setup-lo-fi.css';

type View =
  | 'entry-pos'
  | 'entry-vm'
  | 'wizard-1'
  | 'wizard-2'
  | 'wizard-4a'
  | 'wizard-4b'
  | 'dashboard'
  | 'error'
  | 'order';

const VIEW_LABELS: Record<View, string> = {
  'entry-pos': '1. POS Entry',
  'entry-vm': '2. VM Entry',
  'wizard-1': '3a. Wizard: Role',
  'wizard-2': '3b. Wizard: Discover',
  'wizard-4a': '3c. Wizard: Route (Category)',
  'wizard-4b': '3d. Wizard: Route (Smart)',
  dashboard: '4. Dashboard',
  error: '5. Error',
  order: '6. Order',
};

type PrinterRole = 'kitchen' | 'bar' | 'receipt' | 'ticket' | 'label';
const PRINTER_ROLE_OPTIONS: { id: PrinterRole; label: string; icon: string }[] = [
  { id: 'kitchen', label: 'Kitchen Production', icon: '🍳' },
  { id: 'bar', label: 'Bar Production', icon: '🍺' },
  { id: 'receipt', label: 'Receipt Printing', icon: '🧾' },
  { id: 'ticket', label: 'Ticket / Guest Receipts', icon: '🎫' },
  { id: 'label', label: 'Label Printing', icon: '🏷' },
];
function getRoleLabel(role: PrinterRole): string {
  const r = PRINTER_ROLE_OPTIONS.find((o) => o.id === role);
  return r?.label ?? role;
}
function getRoleShortLabel(role: PrinterRole): string {
  const map: Record<PrinterRole, string> = {
    kitchen: 'Kitchen',
    bar: 'Bar',
    receipt: 'Receipt',
    ticket: 'Ticket',
    label: 'Label',
  };
  return map[role] ?? role;
}

/**
 * ROLLER POS — Simplified Connect Printer & Production Setup (Lo-Fi Wireframes).
 * Guided wizard, no SSL jargon, device-first or admin-first entry.
 */
export function PrinterSetupLoFi() {
  const [view, setView] = useState<View>('entry-pos');
  const [selectedRole, setSelectedRole] = useState<PrinterRole | null>(null);

  const goToRole = (initialRole?: PrinterRole) => {
    if (initialRole) setSelectedRole(initialRole);
    setView('wizard-1');
  };

  return (
    <div className="printer-lofi lo-fi-scope">
      <header className="printer-lofi__header">
        <Link to="/" className="printer-lofi__back">
          ← Back to Directory
        </Link>
        <span className="printer-lofi__title" style={{ margin: 0 }}>
          ROLLER POS — Printer & Production Setup
        </span>
        <nav className="printer-lofi__nav" aria-label="Wireframe screens">
          {(Object.keys(VIEW_LABELS) as View[]).map((v) => (
            <button
              key={v}
              type="button"
              className={`printer-lofi__nav-btn ${view === v ? 'is-active' : ''}`}
              onClick={() => setView(v)}
            >
              {VIEW_LABELS[v]}
            </button>
          ))}
        </nav>
      </header>

      <main className="printer-lofi__main">
        {view === 'entry-pos' && <EntryPos onAddPrinter={() => goToRole()} />}
        {view === 'entry-vm' && <EntryVm onAddPrinter={() => goToRole()} />}
        {view === 'wizard-1' && (
          <WizardRole
            initialRole={selectedRole ?? undefined}
            onNext={(role) => {
              setSelectedRole(role);
              setView('wizard-2');
            }}
          />
        )}
        {view === 'wizard-2' && (
          <WizardDiscover
            printerRole={selectedRole ?? 'kitchen'}
            onNext={() => setView('wizard-4a')}
          />
        )}
        {view === 'wizard-4a' && (
          <WizardRouteCategory
            printerRole={selectedRole ?? 'kitchen'}
            onNext={() => setView('dashboard')}
            onSeeOptionB={() => setView('wizard-4b')}
          />
        )}
        {view === 'wizard-4b' && (
          <WizardRouteSmart
            printerRole={selectedRole ?? 'kitchen'}
            onNext={() => setView('dashboard')}
            onSeeOptionA={() => setView('wizard-4a')}
          />
        )}
        {view === 'dashboard' && (
          <Dashboard onTestOrder={() => setView('order')} onOffline={() => setView('error')} />
        )}
        {view === 'error' && <ErrorOffline onRetry={() => setView('dashboard')} />}
        {view === 'order' && <OrderConfirmation onDone={() => setView('dashboard')} />}
      </main>
    </div>
  );
}

function EntryPos({ onAddPrinter }: { onAddPrinter: () => void }) {
  return (
    <>
      <h1 className="printer-lofi__title">1️⃣ Printer for this terminal</h1>
      <p className="printer-lofi__annot">
        This terminal has no printer. Add one and we’ll walk you through it: what kind, find the device, then choose what prints to it.
      </p>
      <div className="wire-card">
        <h2 className="printer-lofi__section-title">Printers</h2>
        <p className="printer-lofi__section-body">
          No printer connected. Orders from this terminal won’t print until you add one.
        </p>
        <div className="printer-lofi__actions">
          <button type="button" className="wire-btn wire-btn--primary" onClick={onAddPrinter}>
            Add printer
          </button>
        </div>
      </div>
    </>
  );
}

function EntryVm({ onAddPrinter }: { onAddPrinter: () => void }) {
  return (
    <>
      <h1 className="printer-lofi__title">2️⃣ Entry — From Venue Manager</h1>
      <p className="printer-lofi__annot">
        Devices → Production & Printing. Visual map of terminals + printers. You can assign new printers to specific terminals from here.
      </p>
      <div className="wire-card">
        <h2 className="printer-lofi__section-title">Production & Printing</h2>
        <div className="wire-placeholder" style={{ minHeight: '8rem', marginBottom: '1rem' }}>
          Visual map: terminals + printers (boxes with labels)
        </div>
        <div className="printer-lofi__actions">
          <button type="button" className="wire-btn wire-btn--primary" onClick={onAddPrinter}>
            Add New Printer
          </button>
          <button type="button" className="wire-btn">
            Manage Production Routing
          </button>
        </div>
      </div>
    </>
  );
}

const DISCOVER_DEVICES = [
  {
    id: 'epson',
    name: 'Epson TM-T88VI',
    detail: 'Receipt Printer • Network: Main-Venue-WiFi',
    status: 'online' as const,
    compatible: true,
  },
  {
    id: 'star',
    name: 'Star TSP143IV',
    detail: 'Thermal Printer • Network: Main-Venue-WiFi',
    status: 'online' as const,
    compatible: true,
  },
  {
    id: 'hp',
    name: 'HP LaserJet Pro',
    detail: 'Not compatible with ROLLER POS',
    status: 'incompatible' as const,
    compatible: false,
  },
];

function WizardDiscover({ printerRole, onNext }: { printerRole: PrinterRole; onNext: () => void }) {
  const [selectedId, setSelectedId] = useState<string>('epson');
  const selected = DISCOVER_DEVICES.find((d) => d.id === selectedId);
  const roleLabel = getRoleShortLabel(printerRole);

  return (
    <>
      <h1 className="printer-lofi__title">Step 2 of 3 — Find your {roleLabel} printer</h1>
      <p className="printer-lofi__discover-subtitle">
        Pick the device on your network. It will be this terminal’s {roleLabel} printer.
      </p>
      <div className="printer-lofi__progress-wrap">
        <div className="printer-lofi__progress-bar" role="progressbar" aria-valuenow={2} aria-valuemin={0} aria-valuemax={3}>
          <span className="printer-lofi__progress-segment is-filled" />
          <span className="printer-lofi__progress-segment is-filled" />
          <span className="printer-lofi__progress-segment" />
        </div>
      </div>
      <div className="wire-card">
        <h2 className="printer-lofi__section-title">Devices on your network</h2>
        <p className="printer-lofi__section-body">
          Select the printer to use for {getRoleLabel(printerRole)} on this terminal.
        </p>
        <p className="printer-lofi__discover-count">Found 3 devices:</p>
        <ul className="wire-selectable-list">
          {DISCOVER_DEVICES.map((device) => (
            <li key={device.id}>
              <button
                type="button"
                className={`wire-selectable-card ${selectedId === device.id ? 'is-selected' : ''} ${!device.compatible ? 'is-disabled' : ''}`}
                onClick={() => device.compatible && setSelectedId(device.id)}
                disabled={!device.compatible}
              >
                <span
                  className={`wire-selectable-card__icon ${device.compatible ? 'wire-selectable-card__icon--check' : 'wire-selectable-card__icon--empty'}`}
                  aria-hidden
                >
                  {device.compatible ? '✓' : ''}
                </span>
                <div className="wire-selectable-card__body">
                  <p className="wire-selectable-card__title">{device.name}</p>
                  <p className="wire-selectable-card__detail">{device.detail}</p>
                </div>
                <span
                  className={`wire-selectable-pill ${
                    device.status === 'online' ? 'wire-selectable-pill--success' : 'wire-selectable-pill--muted'
                  }`}
                >
                  {device.status === 'online' ? 'Online ▼' : 'Incompatible'}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="printer-lofi__annot" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          → Auto-discovery shows compatible printers. Incompatible devices shown but disabled. System handles secure pairing — no SSL jargon.
        </p>
        <div className="printer-lofi__actions" style={{ flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="wire-btn wire-btn--primary printer-lofi__btn-continue"
            onClick={onNext}
            disabled={!selected?.compatible}
          >
            Use this as {roleLabel} printer
            <span aria-hidden>→</span>
          </button>
          <button type="button" className="wire-btn">
            Search again
          </button>
        </div>
        <p className="printer-lofi__annot" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
          <button type="button" className="wire-btn" style={{ fontSize: '0.85rem' }}>
            Manual entry (advanced)
          </button>
        </p>
      </div>
    </>
  );
}

const CATEGORIES_BY_ROLE_LOFI: Record<PrinterRole, string[]> = {
  kitchen: ['Burgers', 'Pizza', 'Salads', 'Sides', 'Appetizers', 'Desserts'],
  bar: ['Beer', 'Wine', 'Cocktails', 'Spirits', 'Soft drinks'],
  receipt: [],
  ticket: [],
  label: ['Item labels', 'Table labels'],
};

function WizardRole({
  initialRole,
  onNext,
}: {
  initialRole?: PrinterRole;
  onNext: (role: PrinterRole) => void;
}) {
  const [selectedRole, setSelectedRole] = useState<PrinterRole>(initialRole ?? 'kitchen');

  return (
    <>
      <h1 className="printer-lofi__title">Step 1 of 3 — What kind of printer?</h1>
      <p className="printer-lofi__annot">
        This printer will be used for this terminal. Choose the type that matches the device you’re connecting.
      </p>
      <div className="printer-lofi__stepper">
        <span className="printer-lofi__step is-active">1. Type</span>
        <span className="printer-lofi__step">2. Find it</span>
        <span className="printer-lofi__step">3. What prints</span>
      </div>
      <div className="wire-card">
        <h2 className="printer-lofi__section-title">Printer type</h2>
        <div className="printer-lofi__tiles">
          {PRINTER_ROLE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`printer-lofi__tile ${selectedRole === opt.id ? 'is-selected' : ''}`}
              onClick={() => setSelectedRole(opt.id)}
            >
              <span className="printer-lofi__tile-icon" aria-hidden>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="printer-lofi__actions">
          <button type="button" className="wire-btn wire-btn--primary" onClick={() => onNext(selectedRole)}>
            Next: find it on the network
          </button>
        </div>
      </div>
    </>
  );
}

function WizardRouteCategory({
  printerRole,
  onNext,
  onSeeOptionB,
}: {
  printerRole: PrinterRole;
  onNext: () => void;
  onSeeOptionB: () => void;
}) {
  const roleLabel = getRoleShortLabel(printerRole);
  const categories = CATEGORIES_BY_ROLE_LOFI[printerRole];
  const isReceiptOrTicket = printerRole === 'receipt' || printerRole === 'ticket';
  const [selected, setSelected] = useState<Set<string>>(() =>
    new Set(categories.length > 0 ? categories : [])
  );

  const toggle = (cat: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(categories));
  const selectNone = () => setSelected(new Set());

  return (
    <>
      <h1 className="printer-lofi__title">Step 3 of 3 — What prints to this {roleLabel} printer?</h1>
      <p className="printer-lofi__annot">
        Select the product categories that send orders to this printer. You can change this later in settings.
      </p>
      <div className="printer-lofi__stepper">
        <span className="printer-lofi__step is-done">1. Type</span>
        <span className="printer-lofi__step is-done">2. Find it</span>
        <span className="printer-lofi__step is-active">3. What prints</span>
      </div>
      <div className="wire-card">
        <h2 className="printer-lofi__section-title">Categories for this printer</h2>
        {isReceiptOrTicket ? (
          <p className="printer-lofi__section-body">
            This printer will receive the full order ({printerRole === 'receipt' ? 'customer receipt' : 'guest / ticket receipt'}).
          </p>
        ) : categories.length > 0 ? (
          <>
            <p className="printer-lofi__section-body">
              Tick the categories that should print to this {roleLabel} printer.
            </p>
            <div className="printer-lofi__actions" style={{ marginBottom: '0.75rem' }}>
              <button type="button" className="wire-btn" style={{ fontSize: '0.85rem' }} onClick={selectAll}>
                Select all
              </button>
              <button type="button" className="wire-btn" style={{ fontSize: '0.85rem' }} onClick={selectNone}>
                Clear
              </button>
            </div>
            <ul className="printer-lofi__category-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <label className="printer-lofi__checkbox-label">
                    <input
                      type="checkbox"
                      checked={selected.has(cat)}
                      onChange={() => toggle(cat)}
                      className="printer-lofi__checkbox"
                    />
                    <span>{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="printer-lofi__section-body">
            No category selection needed for this printer type.
          </p>
        )}
        <div className="printer-lofi__actions">
          <button type="button" className="wire-btn wire-btn--primary" onClick={onNext}>
            Finish setup
          </button>
        </div>
        {!isReceiptOrTicket && categories.length > 0 && (
          <p className="printer-lofi__annot" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
            <button type="button" className="wire-btn" style={{ fontSize: '0.85rem' }} onClick={onSeeOptionB}>
              Advanced: smart defaults + override
            </button>
          </p>
        )}
      </div>
    </>
  );
}

function WizardRouteSmart({
  printerRole,
  onNext,
  onSeeOptionA,
}: {
  printerRole: PrinterRole;
  onNext: () => void;
  onSeeOptionA: () => void;
}) {
  const roleLabel = getRoleShortLabel(printerRole);
  return (
    <>
      <h1 className="printer-lofi__title">Step 3: Route products for this {roleLabel} printer (Option B)</h1>
      <p className="printer-lofi__annot">
        System suggests routing from menu structure for this {roleLabel} printer; override at category or item level.
      </p>
      <div className="printer-lofi__stepper">
        <span className="printer-lofi__step is-done">1. Type</span>
        <span className="printer-lofi__step is-done">2. Find it</span>
        <span className="printer-lofi__step is-active">3. What prints</span>
      </div>
      <div className="wire-card">
        <h2 className="printer-lofi__section-title">Recommended routing for {roleLabel} printer</h2>
        <p className="printer-lofi__section-body">
          Based on your menu: Food → Kitchen, Drinks → Bar. You can change any category or item below.
        </p>
        <div className="printer-lofi__table-wrap">
          <table className="printer-lofi__table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Suggested</th>
                <th>Override</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Burgers</td><td>Kitchen</td><td>—</td></tr>
              <tr><td>Pizza</td><td>Kitchen</td><td>—</td></tr>
              <tr><td>Beer</td><td>Bar</td><td>—</td></tr>
              <tr><td>Cocktails</td><td>Bar</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
        <p className="printer-lofi__annot">
          Advanced: override at individual item level (toggle).
        </p>
        <p className="printer-lofi__annot">
          <button type="button" className="wire-btn" style={{ fontSize: '0.85rem' }} onClick={onSeeOptionA}>
            See Option A: Category-based routing
          </button>
        </p>
        <div className="printer-lofi__actions">
          <button type="button" className="wire-btn wire-btn--primary" onClick={onNext}>
            Finish setup
          </button>
        </div>
      </div>
    </>
  );
}

const KITCHEN_ROUTES = ['Burgers', 'Pizza', 'Salads', 'Sides', 'Appetizers', 'Desserts'];
const BAR_ROUTES = ['Beer', 'Wine', 'Cocktails', 'Spirits', 'Soft Drinks'];

function Dashboard({
  onTestOrder,
  onOffline,
}: {
  onTestOrder: () => void;
  onOffline: () => void;
}) {
  return (
    <>
      <h1 className="printer-lofi__title">Production Overview</h1>
      <p className="printer-lofi__dashboard-subtitle">Main Café — Printer Status &amp; Routing</p>

      {/* CONNECTED PRINTERS */}
      <section className="printer-lofi__dashboard-section">
        <h2 className="printer-lofi__dashboard-section-title">CONNECTED PRINTERS</h2>
        <div className="printer-lofi__printer-cards">
          <div className="printer-lofi__printer-card">
            <span className="printer-lofi__printer-card-icon" aria-hidden>🖨</span>
            <p className="printer-lofi__printer-card-name">Kitchen Printer</p>
            <p className="printer-lofi__printer-card-model">Epson TM-T88VI</p>
            <span className="printer-lofi__printer-card-pill printer-lofi__printer-card-pill--online">Online</span>
            <p className="printer-lofi__printer-card-assign">Assigned to: Terminals 01, 02</p>
            <ul className="printer-lofi__printer-card-routes">
              <li>Burgers</li>
              <li>Pizza</li>
              <li>Salads</li>
              <li>+ 3 more</li>
            </ul>
            <div className="printer-lofi__printer-card-actions">
              <button type="button" className="wire-btn" style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}>▷ Test</button>
              <button type="button" className="wire-btn" style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}>Edit</button>
            </div>
          </div>
          <div className="printer-lofi__printer-card">
            <span className="printer-lofi__printer-card-icon" aria-hidden>🖨</span>
            <p className="printer-lofi__printer-card-name">Bar Printer</p>
            <p className="printer-lofi__printer-card-model">Star TSP143IV</p>
            <span className="printer-lofi__printer-card-pill printer-lofi__printer-card-pill--online">Online</span>
            <p className="printer-lofi__printer-card-assign">Assigned to: Terminal 02</p>
            <ul className="printer-lofi__printer-card-routes">
              <li>Beer</li>
              <li>Wine</li>
              <li>Cocktails</li>
              <li>+ 2 more</li>
            </ul>
            <div className="printer-lofi__printer-card-actions">
              <button type="button" className="wire-btn" style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}>▷ Test</button>
              <button type="button" className="wire-btn" style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}>Edit</button>
            </div>
          </div>
          <div className="printer-lofi__printer-card printer-lofi__printer-card--offline">
            <span className="printer-lofi__printer-card-icon" aria-hidden>🖨</span>
            <p className="printer-lofi__printer-card-name">Receipt Printer</p>
            <p className="printer-lofi__printer-card-model">Epson TM-m30</p>
            <span className="printer-lofi__printer-card-pill printer-lofi__printer-card-pill--offline">Offline</span>
            <p className="printer-lofi__printer-card-assign">Last seen: 2 hours ago</p>
            <ul className="printer-lofi__printer-card-routes">
              <li>Customer Receipts</li>
            </ul>
            <div className="printer-lofi__printer-card-actions">
              <button type="button" className="wire-btn wire-btn--primary" style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }} onClick={onOffline}>Troubleshoot</button>
              <button type="button" className="wire-btn" style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}>Edit</button>
            </div>
          </div>
        </div>
        <p className="printer-lofi__annot" style={{ marginTop: '0.75rem' }}>
          → Card-based layout shows status at a glance. Color-coded borders for offline printers.
        </p>
      </section>

      {/* ROUTING SUMMARY */}
      <section className="printer-lofi__dashboard-section">
        <h2 className="printer-lofi__dashboard-section-title">ROUTING SUMMARY</h2>
        <p className="printer-lofi__section-body" style={{ marginBottom: '0.75rem' }}>Product Category Routing</p>
        <div className="wire-card">
          <div className="printer-lofi__routing-grid">
            <div>
              <p className="printer-lofi__routing-column-title">KITCHEN PRODUCTION</p>
              <ul className="printer-lofi__routing-column-list">
                {KITCHEN_ROUTES.map((cat) => (
                  <li key={cat}>{cat} → Kitchen Printer</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="printer-lofi__routing-column-title">BAR PRODUCTION</p>
              <ul className="printer-lofi__routing-column-list">
                {BAR_ROUTES.map((cat) => (
                  <li key={cat}>{cat} → Bar Printer</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="printer-lofi__annot" style={{ marginTop: '0.75rem' }}>
          → Clear category-to-printer mapping. Easy to scan and verify routing rules.
        </p>
        <div className="printer-lofi__actions" style={{ marginTop: '0.75rem' }}>
          <button type="button" className="wire-btn">Edit Routing Rules</button>
          <button type="button" className="wire-btn">View Print History</button>
        </div>
      </section>

      {/* TESTING */}
      <section className="printer-lofi__dashboard-section">
        <h2 className="printer-lofi__dashboard-section-title">TESTING</h2>
        <p className="printer-lofi__section-body" style={{ marginBottom: '0.5rem' }}>Test Production Flow</p>
        <p className="printer-lofi__testing-desc">
          Send a test order to verify printer routing before going live.
        </p>
        <button type="button" className="wire-btn wire-btn--primary printer-lofi__btn-continue" onClick={onTestOrder}>
          Run Test Order
          <span aria-hidden>→</span>
        </button>
      </section>
    </>
  );
}

function ErrorOffline({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <h1 className="printer-lofi__title">5️⃣ Error — Printer Not Responding</h1>
      <p className="printer-lofi__annot">
        Calm, actionable. No technical jargon.
      </p>
      <div className="printer-lofi__error-box">
        <h2 className="printer-lofi__error-title">Receipt Printer not responding</h2>
        <p className="printer-lofi__error-body">
          Last seen: 2 min ago. Check that the printer is on and connected to the same network.
        </p>
      </div>
      <div className="printer-lofi__actions">
        <button type="button" className="wire-btn wire-btn--primary" onClick={onRetry}>
          Retry connection
        </button>
        <button type="button" className="wire-btn">
          View setup guide
        </button>
        <button type="button" className="wire-btn">
          Switch to backup printer
        </button>
      </div>
    </>
  );
}

function OrderConfirmation({ onDone }: { onDone: () => void }) {
  return (
    <>
      <h1 className="printer-lofi__title">6️⃣ First F&B Order After Setup</h1>
      <p className="printer-lofi__annot">
        Order: Burger, Beer, Tickets. Immediate visual confirmation in POS.
      </p>
      <div className="wire-card">
        <h2 className="printer-lofi__section-title">Order #1042</h2>
        <ul className="wire-list" style={{ listStyle: 'none', padding: 0 }}>
          <li className="printer-lofi__order-line">
            <span className="printer-lofi__order-dest printer-lofi__order-dest--none">No print</span>
            <span>Tickets × 2</span>
          </li>
          <li className="printer-lofi__order-line">
            <span className="printer-lofi__order-dest printer-lofi__order-dest--kitchen">→ Kitchen</span>
            <span>Burger × 1</span>
          </li>
          <li className="printer-lofi__order-line">
            <span className="printer-lofi__order-dest printer-lofi__order-dest--bar">→ Bar</span>
            <span>Beer × 1</span>
          </li>
        </ul>
        <div className="wire-card wire-card--dashed" style={{ marginTop: '1rem', padding: '0.75rem' }}>
          <strong>Order sent to Kitchen & Bar</strong>
        </div>
        <div className="printer-lofi__actions" style={{ marginTop: '1rem' }}>
          <button type="button" className="wire-btn wire-btn--primary" onClick={onDone}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}
