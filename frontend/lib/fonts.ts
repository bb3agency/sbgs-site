import { Inter, Playfair_Display } from "next/font/google";

/** Site-wide Inter — body / UI sans-serif (storefront, admin, ops). */
export const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

/** Elegant serif for storefront headings — heritage, premium feel. */
export const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

/** @deprecated Use `interFont` — kept for imports that expect a body token. */
export const bodyFont = interFont;
