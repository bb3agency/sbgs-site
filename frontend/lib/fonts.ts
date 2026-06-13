import { Inter, Libre_Baskerville, Montserrat, Plus_Jakarta_Sans } from "next/font/google";

/** Plus Jakarta Sans — display font used on the locations page. */
export const plusJakartaSansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-location-display",
  display: "swap",
});

/** Site-wide Inter — body, headings, admin, ops, storefront. */
export const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

/** Libre Baskerville — editorial serif for storefront headings. */
export const libreBaskervilleFont = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
  display: "swap",
});

/** Montserrat — premium sans-serif for storefront body and CTAs. */
export const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

/** @deprecated Use `interFont` — kept for imports that expect separate body/heading tokens. */
export const bodyFont = interFont;

/** @deprecated Use `interFont` — kept for imports that expect separate body/heading tokens. */
export const headingFont = interFont;
