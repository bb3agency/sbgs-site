import { Manrope, Baskervville } from "next/font/google";

/** Site-wide Manrope — body / UI sans-serif (storefront; admin/ops override to system sans). */
export const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/** Baskervville — Google Font for storefront headings. */
export const headingFont = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/** @deprecated Use `bodyFont` — kept for imports that expect the previous name. */
export const interFont = bodyFont;
