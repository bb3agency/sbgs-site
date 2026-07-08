"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, LogOut, LayoutDashboard, Heart } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { logoutSession } from "@/lib/auth-api";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { useCartSync } from "@/hooks/use-cart-sync";
import { useWishlistSync } from "@/hooks/use-wishlist-sync";
import { useSessionBootstrap } from "@/hooks/use-session-bootstrap";
import { CartDropdown } from "@/components/cart/CartDropdown";

export function MainNav() {
  useSessionBootstrap();
  useCartSync();
  useWishlistSync();
  const router = useRouter();
  const pathname = usePathname();
  const authRedirect = ["/login", "/register"].includes(pathname) ? "" : `?redirect=${encodeURIComponent(pathname)}`;
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const sessionStatus = useAuthStore((s) => s.storefrontSessionStatus);
  const clearCart = useCartStore((s) => s.clearCart);
  const { wishlistEnabled } = useStoreConfig();

  const isSignedIn = Boolean(accessToken);
  const isCheckingSession = sessionStatus === "checking" && !accessToken;

  const onSignOut = async () => {
    try {
      await logoutSession(accessToken);
    } catch {
      // Ignore API logout failures and clear client session anyway.
    } finally {
      useAuthStore.getState().logoutLocalSession();
      clearCart();
      useWishlistStore.getState().clear();
      router.push("/login");
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
      {/* Account menu — icon button with hover dropdown */}
      <div className="group relative hidden lg:block">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
          aria-label={isSignedIn ? `Account menu for ${user?.firstName || "user"}` : "Sign in or register"}
          aria-haspopup="menu"
        >
          <User className="size-5" aria-hidden />
        </button>

        {/* Dropdown */}
        <div className="invisible absolute right-0 top-full z-50 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          <div className="flex w-52 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            {isCheckingSession ? (
              <div className="px-5 py-3 text-sm text-muted-foreground">Checking session…</div>
            ) : isSignedIn ? (
              <>
                <div className="border-b border-border px-5 py-3">
                  <p className="text-xs font-medium text-muted-foreground">Hello,</p>
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user?.firstName || "My Account"}
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
                >
                  <LayoutDashboard className="size-4" aria-hidden /> Dashboard
                </Link>
                {wishlistEnabled ? (
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
                  >
                    <Heart className="size-4" aria-hidden /> Wishlist
                  </Link>
                ) : null}
                <button
                  onClick={onSignOut}
                  className="flex items-center gap-3 px-5 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
                >
                  <LogOut className="size-4" aria-hidden /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`/login${authRedirect}`}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
                >
                  <LogOut className="size-4" aria-hidden /> Sign In
                </Link>
                <Link
                  href={`/register${authRedirect}`}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand-maroon"
                >
                  <User className="size-4" aria-hidden /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mini cart — click opens a dropdown right below the icon (items + Go to Cart). */}
      <CartDropdown />
    </div>
  );
}
