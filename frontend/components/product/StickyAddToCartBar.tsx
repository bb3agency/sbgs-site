"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

interface StickyAddToCartBarProps {
  productName: string;
  productImage: string;
  imageAlt: string;
  price: number;
  compareAtPrice?: number;
  variantId: string;
  inStock: boolean;
  /** id of the element to observe — when it leaves the viewport the bar shows */
  anchorId?: string;
}

export function StickyAddToCartBar({
  productName,
  productImage,
  imageAlt,
  price,
  compareAtPrice,
  variantId,
  inStock,
  anchorId = "pdp-atc-anchor",
}: StickyAddToCartBarProps) {
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor) return;

    let hasBeenVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasBeenVisible = true;
          setVisible(false);
        } else if (hasBeenVisible) {
          // Only show after the anchor was visible and then scrolled away
          setVisible(true);
        }
      },
      { threshold: 0 },
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, [anchorId]);

  if (!inStock) return null;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/98 shadow-[0_-4px_24px_-4px_rgba(35,64,61,0.1)] backdrop-blur-md transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:gap-5 sm:px-6 lg:px-8">
        {/* Product thumb */}
        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-brand-cream sm:size-14">
          <Image
            src={productImage}
            alt={imageAlt}
            fill
            className="object-contain p-1.5"
            sizes="56px"
          />
        </div>

        {/* Name + price */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-foreground sm:text-base">{productName}</p>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-base font-extrabold text-brand-maroon sm:text-lg">
              {formatPrice(price)}
            </span>
            {compareAtPrice && compareAtPrice > price ? (
              <span className="text-xs text-muted-foreground/70 line-through">
                {formatPrice(compareAtPrice)}
              </span>
            ) : null}
          </div>
        </div>

        {/* Quantity selector */}
        <div className="hidden items-center gap-0 rounded-xl border border-border bg-secondary/50 sm:flex">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="flex h-10 w-8 items-center justify-center border-x border-border text-sm font-bold text-foreground">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="flex h-10 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        {/* CTA */}
        <AddToCartButton
          variantId={variantId}
          quantity={quantity}
          className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-brand-maroon px-5 text-sm font-bold text-white transition-colors hover:bg-brand-maroon/90 sm:h-12 sm:px-7"
          label="Add to cart"
          icon={<ShoppingCart className="size-4" />}
        />
      </div>
    </div>
  );
}
