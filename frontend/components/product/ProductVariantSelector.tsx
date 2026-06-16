"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import type { Product, ProductVariant } from "@/types/product";

interface ProductVariantSelectorProps {
  product: Product;
  defaultVariant: ProductVariant;
}

export function ProductVariantSelector({
  product,
  defaultVariant,
}: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(defaultVariant);

  const hasDiscount =
    typeof selectedVariant?.compareAtPrice === "number" &&
    selectedVariant.compareAtPrice > selectedVariant.price;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Price */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="text-2xl">
          <PriceDisplay
            pricePaise={selectedVariant?.price ?? 0}
            originalPricePaise={
              hasDiscount
                ? (selectedVariant?.compareAtPrice ?? undefined)
                : undefined
            }
          />
        </div>
        {hasDiscount && selectedVariant?.compareAtPrice && (
          <span className="rounded-full bg-[#d4a537] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Save{" "}
            {Math.round(
              (1 - selectedVariant.price / selectedVariant.compareAtPrice) *
                100,
            )}
            %
          </span>
        )}
      </div>

      {/* Variants */}
      {product.variants.length > 1 && (
        <div className="flex flex-col gap-3 pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#7f1416]">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold transition-all sm:px-5 sm:py-2 sm:text-sm ${
                  v.id === selectedVariant?.id
                    ? "border-[#7f1416] bg-[#7f1416] text-white"
                    : "border-[#efe8e4] text-[#767676] hover:border-[#7f1416] hover:text-[#7f1416]"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTAs — id used by StickyAddToCartBar IntersectionObserver */}
      {product.inStock && selectedVariant ? (
        <div id="pdp-atc-anchor" className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
          <AddToCartButton
            variantId={selectedVariant.id}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#faf5ec] text-sm font-bold text-[#7f1416] transition-colors hover:bg-[#f5d88e] sm:h-14"
            label="Add to cart"
          />
          <AddToCartButton
            variantId={selectedVariant.id}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#7f1416] text-sm font-bold text-white transition-colors hover:bg-[#d4a537] sm:h-14"
            label="Buy now"
            redirectTo="/checkout"
          />
        </div>
      ) : (
        <p className="rounded-full bg-[#faf5ec] py-4 text-center text-sm font-bold text-[#767676]">
          Currently out of stock
        </p>
      )}
    </div>
  );
}
