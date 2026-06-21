export const APP_NAME =
  process.env.NEXT_PUBLIC_STORE_NAME ?? "Sri Sai Baba Ghee Sweets";

/**
 * Per-client prefix for browser storage keys (cart, wishlist, …). Lives in the
 * design layer (this file is excluded from core sync) so the core store files
 * stay client-agnostic and never overwrite another client's keys on sync.
 */
export const STORAGE_PREFIX = "sbgs";

/** Canonical brand logo served from Next.js `public/` (do not store at repo root). */
export const BRAND_LOGO_SRC = "/images/sbgs-logo.png";

export const STOREFRONT_URL =
  process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "http://localhost:3102";

/** Endpoints that require idempotency-key on mutation */
export const IDEMPOTENT_MUTATION_PREFIXES = [
  "/orders",
  "/payments/initiate",
  "/payments/verify",
] as const;
