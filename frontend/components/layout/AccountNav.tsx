"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, MapPin, Settings, LogOut, Heart } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { logoutSession } from "@/lib/auth-api";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  Icon: typeof LayoutDashboard;
}

const BASE_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/orders", label: "Orders", Icon: Package },
  { href: "/addresses", label: "Addresses", Icon: MapPin },
  { href: "/settings", label: "Settings", Icon: Settings },
];

/**
 * Account-area navigation. Desktop: vertical sidebar with a profile card and sign-out.
 * Mobile: horizontal scrollable pill bar. Active route is highlighted.
 */
export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const { wishlistEnabled } = useStoreConfig();

  // Wishlist tab only appears when the merchant has the feature enabled.
  const navItems: NavItem[] = wishlistEnabled
    ? [
        BASE_ITEMS[0]!,
        BASE_ITEMS[1]!,
        { href: "/wishlist", label: "Wishlist", Icon: Heart },
        BASE_ITEMS[2]!,
        BASE_ITEMS[3]!,
      ]
    : BASE_ITEMS;

  const initial =
    user?.firstName?.trim().charAt(0).toUpperCase() ||
    user?.email?.trim().charAt(0).toUpperCase() ||
    "?";
  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "My Account";
  const displayContact = user?.email || user?.phone || "";

  async function handleSignOut() {
    try {
      await logoutSession(accessToken);
    } finally {
      useAuthStore.getState().logoutLocalSession();
      router.replace("/login");
    }
  }

  return (
    <nav
      className="flex min-w-0 flex-row items-center gap-1.5 overflow-x-auto rounded-[20px] bg-card p-2 shadow-sm scrollbar-none lg:flex-col lg:items-stretch lg:gap-1 lg:overflow-x-visible lg:p-4"
      aria-label="Account"
    >
      {/* Profile card — desktop sidebar only */}
      <div className="mb-0 hidden items-center gap-3 border-b border-border pb-4 lg:flex">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-maroon text-base font-bold text-text-cream" aria-hidden>
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
          {displayContact ? (
            <p className="truncate text-xs text-muted-foreground">{displayContact}</p>
          ) : null}
        </div>
      </div>

      {navItems.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname?.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors sm:text-sm lg:justify-start lg:px-4 lg:py-3",
              active
                ? "bg-brand-maroon text-text-cream"
                : "text-foreground hover:bg-brand-cream hover:text-brand-maroon",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        );
      })}

      {/* Sign out — desktop sidebar only (mobile keeps the pill bar compact) */}
      <button
        type="button"
        onClick={() => void handleSignOut()}
        className="mt-0 hidden items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-brand-cream hover:text-brand-maroon lg:mt-2 lg:flex lg:border-t lg:border-border lg:pt-4"
      >
        <LogOut className="size-4 shrink-0" aria-hidden />
        Sign out
      </button>
    </nav>
  );
}
