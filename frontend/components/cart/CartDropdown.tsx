"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/format-price";

const PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

/**
 * Header mini-cart. Clicking the cart icon opens a small dropdown anchored directly below
 * the icon (a "continuation" of the trigger) listing the current cart lines with a
 * "Go to Cart" action — instead of navigating away immediately.
 *
 * Viewport-aware: on desktop it is a fixed 320px panel hanging from the icon's right edge;
 * on mobile it clamps to the viewport width (with side gutters) so it never overflows.
 * Closes on outside click and Escape.
 */
export function CartDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  // Outside click + Escape close.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {/* Trigger — mirrors the old cart link visuals, but toggles the dropdown. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
        className="group flex items-center"
      >
        <div className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors group-hover:bg-secondary">
          <ShoppingCart className="size-5" aria-hidden />
          <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-brand-maroon text-[9px] font-bold leading-none text-text-cream shadow-sm ring-2 ring-brand-cream sm:size-[17px] sm:text-[10px]">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        </div>
      </button>

      {/* Dropdown — anchored right under the trigger. */}
      {open && (
        <div
          role="dialog"
          aria-label="Cart preview"
          className="absolute right-0 top-full z-[60] mt-3 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
        >
          {/* Little notch pointing at the icon */}
          <div className="absolute -top-1.5 right-4 size-3 rotate-45 border-l border-t border-border bg-card" aria-hidden />

          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">
              Your Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </p>
            {cartCount > 0 && (
              <p className="text-sm font-semibold text-brand-maroon">{formatPrice(cartTotal)}</p>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-brand-maroon">
                <ShoppingCart className="size-5" aria-hidden />
              </div>
              <p className="text-sm font-medium text-foreground">Your cart is empty</p>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-brand-maroon hover:underline"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <>
              <ul className="max-h-72 overflow-y-auto overscroll-contain divide-y divide-border">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                      <Image
                        src={item.product?.imageUrl || PLACEHOLDER_IMAGE}
                        alt={item.product?.imageAlt || item.product?.name || "Cart item"}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {item.product?.name ?? item.variant?.name ?? "Item"}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {item.variant?.name ? `${item.variant.name} · ` : ""}
                        {item.quantity} × {formatPrice(item.priceSnapshot)}
                      </p>
                    </div>
                    <p className="shrink-0 text-xs font-semibold text-foreground">
                      {formatPrice(item.lineTotal)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border p-3">
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-maroon text-sm font-semibold text-text-cream transition-colors hover:bg-brand-maroon-dark"
                >
                  Go to Cart
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
