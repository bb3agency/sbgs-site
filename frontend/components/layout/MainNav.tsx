"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, LogOut, LayoutDashboard, ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useUiStore } from "@/stores/ui";
import { canAccessAdmin } from "@/lib/permissions";
import { logoutSession } from "@/lib/auth-api";
import { useCartStore } from "@/stores/cart";
import { useCartSync } from "@/hooks/use-cart-sync";
import { useWishlistSync } from "@/hooks/use-wishlist-sync";
import { useSessionBootstrap } from "@/hooks/use-session-bootstrap";
import { PriceDisplay } from "@/components/shared/PriceDisplay";

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

  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const isSignedIn = Boolean(accessToken);
  const isCheckingSession = sessionStatus === "checking" && !accessToken;
  const showAdmin = canAccessAdmin(user);

  const onSignOut = async () => {
    try {
      await logoutSession(accessToken);
    } catch {
      // Ignore API logout failures and clear client session anyway.
    } finally {
      useAuthStore.getState().logoutLocalSession();
      clearCart();
      router.push("/login");
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-3 sm:gap-4">
      {/* Search Trigger */}
      <button 
        className="flex size-9 items-center justify-center rounded-full bg-[#fdf0d5] text-[#6B1D2A] transition-colors hover:bg-[#D4A537] hover:text-white sm:size-11"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 sm:size-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </button>

      {/* Account Menu */}
      <div className="group relative flex items-center gap-2 cursor-pointer">
        <div className="flex size-9 items-center justify-center rounded-full bg-[#fdf0d5] text-[#6B1D2A] transition-colors group-hover:bg-[#D4A537] group-hover:text-white sm:size-11">
          <User className="size-4 sm:size-5" />
        </div>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full pt-4 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible z-50">
          <div className="flex w-48 flex-col overflow-hidden rounded-xl border border-[#ece3d8] bg-white shadow-xl">
            {isCheckingSession ? (
              <div className="px-5 py-3 text-sm text-[#767676]">Checking session…</div>
            ) : isSignedIn ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#6B1D2A] hover:bg-[#fdf8f3] hover:text-[#D4A537]">
                  <User className="size-4" /> Dashboard
                </Link>
                <button onClick={onSignOut} className="flex items-center gap-3 px-5 py-3 text-left text-sm font-bold text-[#6B1D2A] hover:bg-[#fdf8f3] hover:text-[#D4A537]">
                  <LogOut className="size-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href={`/login${authRedirect}`} className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#6B1D2A] hover:bg-[#fdf8f3] hover:text-[#D4A537]">
                  <LogOut className="size-4" /> Sign In
                </Link>
                <Link href={`/register${authRedirect}`} className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#6B1D2A] hover:bg-[#fdf8f3] hover:text-[#D4A537]">
                  <User className="size-4" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mini Cart Trigger */}
      <button 
        onClick={() => useUiStore.getState().setCartSheetOpen(true)} 
        className="group flex items-center gap-3"
        aria-label="Open Cart"
      >
        <div className="relative flex size-9 items-center justify-center rounded-full bg-[#fdf0d5] text-[#6B1D2A] transition-colors group-hover:bg-[#D4A537] group-hover:text-white sm:size-11">
          <ShoppingCart className="size-4 sm:size-5" />
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#D4A537] text-[8px] font-bold leading-none text-white shadow-sm ring-2 ring-white transition-colors group-hover:bg-[#6B1D2A] sm:size-[18px] sm:text-[10px]">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        </div>
      </button>
    </div>
  );
}
