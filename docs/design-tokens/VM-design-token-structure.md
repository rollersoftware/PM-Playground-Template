# VM Design Token Structure (Figma Variables)

**Source:** [Manage — VM Components](https://www.figma.com/design/1ZEmrI45IlZF0PjrodhWTG/%F0%9F%8E%8A-Manage---VM-Components?m=auto&node-id=16599-491&t=NshukrJt8svInS2m-1)  
**Product:** Venue Manager (VM) — *A separate token summary exists for POS.*

**Tailwind (playground):** Use the VM theme when building VM components or prototypes:  
`playground-app/src/styles/vm-theme.css` — provides `vm-*` Tailwind utilities (e.g. `bg-vm-roller-blue-40`, `text-vm-neutral-10`, `text-vm-medium`). Already imported in `playground-app/src/index.css`.

This document summarizes the **design token structure** and the **connection points between variable collections** (brand → alias → mapped) as used in the Venue Manager Figma file.

---

## 1. Collection hierarchy and connection points

Figma variables in this file use a layered structure. The **connection point** between layers is that upper layers **reference** the layer below (aliases point to brand/primitives; product or semantic tokens point to aliases or primitives).

| Layer | Purpose | Typical content | Connection |
|--------|---------|------------------|------------|
| **Brand / Primary** | Primitive palette and brand scales | `Primary palette/*`, `ROLLER Blue/*`, `Secondary palette/*` | Source of truth; raw hex values. |
| **Alias / Semantic** | Semantic or role-based names | `confetti/colour/neutral/*`, `NEW/*` (where they reference primitives) | **Connects to Brand:** alias variables resolve to primary/brand variables (e.g. neutrals → greys, NEW/Blue → ROLLER Blue). |
| **Mapped / Product** | Product- or context-specific bindings | `NEW/*` (VM-specific extensions), mode-specific overrides | **Connects to Alias:** mapped tokens reference alias (or brand) so switching mode/product swaps the bound alias. |

In practice:

- **Brand/Primary** holds the hex values for primary red, white, light salmon, ROLLER Blue scale, and secondary palette (purple, pink, orange, tan).
- **Alias** gives semantic meaning (e.g. `confetti/colour/neutral` for text, borders, surfaces).
- **Mapped/NEW** extends the system for VM (e.g. NEW/Blue primary, NEW/Gray tints) and may reference brand or alias.

---

## 2. Brand / Primary collection (primitives)

Primitive and brand tokens live in **Primary palette**, **ROLLER Blue**, and **Secondary palette**. These are the VM brand and supporting colours.

### 2.1 Primary palette

| Token path | Resolved | Role in VM |
|------------|----------|------------|
| `Primary palette/White` | `#FFFFFF` | Backgrounds, on-fill text, inverted content. |
| `Primary palette/Red` | `#E84B4C` | Primary red (CTAs, errors, critical). |
| `Primary palette/Light salmon` | `#F9CDC6` | Red tint / soft red surfaces. |

### 2.2 ROLLER Blue (brand blue)

| Token path | Resolved | Role in VM |
|------------|----------|------------|
| `ROLLER Blue/30*` | `#033180` | Dark blue (headings, primary actions). |
| `ROLLER Blue/40` | `#074DC5` | Mid blue (links, interactive). |
| `ROLLER Blue/99` | `#F5F8FF` | Light blue (surfaces, subtle backgrounds). |

**Connection:** ROLLER Blue is the VM **brand blue** scale; alias or NEW tokens (e.g. NEW/Blue primary, NEW/Blue tint 1) typically reference this scale.

### 2.3 Secondary palette

| Token path | Resolved | Role in VM |
|------------|----------|------------|
| `Secondary palette/Dark purple` | `#4B306E` | Accent, secondary UI. |
| `Secondary palette/Pink` | `#FFCFFA` | Accent. |
| `Secondary palette/Orange` | `#FF953D` | Accent, warning-like. |
| `Secondary palette/Tan` | `#DCAC67` | Accent, neutral-warm. |

**Connection:** Secondary palette supports **alias** or **mapped** roles (e.g. warning, accent) that point to these primitives.

---

## 3. Alias / semantic collection

Semantic tokens give meaning to primitives. In VM, **confetti/colour/neutral** and parts of **NEW/** act as alias/semantic layers.

### 3.1 confetti/colour/neutral

| Token path | Resolved | Maps to |
|------------|----------|--------|
| `confetti/colour/neutral/10` | `#252527` | Dark text, primary content. |
| `confetti/colour/neutral/70` | `#d4d4d6` | Borders, dividers, disabled. |
| `confetti/colour/neutral/80` | `#e3e3e3` | Light borders, surfaces. |
| `confetti/colour/neutral/100` | `#ffffff` | White, inverted text. |

**Connection:** Neutrals **connect to** the primary/greyscale palette; used for text, borders, and surfaces across VM UI.

### 3.2 NEW/ (extended semantic and product tokens)

The **NEW/** set extends the system with VM-specific or refreshed tokens. Some act as aliases to ROLLER Blue or Primary palette; others are distinct.

| Token path | Resolved | Likely role |
|------------|----------|-------------|
| `NEW/Red/Red 60` | `#ED4B4B` | Critical/error (aligns with Primary palette/Red). |
| `NEW/Blue primary` | `#143D82` | Primary blue (headings, key UI) — aligns with ROLLER Blue. |
| `NEW/Blue tint 1` | `#002954` | Dark blue tint. |
| `NEW/Blue tint 2` | `#001F4A` | Darker blue (e.g. text on light). |
| `NEW/Gray tint 1` | `#CCCCCC` | Mid grey (borders, disabled). |
| `NEW/Gray tint 2` | `#969696` | Muted grey (secondary text). |
| `NEW/Light pink` | `#FCC4B5` | Soft pink (surfaces, highlights). |
| `NEW/Brown` | `#6E3D00` | Brown (e.g. semantic or accent). |

**Connection:** NEW/Blue * primary and tints **connect to** ROLLER Blue; NEW/Red **connects to** Primary palette/Red. NEW/Gray and others extend the neutral/alias layer.

### 3.3 Secondary/ (accent)

| Token path | Resolved | Notes |
|------------|----------|--------|
| `Secondary/50*` | `#FF490C` | Orange accent (e.g. secondary CTA, warning). |

**Connection:** References or aligns with **Secondary palette/Orange**; used for alias roles like “secondary action” or “warning”.

---

## 4. Mapped / product-specific tokens

VM-specific or context-specific usage is reflected in how **NEW/** and **ROLLER Blue** are bound in the file (e.g. which mode or screen uses which token). The same primitive or alias can be **mapped** to different roles per product or mode.

| Token path | Resolved | Notes |
|------------|----------|--------|
| `NEW/Blue primary` | `#143D82` | VM primary blue (mapped to brand/heading role). |
| `NEW/Blue tint 1` | `#002954` | VM dark blue tint. |
| `NEW/Blue tint 2` | `#001F4A` | VM darkest blue. |
| `ROLLER Blue/99` | `#F5F8FF` | VM light blue surface (mapped to background/surface). |

**Connection:** Mapped collection binds **product** (VM) and optionally **mode** to alias or brand; confirm in Figma Variables panel which variables are bound to which modes.

---

## 5. Legacy / utility tokens

| Token path | Resolved | Notes |
|------------|----------|--------|
| `Greyscale/1 (Charcoal)` | `#383838` | Legacy charcoal. |
| `Greyscale/1` | `#1D1E1C` | Legacy dark (distinct from Charcoal). |

These can be phased out in favour of **confetti/colour/neutral** and **NEW/Gray** where possible.

---

## 6. Summary diagram (connection points)

```
┌─────────────────────────────────────────────────────────────────┐
│  MAPPED COLLECTION (product / mode)                              │
│  NEW/* (VM-specific roles), ROLLER Blue/* usage                  │
│  → references Alias (or Brand) for current product/mode          │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  ALIAS COLLECTION (semantic roles)                               │
│  confetti/colour/neutral/*, NEW/* (where semantic)                │
│  → references Brand (e.g. neutral → greys, NEW/Blue → ROLLER)   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  BRAND / PRIMARY COLLECTION (primitives)                         │
│  Primary palette/*, ROLLER Blue/*, Secondary palette/*           │
│  → raw hex values; no variable references                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. How to verify in Figma

- **Variables panel:** Open the file → **Local variables** (or **Design** → **Variables**) to see:
  - **Collections:** e.g. “Primary palette”, “ROLLER Blue”, “confetti”, “NEW” (names may differ).
  - **Modes:** if present (e.g. light/dark), the **mapped** layer switches which alias is bound per mode.
- **Alias bindings:** Click an alias variable and check “Bound to” to see the **connection** to a primary or other variable.
- **POS:** Token structure for POS is documented in `docs/design-tokens/POS-design-token-structure.md`.

---

## 8. Cross-product note (VM ↔ POS)

- VM uses **ROLLER Blue** and **Primary palette/Red** as core brand; POS uses **core/green** as brand and **core/red** for critical.
- Shared semantics (e.g. “critical”, “neutral text”) may resolve to different hex values per product; the **mapped** layer is where product-specific bindings live.
- A VM Tailwind theme is available at `playground-app/src/styles/vm-theme.css` and mirrors this structure.

---

*Generated from Figma variable definitions (get_variable_defs) for the VM Components file (node 16599-491). Collection names and connections are inferred from token paths and resolution; confirm in the Figma UI for your file.*
