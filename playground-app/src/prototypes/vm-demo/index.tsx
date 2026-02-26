import { useState } from 'react';
import { Link } from 'react-router-dom';
import './vm-demo.css';

const NAV_ITEMS = [
  { id: 'getting-started', label: 'Getting started', active: true },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'activity', label: 'Activity center', badge: 9 },
  { id: 'bookings', label: 'Bookings' },
  { id: 'products', label: 'Products' },
  { id: 'guests', label: 'Guests' },
  { id: 'documents', label: 'Documents' },
  { id: 'reports', label: 'Reports' },
  { id: 'apps', label: 'Apps' },
  { id: 'settings', label: 'Settings' },
  { id: 'whats-new', label: "What's new", badge: 4 },
];

const RESOURCES = [
  'ROLLER Academy',
  'Help Center',
  'Hardware audit guide',
  'Online payments guide',
  'Pre-launch checklist',
  'Get support',
];

/**
 * VM demo — Venue Manager dashboard (getting started / checklist).
 * Layout aligned with ROLLER Venue Manager: sidebar, welcome, checklist cards.
 */
export function VmDemo() {
  const [activeNav, setActiveNav] = useState('getting-started');
  const [setupOpen, setSetupOpen] = useState(false);
  const [readyOpen, setReadyOpen] = useState(true);

  return (
    <div className="vm-demo">
      <aside className="vm-demo__sidebar">
        <div className="vm-demo__sidebar-top">
          <Link to="/" className="vm-demo__back">
            ← Back to Directory
          </Link>
          <div className="vm-demo__logo-row">
            <div className="vm-demo__logo" aria-hidden />
            <span className="vm-demo__logo-text">CB Fabian Forgione</span>
          </div>
          <div className="vm-demo__user">
            Fabian Forgione ★
          </div>
          <div className="vm-demo__search-wrap">
            <span className="vm-demo__search-icon" aria-hidden>⌕</span>
            <input type="search" placeholder="Search" aria-label="Search" />
          </div>
        </div>

        <nav className="vm-demo__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id)}
              className={`vm-demo__nav-item ${activeNav === item.id ? 'is-active' : ''}`}
            >
              <span aria-hidden>•</span>
              {item.label}
              {item.badge != null && (
                <span className="vm-demo__nav-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="vm-demo__sidebar-bottom">
          <button type="button" className="vm-demo__icon-btn" aria-label="Help">?</button>
          <button type="button" className="vm-demo__icon-btn" aria-label="Search">⌕</button>
          <button type="button" className="vm-demo__icon-btn" aria-label="Notifications">🔔</button>
          <button type="button" className="vm-demo__icon-btn" aria-label="Profile">👤</button>
        </div>
      </aside>

      <main className="vm-demo__content">
        <div className="vm-demo__welcome">
          <div className="vm-demo__welcome-text">
            <h1>Welcome, Fabian 👋</h1>
            <p className="vm-demo__welcome-subtitle">
              Follow the steps and resources below to get up and running with the ROLLER platform.
            </p>
          </div>
          <button type="button" className="vm-demo__dismiss">
            Dismiss checklist
          </button>
        </div>

        <div className="vm-demo__grid">
          <button type="button" className="vm-demo__card-hero">
            <div className="vm-demo__card-hero-thumb">▶</div>
            <div className="vm-demo__card-hero-body">
              <p className="vm-demo__card-hero-label">GETTING STARTED CHECKLIST</p>
              <p className="vm-demo__card-hero-title">Get set up to start selling!</p>
              <p className="vm-demo__card-hero-sub">Click for some quick tips to help you get started!</p>
            </div>
          </button>

          <div className="vm-demo__card-progress">
            <div className="vm-demo__card-progress-icon" aria-hidden>◉</div>
            <p className="vm-demo__card-progress-title">Good job, keep going!</p>
            <div className="vm-demo__progress-bar">
              <div className="vm-demo__progress-bar-fill" />
            </div>
          </div>

          <div className={`vm-demo__card-collapse ${setupOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="vm-demo__card-collapse-header"
              onClick={() => setSetupOpen(!setupOpen)}
            >
              <div>
                <p className="vm-demo__card-collapse-title">Set up your account</p>
                <p className="vm-demo__card-collapse-desc">Get started by configuring your account settings.</p>
              </div>
              <span className="vm-demo__card-collapse-chevron" aria-hidden>▼</span>
            </button>
            <div className="vm-demo__card-collapse-body">
              <p className="vm-demo__card-collapse-desc">Content when expanded.</p>
            </div>
          </div>

          <div className="vm-demo__card-resources">
            <div className="vm-demo__card-resources-icon" aria-hidden>🎓</div>
            <p className="vm-demo__card-resources-title">Helpful resources</p>
            <ul className="vm-demo__resources-list">
              {RESOURCES.map((label) => (
                <li key={label}>
                  <a href="#resources" className="vm-demo__resources-link">{label}</a>
                  <span className="vm-demo__resources-ext" aria-hidden>↗</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`vm-demo__card-collapse ${readyOpen ? 'is-open' : ''}`} style={{ gridColumn: '1 / -1' }}>
            <button
              type="button"
              className="vm-demo__card-collapse-header"
              onClick={() => setReadyOpen(!readyOpen)}
            >
              <div>
                <p className="vm-demo__card-collapse-title">Get ready to sell</p>
                <p className="vm-demo__card-collapse-desc">Create your products and sales channels ready for launch.</p>
              </div>
              <span className="vm-demo__card-collapse-chevron" aria-hidden>▼</span>
            </button>
            <div className="vm-demo__card-collapse-body">
              <div className="vm-demo__step">
                <span className="vm-demo__step-num">4</span>
                <div className="vm-demo__step-body">
                  <p className="vm-demo__step-title">Create your resources</p>
                  <p className="vm-demo__step-desc">Create your resources to manage your venue capacity</p>
                  <a href="#how" className="vm-demo__step-link">How to create your resources</a>
                </div>
                <button type="button" className="vm-demo__step-btn">Create resources</button>
              </div>
              <div className="vm-demo__step">
                <span className="vm-demo__step-num">5</span>
                <div className="vm-demo__step-body">
                  <p className="vm-demo__step-title">Create your products</p>
                  <p className="vm-demo__step-desc">Create your products ready to sell</p>
                  <a href="#how" className="vm-demo__step-link">How to create your products</a>
                </div>
                <button type="button" className="vm-demo__step-btn">Create products</button>
              </div>
              <div className="vm-demo__step">
                <span className="vm-demo__step-num">6</span>
                <div className="vm-demo__step-body">
                  <p className="vm-demo__step-title">Create your Progressive Checkout</p>
                  <p className="vm-demo__step-desc">Set up checkout for your customers</p>
                  <a href="#how" className="vm-demo__step-link">How to set up checkout</a>
                </div>
                <button type="button" className="vm-demo__step-btn">Create checkout</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
