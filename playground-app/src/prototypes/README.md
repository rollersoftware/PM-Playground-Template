# Prototypes

Local prototypes for POS, VM, and lo-fi flows. Each prototype lives in its own folder and is listed in the app at `/` and rendered at `/p/:slug`.

## Folder structure

```
prototypes/
  <slug>/
    index.tsx     # React component (default export)
    <slug>.css    # Optional: CSS for this prototype (use design token vars)
  pos-demo/      # POS design system reference
  vm-demo/       # VM design system reference
  lo-fi-demo/    # Lo-fi / Balsamiq reference
  example-prototype/
```

## Design system reference (use when spinning up a new prototype)

Pick **one** system and use its tokens and patterns only.

| Product | Theme & tokens | Demo to copy patterns from | Token doc |
|--------|----------------|----------------------------|-----------|
| **POS** (Point of Sale, F&B) | `src/styles/pos-theme.css` → `var(--color-pos-*)` | `pos-demo/` (pos-demo.css, index.tsx) | [POS-design-token-structure.md](../../../docs/design-tokens/POS-design-token-structure.md) |
| **VM** (Venue Manager) | `src/styles/vm-theme.css` → `var(--color-vm-*)` | `vm-demo/` (vm-demo.css, index.tsx) | [VM-design-token-structure.md](../../../docs/design-tokens/VM-design-token-structure.md) |
| **Lo-fi** (wireframe) | `src/styles/lo-fi-theme.css` + `lo-fi.css` → `var(--color-lofi-*)`, `.wire-*` | `lo-fi-demo/` | — |

- **Styling:** Use **CSS-only** in a `<slug>.css` file; reference theme variables with fallbacks (e.g. `var(--color-pos-canvas, #f8f9fa)`).
- **Layout:** Reuse structure from the matching demo (e.g. POS: sidebar + main + cart; VM: sidebar + welcome + cards).
- **Registration:** Add the new prototype in `src/prototypeRegistry.tsx`: import the component, add to the `prototypes` array with `slug`, `title`, `description`, `tags`, `designSystem` (e.g. `'POS'`, `'VM'`, `'lo-fi'`), and `element`.

## Existing demos

- **pos-demo** — POS F&B select and checkout (three-column: nav, products, cart). CSS: `pos-demo.css`; tokens: POS.
- **vm-demo** — Venue Manager dashboard (sidebar, welcome, checklist cards, progress, resources). CSS: `vm-demo.css`; tokens: VM.
- **lo-fi-demo** — Lo-fi wireframe (cards, buttons, placeholder, list). CSS: `lo-fi-demo.css` + global `lo-fi.css`; tokens: lo-fi.
