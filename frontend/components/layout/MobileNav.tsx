"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSafeRouter } from "@/lib/use-safe-router";
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
} from "lucide-react";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import { useUiStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import { logoutSession } from "@/lib/auth-api";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/stores/cart";
import { useSessionBootstrap } from "@/hooks/use-session-bootstrap";
import { useState, useEffect, useRef, useCallback } from "react";
import { StorefrontSearchDropdown } from "@/components/shared/StorefrontSearchDropdown";
import { useStorefrontSearch } from "@/hooks/use-storefront-search";
import {
  buildStorefrontSearchPath,
  normalizeStorefrontSearchQuery,
  STOREFRONT_SEARCH_MIN_CHARS,
} from "@/lib/storefront-search";

import type { CategoryWithMeta } from "@/lib/categories";

// ── Component ────────────────────────────────────────────────────────────────

interface MobileNavProps {
  categories: CategoryWithMeta[];
  /** Minimum order value in paise from the database. 0 = no minimum enforced. */
  minOrderValuePaise?: number;
}

export function MobileNav({ categories, minOrderValuePaise = 0 }: MobileNavProps) {
  useSessionBootstrap();

  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);

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
      close();
    }
  };

  // Trap body scroll while open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
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
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer — slides in from the RIGHT */}
      <div
        className={`fixed inset-y-0 right-0 z-[101] flex w-[85vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#7F1416]/10 px-5 py-4 bg-[#FAF5EC]">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-normal tracking-tight text-[#7F1416] italic"
            onClick={close}
          >
            <Image
              src={BRAND_LOGO_SRC}
              alt="Sri Sai Baba Ghee Sweets"
              width={160}
              height={80}
              className="h-10 w-auto object-contain"
            />
            {APP_NAME}
          </Link>
          <button
            onClick={close}
            className="flex size-8 items-center justify-center border border-[#7F1416]/10 text-[#7F1416] transition-colors hover:bg-[#7F1416] hover:text-[#FAF5EC]"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Live search */}
        <div className="relative border-b border-[#7F1416]/10 px-4 py-3 bg-white">
          <div className="relative flex items-center">
            {loading ? (
              <Loader2 className="absolute left-3 size-4 animate-spin text-[#D4A537]" aria-hidden />
            ) : (
              <Search className="absolute left-3 size-4 text-[#7F1416]/50" aria-hidden />
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
              placeholder="Search sweets and categories..."
              className="h-10 w-full border border-[#7F1416]/10 bg-[#FAF5EC] pl-9 pr-10 text-[13px] font-medium text-[#7F1416] placeholder:text-[#7F1416]/50 focus:border-[#7F1416] focus:outline-none focus:ring-0 font-['Montserrat']"
              aria-label="Search sweets and categories"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-[#767676] hover:text-[#D4A537]"
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
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4 bg-white">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-[#7F1416]/50 font-['Montserrat']">
            Navigation
          </p>

          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-[#7F1416] transition-colors hover:bg-[#FAF5EC] hover:text-[#D4A537] font-['Montserrat'] uppercase tracking-wide border border-transparent hover:border-[#7F1416]/10"
          >
            <Store className="size-4" /> Home
          </Link>
          <Link
            href="/products"
            onClick={close}
            className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-[#7F1416] transition-colors hover:bg-[#FAF5EC] hover:text-[#D4A537] font-['Montserrat'] uppercase tracking-wide border border-transparent hover:border-[#7F1416]/10"
          >
            <ShoppingBag className="size-4" /> All Products
          </Link>
          
          {categories.length > 0 && (
            <>
              <div className="my-3 h-px w-full bg-[#7F1416]/5" />
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-[#7F1416]/50 font-['Montserrat']">
                Categories
              </p>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  onClick={close}
                  className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-[#7F1416] transition-colors hover:bg-[#FAF5EC] hover:text-[#D4A537] font-['Montserrat'] uppercase tracking-wide border border-transparent hover:border-[#7F1416]/10"
                >
                  <Tag className="size-4" /> {category.name}
                </Link>
              ))}
            </>
          )}

          <div className="my-3 h-px w-full bg-[#7F1416]/5" />

          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-[#7F1416]/50 font-['Montserrat']">
            Account
          </p>

          {isCheckingSession ? (
            <div
              className="flex items-center gap-3 border border-[#7F1416]/10 bg-[#FAF5EC] px-3 py-3 text-[13px] font-medium text-[#7F1416]/70 font-['Montserrat']"
              role="status"
              aria-live="polite"
            >
              <Loader2 className="size-4 animate-spin text-[#7F1416]" aria-hidden />
              Restoring your session…
            </div>
          ) : isSignedIn ? (
            <>
              <div className="mb-2 flex items-center gap-3 border border-[#7F1416]/10 bg-[#FAF5EC] px-3 py-2.5">
                <div className="flex size-8 items-center justify-center bg-[#7F1416] text-xs font-bold text-[#FAF5EC] font-['Montserrat']">
                  {(user?.firstName?.charAt(0) ?? user?.email?.charAt(0) ?? "U").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-[#7F1416] font-['Montserrat']">
                    {user?.firstName
                      ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`
                      : "My Account"}
                  </p>
                  <p className="truncate text-[11px] text-[#7F1416]/70 font-['Montserrat']">
                    {user?.email ?? user?.phone ?? "Signed in"}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={close}
                className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold text-[#7F1416] transition-colors hover:bg-[#FAF5EC] border border-transparent hover:border-[#7F1416]/10 font-['Montserrat'] uppercase tracking-wide"
              >
                <User className="size-4" /> My Account
              </Link>
              <button
                onClick={() => void onSignOut()}
                className="flex items-center gap-3 px-3 py-2.5 text-left text-[13px] font-semibold text-[#D4A537] transition-colors hover:bg-[#FAF5EC] border border-transparent hover:border-[#7F1416]/10 font-['Montserrat'] uppercase tracking-wide"
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/login${authRedirect}`}
                onClick={close}
                className="flex items-center justify-center gap-2 bg-[#7F1416] px-4 py-3 text-[13px] font-semibold text-[#FAF5EC] transition-colors hover:bg-[#D4A537] font-['Montserrat'] uppercase tracking-widest mt-2"
              >
                <LogOut className="size-4" /> Sign In
              </Link>
              <Link
                href={`/register${authRedirect}`}
                onClick={close}
                className="flex items-center justify-center gap-2 border border-[#7F1416] px-4 py-3 text-[13px] font-semibold text-[#7F1416] transition-colors hover:border-[#D4A537] hover:text-[#D4A537] font-['Montserrat'] uppercase tracking-widest mt-2"
              >
                <User className="size-4" /> Create Account
              </Link>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#7F1416]/10 px-5 py-4 bg-[#FAF5EC]">
          <p className="text-center text-[10px] text-[#7F1416]/70 font-['Montserrat'] uppercase tracking-widest">
            {minOrderValuePaise > 0
              ? `Minimum order: ${formatPrice(minOrderValuePaise)}`
              : "Handcrafted pure ghee sweets"}
          </p>
        </div>
      </div>
    </>
  );
}
