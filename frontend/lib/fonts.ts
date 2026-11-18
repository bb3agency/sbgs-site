import localFont from "next/font/local";

/**
 * Fonts are SELF-HOSTED, not fetched from Google at build time.
 *
 * `next/font/google` downloads each face from fonts.gstatic.com during the build. That
 * made every production build depend on a network round trip to Google, and when it
 * failed the build died with 24 x "Error while looking up import map: next/font/google
 * queries have exactly one entry" — an error that names nothing useful and looks like a
 * code fault. It took down a VPS deploy and a CI run on the same day; both passed on a
 * retry, which is the signature of a flaky fetch rather than a real problem.
 *
 * The .woff2 files in ./../assets/fonts are the exact latin-subset files Google was
 * serving for these families, so rendering is unchanged — the build just no longer needs
 * the internet. All three families are SIL Open Font License, which permits bundling.
 *
 * To add a weight or subset, download the matching .woff2 from Google and add it here
 * rather than reaching for `next/font/google`.
 */

/** Site-wide Manrope — body / UI sans-serif (storefront; admin/ops override to system sans). */
export const bodyFont = localFont({
  src: [
    {
      // Variable file: one download covers weights 200-800, so the 400/500/600/700 the
      // design uses all resolve from it.
      path: "../assets/fonts/manrope-latin-variable.woff2",
      style: "normal",
      weight: "200 800",
    },
  ],
  variable: "--font-body",
  display: "swap",
  // Matches Google's own fallback metrics for Manrope, so the swap from the fallback
  // face does not shift layout.
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Baskervville — serif used for storefront headings. */
export const headingFont = localFont({
  src: [
    { path: "../assets/fonts/baskervville-latin-400.woff2", style: "normal", weight: "400" },
    { path: "../assets/fonts/baskervville-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["ui-serif", "Georgia", "serif"],
});

/** DM Sans — clean, readable font used exclusively for prices. */
export const priceFont = localFont({
  src: [
    {
      // Variable file covering 100-1000; the design uses 500/600/700.
      path: "../assets/fonts/dm-sans-latin-variable.woff2",
      style: "normal",
      weight: "100 1000",
    },
  ],
  variable: "--font-price",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** @deprecated Use `bodyFont` — kept for imports that expect the previous name. */
export const interFont = bodyFont;
