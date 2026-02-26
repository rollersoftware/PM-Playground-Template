import type { ReactNode } from 'react';
import { FbOrder } from './prototypes/fb-order';

import { PosDemo } from './prototypes/pos-demo';
import { PrinterSetupLoFi } from './prototypes/printer-setup-lo-fi';
import { PrinterSetupPos } from './prototypes/printer-setup-pos';
import { StockFromInvoiceLoFi } from './prototypes/stock-from-invoice-lo-fi';
import { VmDemo } from './prototypes/vm-demo';

/** Design system to reference for styling (see prototypes/README.md and .cursor/rules) */
export type DesignSystem = 'POS' | 'VM' | 'lo-fi';

export type PrototypeDef = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  /** Which design system this prototype uses — use same for new prototypes in that product. */
  designSystem?: DesignSystem;
  element: ReactNode;
};

export const prototypes: PrototypeDef[] = [
  {
    slug: 'pos-demo',
    title: 'POS Design System Demo',
    description: 'Point of Sale design tokens: brand green, semantic colours, nav, and roles.',
    tags: ['POS', 'design system', 'Figma'],
    designSystem: 'POS',
    element: <PosDemo />,
  },
  {
    slug: 'vm-demo',
    title: 'VM Design System Demo',
    description: 'Venue Manager design tokens: ROLLER Blue, Primary palette, neutrals.',
    tags: ['VM', 'design system', 'Figma'],
    designSystem: 'VM',
    element: <VmDemo />,
  },

  {
    slug: 'printer-setup-lo-fi',
    title: 'ROLLER POS — Printer & Production Setup (Lo-Fi)',
    description: 'Simplified connect printer and production routing: guided wizard, no SSL jargon, device- or admin-first.',
    tags: ['POS', 'lo-fi', 'printer', 'production', 'F&B', 'wireframe'],
    designSystem: 'lo-fi',
    element: <PrinterSetupLoFi />,
  },
  {
    slug: 'printer-setup-pos',
    title: 'ROLLER POS — Printer & Production Setup (Hi-Fi)',
    description: 'Same printer setup flow with POS design system: guided wizard, device- or admin-first entry.',
    tags: ['POS', 'hi-fi', 'printer', 'production', 'F&B', 'design system'],
    designSystem: 'POS',
    element: <PrinterSetupPos />,
  },
];

export function getPrototypeBySlug(slug: string): PrototypeDef | undefined {
  return prototypes.find((p) => p.slug === slug);
}
