"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import { MainNav } from "@/components/layout/MainNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { useSessionBootstrap } from "@/hooks/use-session-bootstrap";
import { useUiStore } from "@/stores/ui";
import type { CategoryWithMeta } from "@/lib/categories";

interface HeaderProps {
  categories: CategoryWithMeta[];
  /** Minimum order value in paise from the database. 0 = no minimum enforced. */
  minOrderValuePaise?: number;
}

export function Header({ categories, minOrderValuePaise = 0 }: HeaderProps) {
  useSessionBootstrap();
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);

  return (
    <>
      <MobileNav categories={categories} minOrderValuePaise={minOrderValuePaise} />
      <header className="sticky top-0 z-50 w-full transition-all">
        {/* Announcement Bar — Dadu's style: cream-colored with maroon text */}
        <div
          className="hidden w-full px-4 py-2.5 text-center sm:block"
          style={{ backgroundColor: "#8B1A1A" }}
        >
          <p className="text-[12px] font-medium tracking-[0.1em] text-white font-['Montserrat']">
            Free Shipping Pan India Above 999/- <strong className="ml-1 uppercase underline decoration-white/50 underline-offset-4">Order Now!</strong>
          </p>
        </div>

        {/* Main Header Bar — off-white bg with bottom border */}
        <div
          className="border-b"
          style={{
            backgroundColor: "#FAF6EE",
            borderBottomColor: "#ECE3D8",
          }}
        >
          <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-4 sm:h-28 lg:px-8">
            {/* Left — Hamburger Menu (Always visible) */}
            <div className="flex flex-1 items-center justify-start">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex size-10 shrink-0 items-center justify-center transition-all duration-300"
                style={{
                  color: "#7F1416",
                }}
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </button>
            </div>

            {/* Center Logo — bigger and centered */}
            <div className="flex flex-1 justify-center">
              <Link
                href="/"
                className="flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]"
                aria-label={`${APP_NAME} home`}
              >
                <Image
                  src={BRAND_LOGO_SRC}
                  alt="Sri Sai Baba Ghee Sweets Logo"
                  width={400}
                  height={200}
                  className="h-16 w-auto shrink-0 object-contain sm:h-24"
                  priority
                />
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
               <MainNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
