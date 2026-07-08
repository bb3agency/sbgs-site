"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, Search, X } from "lucide-react";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import { STORE_TAGLINE, HEADER_PROMO } from "@/lib/content";
import { MainNav } from "@/components/layout/MainNav";
import { SearchInput } from "@/components/shared/SearchInput";
import { MobileNav } from "@/components/layout/MobileNav";
import { CategoryDropdown } from "@/components/layout/CategoryDropdown";
import { useSessionBootstrap } from "@/hooks/use-session-bootstrap";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { useUiStore } from "@/stores/ui";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import type { CategoryWithMeta } from "@/lib/categories";

interface HeaderProps {
  categories: CategoryWithMeta[];
  /** Minimum order value in paise from the database. 0 = no minimum enforced. */
  minOrderValuePaise?: number;
}

export function Header({ categories, minOrderValuePaise = 0 }: HeaderProps) {
  useSessionBootstrap();
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Derive parent categories (parentId is null) and build a map of parentId → children
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

  // Close the search panel after navigating (submit or suggestion click).
  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);
  // Merchant-managed support phone from the public store config (Admin → Settings → Store Profile),
  // same source the Footer uses. Falls back to hidden when the merchant hasn't set one.
  const contactPhone = useStoreConfig().contactPhone?.trim() || "";
  const telHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <MobileNav categories={categories} minOrderValuePaise={minOrderValuePaise} />
      <header className="sticky top-0 z-50 w-full bg-brand-cream/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow">
        {/* Top strip — maroon announcement bar */}
        <div className="hidden bg-brand-maroon px-4 py-1.5 text-xs font-medium text-text-cream sm:flex sm:items-center sm:justify-center sm:gap-6">
          <span>
            {minOrderValuePaise > 0 ? (
              <>
                Minimum order value:{" "}
                <span className="font-bold text-brand-gold">
                  {formatPrice(minOrderValuePaise)}
                </span>
                . {HEADER_PROMO}
              </>
            ) : (
              STORE_TAGLINE
            )}
          </span>
          {contactPhone ? (
            <a
              href={telHref}
              className="inline-flex items-center gap-1.5 font-semibold text-brand-gold transition-colors hover:text-brand-gold-light"
            >
              <Phone className="size-3" aria-hidden />
              {contactPhone}
            </a>
          ) : null}
        </div>

        {/* Main row */}
        <div className="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center py-2 -ml-8 sm:ml-0"
            aria-label={`${APP_NAME} home`}
          >
            <Image
              src={BRAND_LOGO_SRC}
              alt={`${APP_NAME} Logo`}
              width={180}
              height={180}
              className="h-24 w-auto shrink-0 object-contain object-left sm:h-20 lg:h-32 lg:object-center"
            />
          </Link>

          {/* Center nav (desktop) */}
          <nav
            className="hidden items-center gap-8 text-sm font-medium text-foreground lg:flex"
            aria-label="Store navigation"
          >
            {/* Home */}
            <Link
              href="/"
              className={cn(
                "relative pb-1 transition-colors hover:text-brand-maroon",
                pathname === "/" &&
                "text-brand-maroon after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-maroon",
              )}
            >
              Home
            </Link>

            {/* Parent categories with subcategory dropdowns */}
            {parentCategories.map((parent) => {
              const isActive =
                pathname === `/categories/${parent.slug}` ||
                (childrenMap.get(parent.id) ?? []).some(
                  (sub) => pathname === `/categories/${sub.slug}`,
                );
              return (
                <CategoryDropdown
                  key={parent.id}
                  parent={parent}
                  subcategories={childrenMap.get(parent.id) ?? []}
                  active={isActive}
                />
              );
            })}

            {/* Static links */}
            <Link
              href="/locations"
              className={cn(
                "relative pb-1 transition-colors hover:text-brand-maroon",
                pathname.startsWith("/locations") &&
                "text-brand-maroon after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-maroon",
              )}
            >
              Our Branches
            </Link>
            <Link
              href="/about"
              className={cn(
                "relative pb-1 transition-colors hover:text-brand-maroon",
                pathname.startsWith("/about") &&
                "text-brand-maroon after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-maroon",
              )}
            >
              About Us
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search toggle (desktop) — expands a panel below the header row */}
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              className="hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:flex"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              aria-controls="header-search-panel"
            >
              {searchOpen ? <X className="size-5" aria-hidden /> : <Search className="size-5" aria-hidden />}
            </button>

            <MainNav />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Expandable search panel (desktop) */}
        {searchOpen ? (
          <div
            id="header-search-panel"
            className="hidden border-t border-border bg-brand-cream lg:block"
          >
            <div className="mx-auto w-full max-w-[720px] px-6 py-4">
              <SearchInput />
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
