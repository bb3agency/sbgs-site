/**
 * content.ts — per-client COPY / CONTENT (design layer, excluded from core sync).
 *
 * `lib/constants.ts` holds brand IDENTITY (name, logo, storage prefix); THIS file
 * holds client-specific PROSE (taglines, blurbs, product-attribute defaults). Core
 * components import from here so they stay content-agnostic. (Guide §1.1.)
 */
export const STORE_TAGLINE =
  "Authentic desi ghee sweets, handcrafted with a 40-year legacy of purity.";
export const STORE_TAGLINE_SHORT = "Authentic desi ghee sweets";
export const HEADER_PROMO = "Order fresh handcrafted sweets today!";
export const CART_EMPTY_BLURB =
  "Add some delicious sweets to your cart and come back here to complete your order.";

/** Product-detail attribute defaults (shown when a product has no explicit value). */
export const PRODUCT_ORIGIN_DEFAULT = "Vijayawada, India";
export const PRODUCT_CERTIFICATION_DEFAULT = "Pure ghee, handcrafted";

/** Homepage SEO description. */
export const HOME_META_DESCRIPTION =
  "Authentic desi ghee sweets from Sri Sai Baba Ghee Sweets — handcrafted in Vijayawada with a 40-year legacy of purity. Delivered fresh.";
