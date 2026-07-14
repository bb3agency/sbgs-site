"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Menu,
  MessageCircle,
  Building2,
  MapPin,
  Sparkles,
  Candy,
  Gift,
  Droplet,
  ShoppingBasket,
  Briefcase,
  PartyPopper,
  Tag,
  ChevronDown,
} from "lucide-react";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import { MainNav } from "@/components/layout/MainNav";
import { SearchInput } from "@/components/shared/SearchInput";
import { MobileNav } from "@/components/layout/MobileNav";
import { useSessionBootstrap } from "@/hooks/use-session-bootstrap";
import { useUiStore } from "@/stores/ui";
import { formatPrice } from "@/lib/format-price";
import type { CategoryWithMeta } from "@/lib/categories";

interface HeaderProps {
  categories: CategoryWithMeta[];
  /** Minimum order value in paise from the database. 0 = no minimum enforced. */
  minOrderValuePaise?: number;
}

export function HeaderV2({ categories, minOrderValuePaise = 0 }: HeaderProps) {
  useSessionBootstrap();
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);

  return (
    <>
      <MobileNav categories={categories} minOrderValuePaise={minOrderValuePaise} />
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm transition-all">
        {/* Utility strip */}
        <div className="hidden bg-brand-maroon text-white sm:block">
          <div className="mx-auto flex h-9 w-full max-w-[1440px] items-center justify-between gap-4 px-4 text-[11px] font-medium lg:px-8">
            <div className="flex items-center gap-2 tracking-wide">
              <Sparkles className="size-3.5 text-brand-gold" aria-hidden />
              {minOrderValuePaise > 0 ? (
                <span>
                  Same-Day Dispatch · Pure Ghee · No Preservatives · Min. order{" "}
                  <span className="font-bold text-brand-gold">
                    {formatPrice(minOrderValuePaise)}
                  </span>
                </span>
              ) : (
                <span>Same-Day Dispatch · Pure Ghee · No Preservatives</span>
              )}
            </div>
            <div className="flex items-center gap-5">
              <a
                href="https://wa.me/919876543210"
                className="flex items-center gap-1.5 transition-colors hover:text-brand-gold"
              >
                <MessageCircle className="size-3.5" aria-hidden />
                WhatsApp Support
              </a>
              <a
                href="tel:+919876543210"
                className="hidden items-center gap-1.5 transition-colors hover:text-brand-gold md:flex"
              >
                <Phone className="size-3.5" aria-hidden />
                +91 98765 43210
              </a>
              <Link
                href="/products?sort=popularity"
                className="hidden items-center gap-1.5 transition-colors hover:text-brand-gold lg:flex"
              >
                <Building2 className="size-3.5" aria-hidden />
                Corporate / Bulk Orders
              </Link>
              <Link
                href="/locations"
                className="hidden items-center gap-1.5 transition-colors hover:text-brand-gold lg:flex"
              >
                <MapPin className="size-3.5" aria-hidden />
                Store Locator
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="mx-auto flex h-16 sm:h-20 w-full max-w-[1440px] items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 lg:gap-8 lg:px-8">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1.5 sm:gap-2 font-heading text-lg sm:text-2xl font-bold tracking-tight text-brand-maroon"
              aria-label={`${APP_NAME} home`}
            >
              <Image src={BRAND_LOGO_SRC} alt={`${APP_NAME} logo`} width={36} height={36} className="size-8 sm:size-9 shrink-0 object-contain" />
              <span className="truncate">{APP_NAME}</span>
            </Link>
          </div>

          {/* Central Search (Desktop) */}
          <div className="hidden flex-1 max-w-2xl overflow-visible lg:block">
            <div className="relative z-[60] w-full">
              <SearchInput />
            </div>
          </div>

          {/* Support & Actions */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <div className="hidden items-center gap-3 lg:flex">
              <div className="flex size-11 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                <Phone className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-muted-foreground">Order &amp; Support</span>
                <a href="tel:+919876543210" className="text-sm font-bold text-brand-maroon hover:text-brand-gold">+91 98765 43210</a>
              </div>
            </div>

            <div className="h-8 w-px bg-secondary hidden lg:block" aria-hidden="true" />

            <MainNav />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-maroon lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Row - Desktop */}
        <div className="hidden border-t border-border bg-card lg:block">
          <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center px-8">
            <nav
              className="flex w-full items-center justify-between text-sm font-semibold text-[#1c3553]"
              aria-label="Store navigation"
            >
              <div className="flex items-center gap-8">
                <Link href="/products" className="flex items-center gap-1.5 transition-colors hover:text-brand-gold">
                  Shop All <ChevronDown className="size-4" />
                </Link>
                <Link href="/products?category=hampers" className="flex items-center gap-1.5 transition-colors hover:text-brand-gold">
                  Hampers <ChevronDown className="size-4" />
                </Link>
                <Link href="/products?category=customised-gifting" className="flex items-center gap-1.5 transition-colors hover:text-brand-gold">
                  Customised Gifting <ChevronDown className="size-4" />
                </Link>
                <Link href="/products?category=mango-specials" className="flex items-center gap-1.5 transition-colors hover:text-brand-gold">
                  Mango Specials <ChevronDown className="size-4" />
                </Link>
              </div>

              <div className="flex items-center gap-8">
                <Link href="/locations" className="transition-colors hover:text-brand-gold">
                  Our Stores
                </Link>
                <Link href="/about" className="transition-colors hover:text-brand-gold">
                  About Us
                </Link>
                <Link href="/sweets-library" className="transition-colors hover:text-brand-gold">
                  Sweets Library
                </Link>
                <Link href="/blog" className="transition-colors hover:text-brand-gold">
                  Blog
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
