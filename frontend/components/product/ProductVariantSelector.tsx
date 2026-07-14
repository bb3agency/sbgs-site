"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
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

  // `?variant=<id>` deep-links (e.g. from order history) preselect that variant. Read from
  // window on mount — NOT useSearchParams — so the statically-rendered PDP needs no Suspense
  // boundary and stays fully ISR-cacheable.
  useEffect(() => {
    const requestedId = new URLSearchParams(window.location.search).get("variant");
    if (!requestedId) return;
    const requested = product.variants.find((v) => v.id === requestedId);
    if (requested) setSelectedVariant(requested);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasDiscount =
    typeof selectedVariant?.compareAtPrice === "number" &&
    selectedVariant.compareAtPrice > selectedVariant.price;

  return (
    <div className="flex flex-col gap-5">
      {/* Variant cards */}
      {product.variants.length > 1 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-foreground">
            Select Pack Size
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {product.variants.map((v) => {
              const isSelected = v.id === selectedVariant?.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                  className={`relative flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                    isSelected
                      ? "border-brand-maroon bg-brand-maroon/[0.03]"
                      : "border-border hover:border-brand-maroon/40"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-brand-maroon text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  )}
                  <span className="text-sm font-semibold text-foreground">{v.name}</span>
                  <span className="text-base font-bold text-brand-maroon">
                    {formatPrice(v.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected size + price summary */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-5 py-3.5">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Selected Size
          </span>
          <span className="mt-0.5 text-sm font-bold text-foreground">
            {selectedVariant?.name ?? "—"}
          </span>
          <span className="mt-0.5 text-[11px] text-muted-foreground">
            (Inclusive of all taxes)
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Price
          </span>
          <div className="flex items-baseline gap-2">
            {hasDiscount && selectedVariant?.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
            )}
            <span className="text-2xl font-bold text-brand-maroon">
              {formatPrice(selectedVariant?.price ?? 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Quantity + CTAs — id used by StickyAddToCartBar IntersectionObserver */}
      {product.inStock && selectedVariant ? (
        <div id="pdp-atc-anchor" className="flex flex-row items-stretch gap-3">
          {/* Quantity selector */}
          <div className="flex h-[3.25rem] sm:h-14 items-center gap-0 rounded-xl border border-border bg-card">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-full w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="flex h-full w-10 items-center justify-center border-x border-border text-sm font-bold text-foreground">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="flex h-full w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <AddToCartButton
            variantId={selectedVariant.id}
            quantity={quantity}
            className="flex h-[3.25rem] sm:h-14 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-maroon bg-card px-4 sm:px-6 text-sm font-bold text-brand-maroon shadow-sm transition-colors hover:bg-brand-maroon/5 disabled:opacity-60"
            label="Add to cart"
            icon={<ShoppingCart className="size-4 shrink-0" aria-hidden />}
          />
        </div>
      ) : (
        <p className="rounded-xl bg-brand-cream py-4 text-center text-sm font-bold text-muted-foreground">
          Currently out of stock
        </p>
      )}
    </div>
  );
}
