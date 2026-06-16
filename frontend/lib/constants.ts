export const APP_NAME =
  process.env.NEXT_PUBLIC_STORE_NAME ?? "Sri Sai Baba Ghee Sweets";

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
