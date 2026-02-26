import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoBeerOutline,
  IoDocumentTextOutline,
  IoFastFoodOutline,
  IoPricetagOutline,
  IoReceiptOutline,
  IoRestaurantOutline,
} from 'react-icons/io5';
import {
  HiOutlineCube,
  HiOutlineDotsHorizontal,
  HiOutlineLogout,
  HiOutlineSearch,
  HiOutlineViewGrid,
} from 'react-icons/hi';
import { PosSideNav } from '../../components/pos';
import '../../components/pos/pos.css';
import './printer-setup-pos.css';

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

const SIDENAV_PANEL_ITEMS = [
  { id: 'current-till', label: 'Current till session' },
  { id: 'past-till', label: 'Past till sessions' },
  { id: 'device', label: 'Device' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'print-stations', label: 'Print stations' },
  { id: 'printer-logs', label: 'Printer logs' },
];

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
const PRINTER_ROLE_OPTIONS: { id: PrinterRole; label: string; icon: React.ReactNode }[] = [
  { id: 'kitchen', label: 'Kitchen Production', icon: <IoRestaurantOutline /> },
  { id: 'bar', label: 'Bar Production', icon: <IoBeerOutline /> },
  { id: 'receipt', label: 'Receipt Printing', icon: <IoReceiptOutline /> },
  { id: 'ticket', label: 'Ticket / Guest Receipts', icon: <IoDocumentTextOutline /> },
  { id: 'label', label: 'Label Printing', icon: <IoPricetagOutline /> },
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
 * ROLLER POS — Printer & Production Setup (Hi-Fi POS).
 * Same flow as lo-fi: guided wizard, device- or admin-first entry.
 * Styled with POS design system (pos-theme.css).
 */
export function PrinterSetupPos() {
  const [view, setView] = useState<View>('entry-pos');
  const [selectedRole, setSelectedRole] = useState<PrinterRole | null>(null);

  const goToRole = (initialRole?: PrinterRole) => {
    if (initialRole) setSelectedRole(initialRole);
    setView('wizard-1');
  };

  return (
    <div className="printer-pos">
      <PosSideNav
        showBrandBar
        userName="FABIAN FORGIONE"
        time="8:48 am"
        iconItems={SIDENAV_ICON_ITEMS}
        bottomIconItems={SIDENAV_BOTTOM_ITEMS}
        panelTitle="Settings"
        panelItems={SIDENAV_PANEL_ITEMS}
        activePanelId="print-stations"
        onPanelSelect={() => {}}
        backTo="/"
        backLabel="← Back"
      />
      <div className="printer-pos__body">
        <header className="printer-pos__header">
          <Link to="/" className="printer-pos__back">
            ← Back to Directory
          </Link>
          <span className="printer-pos__title" style={{ margin: 0 }}>
            Printer & Production Setup
          </span>
          <nav className="printer-pos__nav" aria-label="Screens">
            {(Object.keys(VIEW_LABELS) as View[]).map((v) => (
              <button
                key={v}
                type="button"
                className={`printer-pos__nav-btn ${view === v ? 'is-active' : ''}`}
                onClick={() => setView(v)}
              >
                {VIEW_LABELS[v]}
              </button>
            ))}
          </nav>
        </header>

        <main className="printer-pos__main">
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
    </div>
  );
}

function EntryPos({ onAddPrinter }: { onAddPrinter: () => void }) {
  return (
    <>
      <h1 className="printer-pos__page-title">Printer for this terminal</h1>
      <p className="printer-pos__subtitle">
        This terminal has no printer. Add one and we’ll walk you through it: what kind, find the device, then choose what prints to it.
      </p>
      <div className="printer-pos__card printer-pos__card--entry">
        <p className="printer-pos__card-body printer-pos__card-body--lead">
          No printer connected. Orders from this terminal won’t print until you add one.
        </p>
        <div className="printer-pos__actions">
          <button type="button" className="printer-pos__btn printer-pos__btn--primary printer-pos__btn--lg" onClick={onAddPrinter}>
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
      <h1 className="printer-pos__page-title">Entry — From Venue Manager</h1>
      <p className="printer-pos__subtitle">
        Devices → Production & Printing. Visual map of terminals + printers. You can assign new printers to specific terminals from here.
      </p>
      <div className="printer-pos__card">
        <h2 className="printer-pos__card-title">Production & Printing</h2>
        <div className="printer-pos__placeholder" style={{ minHeight: '8rem', marginBottom: '1rem' }}>
          Visual map: terminals + printers (boxes with labels)
        </div>
        <div className="printer-pos__actions">
          <button type="button" className="printer-pos__btn printer-pos__btn--primary" onClick={onAddPrinter}>
            Add New Printer
          </button>
          <button type="button" className="printer-pos__btn">
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
      <h1 className="printer-pos__page-title">Step 2 of 3 — Find your {roleLabel} printer</h1>
      <p className="printer-pos__wizard-subtitle">
        Pick the device on your network. It will be this terminal’s {roleLabel} printer.
      </p>
      <div className="printer-pos__progress-wrap">
        <div className="printer-pos__progress-bar" role="progressbar" aria-valuenow={2} aria-valuemin={0} aria-valuemax={3}>
          <span className="printer-pos__progress-segment is-filled" />
          <span className="printer-pos__progress-segment is-filled" />
          <span className="printer-pos__progress-segment" />
        </div>
      </div>
      <div className="printer-pos__card">
        <h2 className="printer-pos__card-title">Devices on your network</h2>
        <p className="printer-pos__card-body">
          Select the printer to use for {getRoleLabel(printerRole)} on this terminal.
        </p>
        <p className="printer-pos__device-count">Found 3 devices:</p>
        <ul className="printer-pos__device-list">
          {DISCOVER_DEVICES.map((device) => (
            <li key={device.id}>
              <button
                type="button"
                className={`printer-pos__device-card ${selectedId === device.id ? 'is-selected' : ''} ${!device.compatible ? 'is-disabled' : ''}`}
                onClick={() => device.compatible && setSelectedId(device.id)}
                disabled={!device.compatible}
              >
                <span
                  className={`printer-pos__device-check ${device.compatible ? 'is-ok' : ''}`}
                  aria-hidden
                >
                  {device.compatible ? '✓' : ''}
                </span>
                <div className="printer-pos__device-body">
                  <p className="printer-pos__device-name">{device.name}</p>
                  <p className="printer-pos__device-detail">{device.detail}</p>
                </div>
                <span
                  className={`printer-pos__pill ${device.status === 'online' ? 'printer-pos__pill--success' : 'printer-pos__pill--muted'}`}
                >
                  {device.status === 'online' ? 'Online' : 'Incompatible'}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="printer-pos__actions" style={{ flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="printer-pos__btn printer-pos__btn--primary printer-pos__btn-continue"
            onClick={onNext}
            disabled={!selected?.compatible}
          >
            Use this as {roleLabel} printer
            <span aria-hidden>→</span>
          </button>
          <button type="button" className="printer-pos__btn">
            Search again
          </button>
        </div>
        <p className="printer-pos__hint" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
          <button type="button" className="printer-pos__btn printer-pos__btn--ghost" style={{ fontSize: '0.875rem' }}>
            Manual entry (advanced)
          </button>
        </p>
      </div>
    </>
  );
}

/** Categories that can be assigned to this printer (by role). */
const CATEGORIES_BY_ROLE: Record<PrinterRole, string[]> = {
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
      <h1 className="printer-pos__page-title">Step 1 of 3 — What kind of printer?</h1>
      <p className="printer-pos__subtitle">
        This printer will be used for this terminal. Choose the type that matches the device you’re connecting.
      </p>
      <div className="printer-pos__stepper">
        <span className="printer-pos__step is-active">1. Type</span>
        <span className="printer-pos__step">2. Find it</span>
        <span className="printer-pos__step">3. What prints</span>
      </div>
      <div className="printer-pos__card">
        <h2 className="printer-pos__card-title">Printer type</h2>
        <div className="printer-pos__tiles">
          {PRINTER_ROLE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`printer-pos__tile ${selectedRole === opt.id ? 'is-selected' : ''}`}
              onClick={() => setSelectedRole(opt.id)}
            >
              <span className="printer-pos__tile-icon" aria-hidden>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="printer-pos__actions">
          <button type="button" className="printer-pos__btn printer-pos__btn--primary" onClick={() => onNext(selectedRole)}>
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
  const categories = CATEGORIES_BY_ROLE[printerRole];
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
      <h1 className="printer-pos__page-title">Step 3 of 3 — What prints to this {roleLabel} printer?</h1>
      <p className="printer-pos__subtitle">
        Select the product categories that send orders to this printer. You can change this later in settings.
      </p>
      <div className="printer-pos__stepper">
        <span className="printer-pos__step is-done">1. Type</span>
        <span className="printer-pos__step is-done">2. Find it</span>
        <span className="printer-pos__step is-active">3. What prints</span>
      </div>
      <div className="printer-pos__card">
        <h2 className="printer-pos__card-title">Categories for this printer</h2>
        {isReceiptOrTicket ? (
          <p className="printer-pos__card-body">
            This printer will receive the full order ({printerRole === 'receipt' ? 'customer receipt' : 'guest / ticket receipt'}).
          </p>
        ) : categories.length > 0 ? (
          <>
            <p className="printer-pos__card-body">
              Tick the categories that should print to this {roleLabel} printer.
            </p>
            <div className="printer-pos__route-actions">
              <button type="button" className="printer-pos__btn printer-pos__btn--ghost printer-pos__btn--sm" onClick={selectAll}>
                Select all
              </button>
              <button type="button" className="printer-pos__btn printer-pos__btn--ghost printer-pos__btn--sm" onClick={selectNone}>
                Clear
              </button>
            </div>
            <ul className="printer-pos__category-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <label className="printer-pos__checkbox-label">
                    <input
                      type="checkbox"
                      checked={selected.has(cat)}
                      onChange={() => toggle(cat)}
                      className="printer-pos__checkbox"
                    />
                    <span>{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="printer-pos__card-body">
            No category selection needed for this printer type.
          </p>
        )}
        <div className="printer-pos__actions">
          <button type="button" className="printer-pos__btn printer-pos__btn--primary" onClick={onNext}>
            Finish setup
          </button>
        </div>
        {!isReceiptOrTicket && categories.length > 0 && (
          <p className="printer-pos__hint" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
            <button type="button" className="printer-pos__btn printer-pos__btn--ghost" style={{ fontSize: '0.875rem' }} onClick={onSeeOptionB}>
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
      <h1 className="printer-pos__page-title">Step 3: Route products for this {roleLabel} printer (Option B)</h1>
      <p className="printer-pos__subtitle">
        System suggests routing from menu structure for this {roleLabel} printer; override at category or item level.
      </p>
      <div className="printer-pos__stepper">
        <span className="printer-pos__step is-done">1. Type</span>
        <span className="printer-pos__step is-done">2. Find it</span>
        <span className="printer-pos__step is-active">3. What prints</span>
      </div>
      <div className="printer-pos__card">
        <h2 className="printer-pos__card-title">Recommended routing for {roleLabel} printer</h2>
        <p className="printer-pos__card-body">
          Based on your menu: Food → Kitchen, Drinks → Bar. You can change any category or item below.
        </p>
        <div className="printer-pos__table-wrap">
          <table className="printer-pos__table">
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
        <p className="printer-pos__hint">
          Advanced: override at individual item level (toggle).
        </p>
        <p className="printer-pos__hint">
          <button type="button" className="printer-pos__btn printer-pos__btn--ghost" style={{ fontSize: '0.875rem' }} onClick={onSeeOptionA}>
            See Option A: Category-based routing
          </button>
        </p>
        <div className="printer-pos__actions">
          <button type="button" className="printer-pos__btn printer-pos__btn--primary" onClick={onNext}>
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
      <h1 className="printer-pos__page-title">Production Overview</h1>
      <p className="printer-pos__dashboard-subtitle">Main Café — Printer Status &amp; Routing</p>

      <section className="printer-pos__section">
        <h2 className="printer-pos__section-title">Connected printers</h2>
        <div className="printer-pos__printer-cards">
          <div className="printer-pos__printer-card">
            <span className="printer-pos__printer-card-icon" aria-hidden>🖨</span>
            <p className="printer-pos__printer-card-name">Kitchen Printer</p>
            <p className="printer-pos__printer-card-model">Epson TM-T88VI</p>
            <span className="printer-pos__pill printer-pos__pill--success">Online</span>
            <p className="printer-pos__printer-card-meta">Assigned to: Terminals 01, 02</p>
            <ul className="printer-pos__printer-card-routes">
              <li>Burgers</li>
              <li>Pizza</li>
              <li>Salads</li>
              <li>+ 3 more</li>
            </ul>
            <div className="printer-pos__printer-card-actions">
              <button type="button" className="printer-pos__btn printer-pos__btn--ghost printer-pos__btn--sm">Test</button>
              <button type="button" className="printer-pos__btn printer-pos__btn--ghost printer-pos__btn--sm">Edit</button>
            </div>
          </div>
          <div className="printer-pos__printer-card">
            <span className="printer-pos__printer-card-icon" aria-hidden>🖨</span>
            <p className="printer-pos__printer-card-name">Bar Printer</p>
            <p className="printer-pos__printer-card-model">Star TSP143IV</p>
            <span className="printer-pos__pill printer-pos__pill--success">Online</span>
            <p className="printer-pos__printer-card-meta">Assigned to: Terminal 02</p>
            <ul className="printer-pos__printer-card-routes">
              <li>Beer</li>
              <li>Wine</li>
              <li>Cocktails</li>
              <li>+ 2 more</li>
            </ul>
            <div className="printer-pos__printer-card-actions">
              <button type="button" className="printer-pos__btn printer-pos__btn--ghost printer-pos__btn--sm">Test</button>
              <button type="button" className="printer-pos__btn printer-pos__btn--ghost printer-pos__btn--sm">Edit</button>
            </div>
          </div>
          <div className="printer-pos__printer-card printer-pos__printer-card--offline">
            <span className="printer-pos__printer-card-icon" aria-hidden>🖨</span>
            <p className="printer-pos__printer-card-name">Receipt Printer</p>
            <p className="printer-pos__printer-card-model">Epson TM-m30</p>
            <span className="printer-pos__pill printer-pos__pill--warning">Offline</span>
            <p className="printer-pos__printer-card-meta">Last seen: 2 hours ago</p>
            <ul className="printer-pos__printer-card-routes">
              <li>Customer Receipts</li>
            </ul>
            <div className="printer-pos__printer-card-actions">
              <button type="button" className="printer-pos__btn printer-pos__btn--primary printer-pos__btn--sm" onClick={onOffline}>Troubleshoot</button>
              <button type="button" className="printer-pos__btn printer-pos__btn--ghost printer-pos__btn--sm">Edit</button>
            </div>
          </div>
        </div>
      </section>

      <section className="printer-pos__section">
        <h2 className="printer-pos__section-title">Routing summary</h2>
        <p className="printer-pos__card-body" style={{ marginBottom: '0.75rem' }}>Product Category Routing</p>
        <div className="printer-pos__card">
          <div className="printer-pos__routing-grid">
            <div>
              <p className="printer-pos__routing-column-title">Kitchen production</p>
              <ul className="printer-pos__routing-column-list">
                {KITCHEN_ROUTES.map((cat) => (
                  <li key={cat}>{cat} → Kitchen Printer</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="printer-pos__routing-column-title">Bar production</p>
              <ul className="printer-pos__routing-column-list">
                {BAR_ROUTES.map((cat) => (
                  <li key={cat}>{cat} → Bar Printer</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="printer-pos__actions" style={{ marginTop: '0.75rem' }}>
          <button type="button" className="printer-pos__btn">Edit Routing Rules</button>
          <button type="button" className="printer-pos__btn">View Print History</button>
        </div>
      </section>

      <section className="printer-pos__section">
        <h2 className="printer-pos__section-title">Testing</h2>
        <p className="printer-pos__card-body" style={{ marginBottom: '0.5rem' }}>Test Production Flow</p>
        <p className="printer-pos__testing-desc">
          Send a test order to verify printer routing before going live.
        </p>
        <button type="button" className="printer-pos__btn printer-pos__btn--primary printer-pos__btn-continue" onClick={onTestOrder}>
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
      <h1 className="printer-pos__page-title">Printer Not Responding</h1>
      <p className="printer-pos__subtitle">
        Calm, actionable. No technical jargon.
      </p>
      <div className="printer-pos__error-box">
        <h2 className="printer-pos__error-title">Receipt Printer not responding</h2>
        <p className="printer-pos__error-body">
          Last seen: 2 min ago. Check that the printer is on and connected to the same network.
        </p>
      </div>
      <div className="printer-pos__actions">
        <button type="button" className="printer-pos__btn printer-pos__btn--primary" onClick={onRetry}>
          Retry connection
        </button>
        <button type="button" className="printer-pos__btn">
          View setup guide
        </button>
        <button type="button" className="printer-pos__btn">
          Switch to backup printer
        </button>
      </div>
    </>
  );
}

function OrderConfirmation({ onDone }: { onDone: () => void }) {
  return (
    <>
      <h1 className="printer-pos__page-title">First F&B Order After Setup</h1>
      <p className="printer-pos__subtitle">
        Order: Burger, Beer, Tickets. Immediate visual confirmation in POS.
      </p>
      <div className="printer-pos__card">
        <h2 className="printer-pos__card-title">Order #1042</h2>
        <ul className="printer-pos__order-list">
          <li className="printer-pos__order-line">
            <span className="printer-pos__order-dest printer-pos__order-dest--none">No print</span>
            <span>Tickets × 2</span>
          </li>
          <li className="printer-pos__order-line">
            <span className="printer-pos__order-dest printer-pos__order-dest--kitchen">→ Kitchen</span>
            <span>Burger × 1</span>
          </li>
          <li className="printer-pos__order-line">
            <span className="printer-pos__order-dest printer-pos__order-dest--bar">→ Bar</span>
            <span>Beer × 1</span>
          </li>
        </ul>
        <div className="printer-pos__order-sent">
          <strong>Order sent to Kitchen & Bar</strong>
        </div>
        <div className="printer-pos__actions" style={{ marginTop: '1rem' }}>
          <button type="button" className="printer-pos__btn printer-pos__btn--primary" onClick={onDone}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}
