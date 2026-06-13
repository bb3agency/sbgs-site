"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
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
  const [quantity, setQuantity] = useState(1);

  const hasDiscount =
    typeof selectedVariant?.compareAtPrice === "number" &&
    selectedVariant.compareAtPrice > selectedVariant.price;

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Price row */}
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-2xl font-bold text-[#6B1D2A] sm:text-3xl">
          <PriceDisplay
            pricePaise={selectedVariant?.price ?? 0}
            originalPricePaise={
              hasDiscount
                ? (selectedVariant?.compareAtPrice ?? undefined)
                : undefined
            }
          />
        </span>
        {hasDiscount && selectedVariant?.compareAtPrice && (
          <span className="rounded-md bg-[#6B1D2A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Save{" "}
            {Math.round(
              (1 - selectedVariant.price / selectedVariant.compareAtPrice) *
                100,
            )}
            %
          </span>
        )}
        {product.category?.name && (
          <span className="text-xs text-[#8c7b6b]">
            • {product.category.name}
          </span>
        )}
      </div>

      {/* Variant selector (Weight / Size) */}
      {product.variants.length > 1 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3a2218]">
              Quantity
            </span>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`rounded-lg border-2 px-4 py-1.5 text-xs font-semibold transition-all sm:px-5 sm:py-2 sm:text-sm ${
                    v.id === selectedVariant?.id
                      ? "border-[#6B1D2A] bg-[#6B1D2A] text-white"
                      : "border-[#ece3d8] text-[#6b5c50] hover:border-[#6B1D2A] hover:text-[#6B1D2A]"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3a2218]">
          Quantity
        </span>
        <div className="flex items-center overflow-hidden rounded-xl border-2 border-[#ece3d8] shadow-[0_1px_4px_rgba(107,29,42,0.06)] transition-shadow hover:shadow-[0_2px_8px_rgba(107,29,42,0.1)]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-10 items-center justify-center text-[#6b5c50] transition-all hover:bg-[#6B1D2A] hover:text-white active:scale-90 sm:size-11"
            aria-label="Decrease quantity"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="flex size-10 items-center justify-center border-x-2 border-[#ece3d8] text-sm font-bold text-[#3a2218] sm:size-11 sm:min-w-[48px]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-10 items-center justify-center text-[#6b5c50] transition-all hover:bg-[#6B1D2A] hover:text-white active:scale-90 sm:size-11"
            aria-label="Increase quantity"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Stock indicator */}
      <div className="flex items-center gap-2 text-sm">
        {product.inStock ? (
          <>
            <span className="inline-block size-2 rounded-full bg-[#2d8a4e]" aria-hidden />
            <span className="font-semibold text-[#2d8a4e]">Available — Ready to ship</span>
          </>
        ) : (
          <>
            <span className="inline-block size-2 rounded-full bg-[#c0392b]" aria-hidden />
            <span className="font-semibold text-[#c0392b]">Out of stock</span>
          </>
        )}
      </div>

      {/* CTA buttons */}
      {product.inStock && selectedVariant ? (
        <div id="pdp-atc-anchor" className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4">
          <AddToCartButton
            variantId={selectedVariant.id}
            quantity={quantity}
            containerClassName="flex-1 w-full"
            className="btn-premium-outline flex h-14 w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#6B1D2A] px-6 text-sm font-bold uppercase tracking-[0.12em] text-[#6B1D2A] shadow-[0_2px_8px_rgba(107,29,42,0.08)] sm:h-[60px] sm:px-8 sm:text-[13px]"
            label="Add to Cart"
            icon={<ShoppingCart className="btn-icon-animated size-[18px]" aria-hidden />}
          />
          <AddToCartButton
            variantId={selectedVariant.id}
            quantity={quantity}
            containerClassName="flex-1 w-full"
            className="btn-premium flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#6B1D2A] via-[#7B2534] to-[#6B1D2A] px-6 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_4px_16px_rgba(107,29,42,0.3)] hover:shadow-[0_6px_24px_rgba(107,29,42,0.4)] sm:h-[60px] sm:px-8 sm:text-[13px]"
            label="Buy it Now"
            redirectTo="/checkout"
            icon={<ShoppingCart className="btn-icon-animated size-[18px]" aria-hidden />}
          />
        </div>
      ) : (
        <p className="rounded-lg bg-[#f5ebe0] py-4 text-center text-sm font-bold text-[#8c7b6b]">
          Currently out of stock
        </p>
      )}
    </div>
  );
}
