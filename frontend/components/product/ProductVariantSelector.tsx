"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/format-price";
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
  const [quantity, setQuantity] = useState(1);

  const hasDiscount =
    typeof selectedVariant?.compareAtPrice === "number" &&
    selectedVariant.compareAtPrice > selectedVariant.price;

  const discountPercent =
    hasDiscount && selectedVariant?.compareAtPrice
      ? Math.round(
          (1 - selectedVariant.price / selectedVariant.compareAtPrice) * 100,
        )
      : 0;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Price row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-baseline gap-3">
        {hasDiscount && selectedVariant?.compareAtPrice && (
          <span className="text-base font-medium text-[#999] line-through decoration-[#ccc]">
            {formatPrice(selectedVariant.compareAtPrice)}
          </span>
        )}
        <span className="text-2xl font-bold text-[#222] sm:text-3xl">
          {formatPrice(selectedVariant?.price ?? 0)}
        </span>
        {hasDiscount && discountPercent > 0 && (
          <span className="rounded bg-[#7f1416] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
            Save {discountPercent}%
          </span>
        )}
      </div>

      {/* ── Variant selector (Select Weight) ───────────────────────────────── */}
      {product.variants.length > 1 && (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm font-semibold text-[#333]">Select Weight</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setSelectedVariant(v);
                  setQuantity(1);
                }}
                className={`rounded-lg border-2 px-5 py-2 text-sm font-semibold transition-all ${
                  v.id === selectedVariant?.id
                    ? "border-[#d4a537] bg-[#fffbf0] text-[#7f1416]"
                    : "border-[#e8e0d8] bg-white text-[#666] hover:border-[#d4a537] hover:text-[#7f1416]"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Quantity + Add to Cart + Buy Now ────────────────────────────────── */}
      {product.inStock && selectedVariant ? (
        <div id="pdp-atc-anchor" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          {/* Quantity selector */}
          <div className="flex h-12 items-center rounded-lg border border-[#e8e0d8] bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="flex h-full w-11 items-center justify-center text-[#666] transition-colors hover:text-[#7f1416] disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="flex h-full w-10 items-center justify-center border-x border-[#e8e0d8] text-sm font-bold text-[#333]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              className="flex h-full w-11 items-center justify-center text-[#666] transition-colors hover:text-[#7f1416] disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {/* Add to Cart */}
          <AddToCartButton
            variantId={selectedVariant.id}
            quantity={quantity}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#7f1416] px-6 text-sm font-bold text-white transition-all hover:bg-[#611012] hover:shadow-lg active:scale-[0.98] sm:min-w-[180px]"
            label="Add to cart"
            icon={<ShoppingCart className="size-4" aria-hidden />}
          />

          {/* Buy Now */}
          <AddToCartButton
            variantId={selectedVariant.id}
            quantity={quantity}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#e8e0d8] bg-white px-6 text-sm font-bold text-[#333] transition-all hover:border-[#7f1416] hover:text-[#7f1416] active:scale-[0.98] sm:min-w-[140px]"
            label="Buy now"
            icon={<Zap className="size-4" aria-hidden />}
            redirectTo="/checkout"
          />
        </div>
      ) : (
        <div className="rounded-lg bg-[#faf5ec] py-4 text-center text-sm font-bold text-[#767676]">
          Currently out of stock
        </div>
      )}
    </div>
  );
}
