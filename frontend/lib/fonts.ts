import { Manrope, Cormorant_Garamond } from "next/font/google";

/** Site-wide Manrope — body / UI sans-serif (storefront; admin/ops override to system sans). */
export const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/** Cormorant Garamond — elegant serif for storefront headings (heritage, premium feel). */
export const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/** @deprecated Use `bodyFont` — kept for imports that expect the previous name. */
export const interFont = bodyFont;
