"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { AnimatedVariantCartButton } from "@/components/client/AnimatedVariantCartButton";
import { formatPrice } from "@/lib/format-price";

const PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

interface HomeProductCardProps {
  product: Product;
  priority?: boolean;
}

function formatReviewCount(count: number): string {
  return count > 999 ? `${(count / 1000).toFixed(1)}k+` : String(count);
}

export function HomeProductCard({ product, priority = false }: HomeProductCardProps) {
  const image = product.images[0];
  const imageSrc =
    image?.url && image.url !== "/next.svg" ? image.url : PLACEHOLDER_IMAGE;

  const activeVariants = product.variants.filter((v) => v.isActive);
  const variants = activeVariants.length > 0 ? activeVariants : product.variants;
  const displayPrice = variants[0]?.price ?? 0;

  const stars = Math.round(Math.min(5, Math.max(0, product.rating)));

  return (
    <article className="flex h-full flex-col rounded-2xl bg-card transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <Link
        href={`/products/${product.slug}`}
        className="group relative block aspect-square w-full overflow-hidden rounded-t-2xl bg-secondary"
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

      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Link href={`/products/${product.slug}`} className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-foreground transition-colors hover:text-brand-maroon">
              {product.name}
            </h3>
          </Link>
          <p className="shrink-0 font-heading text-lg font-semibold text-brand-maroon">
            {formatPrice(displayPrice)}
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

        <div className="mt-auto pt-4">
          {product.inStock ? (
            <AnimatedVariantCartButton variants={variants} />
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-border bg-brand-cream text-sm font-semibold text-muted-foreground transition-colors hover:border-brand-maroon hover:text-brand-maroon"
            >
              Out of Stock
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
