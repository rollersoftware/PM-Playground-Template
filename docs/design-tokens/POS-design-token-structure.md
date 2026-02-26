# POS Design Token Structure (Figma Variables)

**Visual reference (what POS looks like):**  
[Serve — POS Discovery & Components](https://www.figma.com/design/QGzNBmoPd3KeZO00p8h37V/%F0%9F%8E%8A-Serve---POS-Discovery--Components-?node-id=20004583-1591) — use this file for layout, components, and visual fidelity when building POS UI.

**Variable / token source:**  
[Serve — POS Components](https://www.figma.com/design/Rw4cGZS1DCCZuDFL8m9SFJ/%F0%9F%8E%8A-Serve---POS-Components?m=auto&node-id=4819-3430&t=nfWoEqCCqdJ71r8t-1) — variable collections (Core, Alias, Mapped) and token hierarchy.

**Product:** POS (Point of Sale) — *A separate token summary exists for Venue Manager (VM).*

**Tailwind (playground):** Use the POS theme when building POS components or prototypes:  
`playground-app/src/styles/pos-theme.css` — provides `pos-*` CSS variables (e.g. `var(--color-pos-brand-fill)`, `var(--color-pos-text-primary)`, `var(--text-pos-medium)`). Already imported in `playground-app/src/index.css`.

This document summarizes the **design token structure** and the **connection points between variable collections** (brand → alias → mapped) as used in the POS Figma file.

---

## 1. Collection hierarchy and connection points

Figma variables in this file follow a three-layer structure. The **connection point** between layers is that each upper layer **references** the layer below (aliases point to brand/core; mapped/semantic tokens point to aliases or core).

| Layer | Purpose | Typical content | Connection |
|--------|---------|------------------|------------|
| **Brand / Core** | Primitive palette and raw values | `core/{hue}/...` (green, navy, neutral, etc.) | Source of truth; no references to other variables. |
| **Alias** | Semantic names that point to core (or other aliases) | `rdl/pos/colour/...` roles (brand, critical, warning, text, nav, etc.) | **Connects to Brand:** alias variables resolve to core variables (e.g. POS “brand” → core green). |
| **Mapped / Product** | Product- or mode-specific bindings | `rdl-POS/...`, `rdl-vm/...`, mode-specific overrides | **Connects to Alias:** mapped tokens reference alias (or core) so switching mode/product swaps the bound alias. |

In practice:

- **Brand/Core** holds the hex (and number) values.
- **Alias** gives them meaning (e.g. “brand”, “critical”, “text/primary”) and points to core.
- **Mapped** ties those semantics to a product (POS vs VM) or mode (e.g. light/dark), and points to alias or core.

---

## 2. Brand / Core collection (primitives)

Primitive tokens live under **`core/`** by hue. Each hue has a consistent pattern: fill, fill-hover, fill-pressed, on-fill, surface, text, border, icon, etc.

| Hue | Example tokens | Role in POS |
|-----|----------------|-------------|
| **core/green** | fill `#18b159`, fill-hover `#158741`, surface `#f0fff4`, text `#105d2b` | POS **brand** (primary actions, nav secondary, success). |
| **core/neutral** | fill `#a1a1a7`, text `#252527`, surface `#fafafa`, border `#d4d4d6` | Default UI, text, borders, disabled. |
| **core/red** | fill `#ed4c4b`, surface `#fff1f0`, text `#66171b` | **Critical** (errors, destructive). |
| **core/orange** | fill `#fb8026`, surface `#fff6f0` | **Warning**-like (POS warning set is custom but in same family). |
| **core/navy** | fill `#5371a4`, surface `#f8f9fc`, text `#001f4a` | Headings, secondary brand (e.g. page heading `#183267`). |
| **core/cyan** | fill `#06a8f0`, surface `#f0fbff` | Informational / links (info and link colours align with blue/cyan). |

**Connection:** The **alias** collection (e.g. `rdl/pos/colour/brand/*`) references these core variables so POS “brand” is tied to **core/green**, and “critical” to **core/red**.

---

## 3. Alias collection (semantic — POS)

Semantic tokens live under **`rdl/pos/colour/`** (and a few under `rdl/pos/colour/...`). They define **roles** used across POS UI and **connect to the core palette** as follows.

### 3.1 Text

| Token path | Resolved (example) | Maps to |
|------------|--------------------|--------|
| `rdl/pos/colour/text/primary` | `#252527` | core/neutral |
| `rdl/pos/colour/text/secondary` | `#72727a` | core/neutral |
| `rdl/pos/colour/text/disabled` | `#a1a1a7` | core/neutral |
| `rdl/pos/colour/text/inverted` | `#ffffff` | — |
| `rdl/pos/colour/text/link` | `#006df2` | brand-secondary blue |
| `rdl/pos/colour/text/link-hover` | `#024696` | brand-secondary |
| `rdl/pos/colour/text/link-active` | `#00264d` | brand-secondary |

### 3.2 Default (neutral UI)

| Token path | Resolved (example) | Maps to |
|------------|--------------------|--------|
| `rdl/pos/colour/default/border` | `#d4d4d6` | core/neutral |
| `rdl/pos/colour/default/icon` | `#252527` | core/neutral |
| `rdl/pos/colour/default/icon-disabled` | `#a1a1a7` | core/neutral |

### 3.3 Brand (primary)

| Token path | Resolved (example) | Maps to |
|------------|--------------------|--------|
| `rdl/pos/colour/brand/fill-hover` | `#105d2b` | core/green |
| `rdl/pos/colour/brand/fill-pressed` | `#0a3316` | core/green |
| `rdl/pos/colour/brand/fill-disabled` | `#d4d4d6` | core/neutral |
| `rdl/pos/colour/brand/on-fill-disabled` | `#a1a1a7` | core/neutral |

**Connection:** POS “brand” alias collection points to **core/green** (and neutral for disabled states).

### 3.4 Brand secondary (blue)

Full set: fill, fill-hover, fill-pressed, surface, surface-hover, text, border, icon, etc. (e.g. fill `#006df2`, surface `#f0f7ff`).  
**Connection:** Alias points to a blue/core-secondary palette (not a separate `core/blue` in the sampled set; values align with link and navy).

### 3.5 Semantic roles: Warning, Critical, Info

- **Warning** (`rdl/pos/colour/warning/*`): fill, surface, text, border, icon (e.g. fill `#ffd464`, surface `#fffaf0`). Connects to **core/orange**-like semantics.
- **Critical** (`rdl/pos/colour/critical/*`): fill `#ed4c4b`, surface `#fff1f0`, etc. Connects to **core/red**.
- **Info** (`rdl/pos/colour/info/*`): fill `#a554ff`, surface `#f7f0ff`, etc. Purple; informational.

### 3.6 Navigation

| Token path | Resolved (example) | Maps to |
|------------|--------------------|--------|
| `rdl/pos/colour/nav/surface` | `#36363a` | dark neutral |
| `rdl/pos/colour/nav/surface-hover` | `#252527` | dark neutral |
| `rdl/pos/colour/nav/surface-click` | `#161618` | dark neutral |
| `rdl/pos/colour/nav/surface-secondary` | `#18b159` | core/green |
| `rdl/pos/colour/nav/surface-secondary-hover` | `#105d2b` | core/green |
| `rdl/pos/colour/nav/text` | `#a1a1a7` | core/neutral |
| `rdl/pos/colour/nav/text-secondary` | `#ffffff` | — |
| `rdl/pos/colour/nav/icon` | `#a1a1a7` | core/neutral |
| `rdl/pos/colour/nav/icon-secondary` | `#ffffff` | — |

**Connection:** Nav alias uses **core/neutral** (dark) for default nav and **core/green** for secondary (active/brand) state.

---

## 4. Mapped / product-specific tokens

These sit at the **mapped** connection point: they reference alias (or core) and are product- or context-specific.

| Token path | Resolved (example) | Notes |
|------------|--------------------|--------|
| `rdl-POS/colour-text/text-page-heading` | `#183267` | POS-specific page heading (navy). |
| `rdl-POS/default/surface-secondary` | `#18b159` | POS default secondary surface (green). |
| `rdl-vm/colour-text/text-inverted` | `#ffffff` | VM token used in POS file (cross-product). |
| `rdl-vm/colour-success/fill-pressed` | `#105d2b` | VM success used in POS. |
| `rdl-vm/colour-critical/fill-secondary` | `#ff8a75` | VM critical used in POS. |
| `rdl-vm/default/fill` | `#158741` | VM default fill (green). |
| `RDL-VM/background` | `#f4f4f4` | VM background. |

**Connection:** Mapped collection binds **product** (POS vs VM) to the same alias/core semantics; POS file can still reference VM tokens where designs are shared.

### 4.1 Layout / shell (live POS UI parity)

For prototypes or code that should match the **live POS layout** (three-column: nav sidebar, product grid, cart), the Tailwind theme in `pos-theme.css` also defines:

| Token | Use |
|--------|-----|
| `pos-canvas` | Main background (#f8f9fa). |
| `pos-header-bar` | Top bar below warning (#e9ecef). |
| `pos-nav-sidebar` | Left nav background (#343a40). |
| `pos-banner-warning-bg` / `pos-banner-warning-text` | Connect/warning banner (orange). |
| `pos-search-border-focus` | Search input focus ring (blue). |
| `pos-product-card-accent-yellow` / `-blue` / `-red` | Product card top border by category. |
| `pos-sold-out` | Sold-out label text. |
| `pos-button-ghost-bg` / `-text` / `-border` | Secondary/ghost buttons (e.g. Redeem membership, Discount). |

Use these when building POS shells so the layout and states match production.

---

## 5. Typography

| Token path | Value | Notes |
|------------|--------|--------|
| `Typeface/size/medium` | `16` | Body/default. |
| `Typeface/size/large` | `18` | Large copy. |

Typography scale is separate from colour; connection to alias/mapped is via usage in components, not variable references.

---

## 6. Legacy / utility tokens

| Token path | Resolved | Notes |
|------------|----------|--------|
| `markup/text-dark` | `#ffffff` | Over dark backgrounds. |
| `markup/text-light` | `#161618` | Over light backgrounds. |
| `Greyscale/1 (Charcoal)` | `#383838` | Legacy. |
| `Greyscale/2 (Ash)` | `#9D9A9B` | Legacy. |
| `neutral100` | `#ffffff` | Legacy neutral. |

These can be phased out in favour of `core/neutral` and `rdl/pos/colour/text/*` where possible.

---

## 7. Summary diagram (connection points)

```
┌─────────────────────────────────────────────────────────────────┐
│  MAPPED COLLECTION (product / mode)                              │
│  rdl-POS/*, rdl-vm/*, RDL-VM/*                                   │
│  → references Alias (or Core) for current product/mode           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  ALIAS COLLECTION (semantic roles)                               │
│  rdl/pos/colour/{text, default, brand, brand-secondary,          │
│                  warning, critical, info, nav}/*                  │
│  → references Core (e.g. brand → core/green, critical → core/red)│
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  BRAND / CORE COLLECTION (primitives)                            │
│  core/{green, neutral, red, orange, navy, cyan}/*                 │
│  → raw hex (and number) values; no variable references           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. How to verify in Figma

- **Variables panel:** Open the file → **Local variables** (or **Design** → **Variables**) to see:
  - **Collections:** e.g. “Core”, “Alias”, “POS Mapped” (names may differ).
  - **Modes:** if present (e.g. light/dark), the **mapped** layer switches which alias is bound per mode.
- **Alias bindings:** Click an alias variable and check “Bound to” to see the **connection** to a core (or other) variable.
- **Venue Manager:** Token structure is documented in [VM-design-token-structure.md](./VM-design-token-structure.md).

---

*Generated from Figma variable definitions (get_variable_defs) for the POS Components file. Collection names (Brand, Alias, Mapped) are inferred from token paths and resolution; confirm in the Figma UI for your file.*
