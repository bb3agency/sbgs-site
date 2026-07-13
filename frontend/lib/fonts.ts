import { Manrope } from "next/font/google";
import localFont from "next/font/local";

/** Site-wide Manrope — body / UI sans-serif (storefront; admin/ops override to system sans). */
export const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/** Sherly Kitchen — custom local font for storefront headings. */
export const headingFont = localFont({
  src: "../public/fonts/SherlyKitchen.ttf",
  variable: "--font-display",
  display: "swap",
});

/** @deprecated Use `bodyFont` — kept for imports that expect the previous name. */
export const interFont = bodyFont;
