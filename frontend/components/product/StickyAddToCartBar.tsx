"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
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

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // show bar when the anchor is NOT intersecting (scrolled past)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, [anchorId]);

  if (!inStock) return null;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-[#ece3d8] bg-white/95 shadow-[0_-4px_20px_-4px_rgba(107,29,42,0.12)] backdrop-blur-sm transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 lg:px-8">
        {/* Product thumb */}
        <div className="relative hidden size-12 shrink-0 overflow-hidden rounded-lg border border-[#ece3d8] bg-[#faf3ef] sm:block">
          <Image
            src={productImage}
            alt={imageAlt}
            fill
            className="object-contain p-1"
            sizes="48px"
          />
        </div>

        {/* Name + price */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#3a2218]">{productName}</p>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-sm font-extrabold text-[#6B1D2A]">
              {formatPrice(price)}
            </span>
            {compareAtPrice && compareAtPrice > price ? (
              <span className="text-xs text-[#8c7b6b] line-through">
                {formatPrice(compareAtPrice)}
              </span>
            ) : null}
          </div>
        </div>

        {/* CTA */}
        <AddToCartButton
          variantId={variantId}
          className="btn-sticky-cta flex h-11 shrink-0 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#6B1D2A] via-[#7B2534] to-[#6B1D2A] px-6 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_4px_16px_rgba(107,29,42,0.3)] sm:h-12 sm:px-8"
          label="Add to cart"
          icon={<ShoppingCart className="btn-icon-animated size-4" />}
        />
      </div>
    </div>
  );
}
