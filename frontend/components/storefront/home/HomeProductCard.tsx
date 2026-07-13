"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Minus, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/format-price";

const PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

interface HomeProductCardProps {
  product: Product;
  priority?: boolean;
}

function formatReviewCount(count: number): string {
  return count > 999 ? `${(count / 1000).toFixed(1)}k+` : String(count);
}

/**
 * Reference-design product card (refernce-site Home.tsx §6): photo, name +
 * price row, gold stars, variant select + quantity stepper, maroon
 * Add to Cart. Wired to the real cart API via AddToCartButton.
 */
export function HomeProductCard({ product, priority = false }: HomeProductCardProps) {
  const image = product.images[0];
  const imageSrc =
    image?.url && image.url !== "/next.svg" ? image.url : PLACEHOLDER_IMAGE;

  const activeVariants = product.variants.filter((v) => v.isActive);
  const variants = activeVariants.length > 0 ? activeVariants : product.variants;
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];

  const stars = Math.round(Math.min(5, Math.max(0, product.rating)));

  return (
    <article className="flex h-full flex-col rounded-2xl bg-card p-3 transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <Link
        href={`/products/${product.slug}`}
        className="group relative mb-2 block aspect-square overflow-hidden rounded-xl bg-secondary"
        aria-label={product.name}
      >
        <Image
          src={imageSrc}
          alt={image?.altText ?? product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mb-2 flex items-center justify-between gap-2">
        <Link href={`/products/${product.slug}`} className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground transition-colors hover:text-brand-maroon">
            {product.name}
          </h3>
        </Link>
        <p className="shrink-0 font-heading text-lg font-semibold text-brand-maroon">
          {formatPrice(selected?.price ?? 0)}
        </p>
      </div>

      {product.reviewCount > 0 ? (
        <div className="mb-3 flex items-center gap-2">
          <div className="flex gap-0.5 text-brand-gold" aria-label={`${stars} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={i < stars ? "size-3.5 fill-current" : "size-3.5 fill-muted text-muted"}
                aria-hidden
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({formatReviewCount(product.reviewCount)})
          </span>
        </div>
      ) : null}

      <div className="mb-3 flex items-center justify-between gap-2">
        {variants.length > 1 ? (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="h-8 min-w-0 flex-1 cursor-pointer rounded-lg border border-border bg-transparent px-2 text-xs font-medium text-foreground focus:border-brand-maroon focus:outline-none"
            aria-label={`Select size for ${product.name}`}
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        ) : selected?.name && selected.name.toLowerCase() !== "default" ? (
          <span className="truncate text-xs font-medium text-muted-foreground">
            {selected.name}
          </span>
        ) : (
          <span className="flex-1" />
        )}

        <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-7 items-center justify-center text-foreground transition-colors hover:bg-brand-cream"
            aria-label={`Decrease quantity of ${product.name}`}
          >
            <Minus className="size-3" aria-hidden />
          </button>
          <span
            className="flex h-7 w-8 items-center justify-center border-x border-border text-sm font-medium text-foreground"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="flex size-7 items-center justify-center text-foreground transition-colors hover:bg-brand-cream"
            aria-label={`Increase quantity of ${product.name}`}
          >
            <Plus className="size-3" aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-auto">
        {product.inStock && selected ? (
          <AddToCartButton
            key={selected.id}
            variantId={selected.id}
            quantity={quantity}
            label="Add to Cart"
            icon={<ShoppingBag className="size-4" aria-hidden />}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-maroon text-sm font-semibold text-text-cream transition-colors hover:bg-brand-maroon-dark disabled:opacity-60"
          />
        ) : (
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-border bg-brand-cream text-sm font-semibold text-muted-foreground transition-colors hover:border-brand-maroon hover:text-brand-maroon"
          >
            {product.inStock ? "View" : "Out of Stock"}
          </Link>
        )}
      </div>
    </article>
  );
}
