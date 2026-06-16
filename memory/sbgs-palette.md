---
name: sbgs-palette
description: Canonical SBGS storefront color palette and font system used in the redesign
metadata:
  type: project
---

The SBGS storefront uses hardcoded hex colors (not just CSS tokens). Canonical brand palette after the 2026-06-17 redesign:

- Maroon primary: `#7f1416`; maroon dark/hover: `#651013`
- Ghee gold accent: `#d4a537`; light gold tint: `#f5d88e`
- Warm ivory background: `#faf5ec`; warm border: `#efe8e4`
- Dark cocoa text: `#3a2218`; cocoa-gray text: `#8c7b6b`; neutral gray: `#767676`
- Muted sage (used sparingly): `#769b97`

Fonts: headings use **Playfair Display** serif (`--font-playfair` / `font-heading`); UI/body uses **Inter** (`--font-inter` / `font-sans`). Admin/ops consoles override `--font-heading` back to Inter via `.admin-console`/`.ops-console` scopes in `app/globals.css`.

The site was migrated FROM the "Sri Sai Baba Ghee Sweets" organic theme (green `#23403d`, coral `#ec6e55`, green creams). Any remaining organic green/coral hexes are leftovers to remap. Legal pages (terms/privacy/shipping/returns/about), ProductDetailTabs, and checkout still contained organic *copy* (not just color) as of the redesign — verify before reusing. See [[sbgs-redesign-scope]].