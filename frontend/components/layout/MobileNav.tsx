"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSafeRouter } from "@/lib/use-safe-router";
import { STORE_TAGLINE_SHORT } from "@/lib/content";
import Image from "next/image";
import {
  X,
  User,
  LogOut,
  Search,
  Store,
  ShoppingBag,
  Loader2,
  Tag,
  MapPin,
  Info,
  Heart,
} from "lucide-react";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import { useUiStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import { logoutSession } from "@/lib/auth-api";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { useSessionBootstrap } from "@/hooks/use-session-bootstrap";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { StorefrontSearchDropdown } from "@/components/shared/StorefrontSearchDropdown";
import { useStorefrontSearch } from "@/hooks/use-storefront-search";
import {
  buildStorefrontSearchPath,
  normalizeStorefrontSearchQuery,
  STOREFRONT_SEARCH_MIN_CHARS,
} from "@/lib/storefront-search";

import { ChevronDown, ChevronRight } from "lucide-react";
import type { CategoryWithMeta } from "@/lib/categories";

// ── Component ────────────────────────────────────────────────────────────────

interface MobileNavProps {
  categories?: CategoryWithMeta[];
  /** Minimum order value in paise from the database. 0 = no minimum enforced. */
  minOrderValuePaise?: number;
}

export function MobileNav({ categories = [], minOrderValuePaise = 0 }: MobileNavProps) {
  useSessionBootstrap();

  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);
  const { wishlistEnabled } = useStoreConfig();

  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const sessionStatus = useAuthStore((s) => s.storefrontSessionStatus);
  const clearCart = useCartStore((s) => s.clearCart);

  const isSignedIn = Boolean(accessToken);
  const isCheckingSession = sessionStatus === "checking" && !accessToken;
  const pathname = usePathname();
  const router = useSafeRouter();
  const authRedirect = ["/login", "/register"].includes(pathname) ? "" : `?redirect=${encodeURIComponent(pathname)}`;

  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading, showPanel } = useStorefrontSearch(
    searchQuery,
    mobileMenuOpen,
  );

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const close = useCallback(() => {
    setMobileMenuOpen(false);
    setSearchQuery("");
  }, [setMobileMenuOpen]);

  const onSignOut = async () => {
    try {
      await logoutSession(accessToken);
    } catch {
      // ignore
    } finally {
      useAuthStore.getState().logoutLocalSession();
      clearCart();
      useWishlistStore.getState().clear();
      close();
    }
  };

  // Derive parent categories and build children map
  const { parentCategories, childrenMap } = useMemo(() => {
    const parents = categories.filter((c) => !c.parentId);
    const map = new Map<string, CategoryWithMeta[]>();
    for (const cat of categories) {
      if (cat.parentId) {
        const existing = map.get(cat.parentId) ?? [];
        existing.push(cat);
        map.set(cat.parentId, existing);
      }
    }
    return { parentCategories: parents, childrenMap: map };
  }, [categories]);

  // Trap body scroll while open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileMenuOpen, close]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer — slides in from the RIGHT */}
      <div
        className={`fixed inset-y-0 right-0 z-[101] flex w-[85vw] max-w-sm flex-col bg-brand-cream shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight text-brand-maroon"
            onClick={close}
          >
            <Image
              src={BRAND_LOGO_SRC}
              alt={`${APP_NAME} logo`}
              width={28}
              height={28}
              className="size-7 object-contain"
            />
            {APP_NAME}
          </Link>
          <button
            onClick={close}
            className="rounded-full bg-secondary p-2 text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-cream"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Live search */}
        <div className="relative border-b border-border px-4 py-3">
          <div className="relative flex items-center">
            {loading ? (
              <Loader2 className="absolute left-3 size-4 animate-spin text-brand-gold" aria-hidden />
            ) : (
              <Search className="absolute left-3 size-4 text-muted-foreground" aria-hidden />
            )}
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!router.isReady) return;
                  const normalized = normalizeStorefrontSearchQuery(searchQuery);
                  if (normalized.length < STOREFRONT_SEARCH_MIN_CHARS) return;
                  close();
                  router.push(buildStorefrontSearchPath(normalized));
                }
              }}
              placeholder="Search products and categories..."
              className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-10 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon"
              aria-label="Search products and categories"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-muted-foreground hover:text-brand-maroon"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {showPanel ? (
            <div className="absolute left-4 right-4 top-full z-10 mt-1">
              <StorefrontSearchDropdown
                query={searchQuery}
                results={results}
                loading={loading}
                onNavigate={close}
              />
            </div>
          ) : null}
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
          <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Navigation
          </p>

          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
          >
            <Store className="size-4 text-muted-foreground" /> Home
          </Link>
          
          {/* Dynamic Categories */}
          {parentCategories.map((parent) => {
            const subcategories = childrenMap.get(parent.id) ?? [];
            const hasSub = subcategories.length > 0;
            const isOpen = openCategories[parent.id];

            return (
              <div key={parent.id} className="flex flex-col">
                <div className="flex items-center justify-between rounded-xl hover:bg-secondary transition-colors">
                  <Link
                    href={`/categories/${parent.slug}`}
                    onClick={close}
                    className="flex flex-1 items-center gap-3 px-3 py-2.5 text-sm font-semibold text-foreground hover:text-brand-maroon"
                  >
                    <ShoppingBag className="size-4 text-muted-foreground" />
                    {parent.name}
                  </Link>
                  {hasSub && (
                    <button
                      type="button"
                      onClick={(e) => toggleCategory(parent.id, e)}
                      className="flex size-10 items-center justify-center text-muted-foreground hover:text-brand-maroon"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${parent.name} subcategories`}
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  )}
                </div>
                {hasSub && (
                  <div
                    className={`flex flex-col gap-1 overflow-hidden transition-all duration-200 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-[1.35rem] mt-1 flex flex-col gap-1 border-l-2 border-border/50 pl-4 py-1">
                      <Link
                        href={`/categories/${parent.slug}`}
                        onClick={close}
                        className="flex items-center gap-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-maroon"
                      >
                        All {parent.name}
                      </Link>
                      {subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/categories/${sub.slug}`}
                          onClick={close}
                          className="flex items-center gap-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-maroon"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/locations"
            onClick={close}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
          >
            <MapPin className="size-4 text-muted-foreground" /> Our Branches
          </Link>
          <Link
            href="/about"
            onClick={close}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
          >
            <Info className="size-4 text-muted-foreground" /> About Us
          </Link>

          <div className="my-3 h-px w-full bg-border" />

          <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Account
          </p>

          {isCheckingSession ? (
            <div
              className="flex items-center gap-3 rounded-xl bg-secondary px-3 py-3 text-sm font-medium text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              <Loader2 className="size-4 animate-spin text-brand-maroon" aria-hidden />
              Restoring your session…
            </div>
          ) : isSignedIn ? (
            <>
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-secondary px-3 py-2.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-brand-maroon text-xs font-bold text-text-cream">
                  {(user?.firstName?.charAt(0) ?? user?.email?.charAt(0) ?? "U").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user?.firstName
                      ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`
                      : "My Account"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email ?? user?.phone ?? "Signed in"}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={close}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <User className="size-4" /> My Account
              </Link>
              {wishlistEnabled ? (
                <Link
                  href="/wishlist"
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Heart className="size-4" /> Wishlist
                </Link>
              ) : null}
              <button
                onClick={() => void onSignOut()}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-brand-maroon transition-colors hover:bg-secondary"
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/login${authRedirect}`}
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-full bg-brand-maroon px-4 py-3 text-sm font-semibold text-text-cream transition-colors hover:bg-brand-maroon-dark"
              >
                <LogOut className="size-4" /> Sign In
              </Link>
              <Link
                href={`/register${authRedirect}`}
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-full border border-brand-maroon px-4 py-3 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-cream"
              >
                <User className="size-4" /> Create Account
              </Link>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-5 py-4">
          <p className="text-center text-xs text-muted-foreground">
            {minOrderValuePaise > 0
              ? `Minimum order value: ${formatPrice(minOrderValuePaise)}`
              : STORE_TAGLINE_SHORT}
          </p>
        </div>
      </div>
    </>
  );
}
