"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useAuthStore } from "@/stores/auth";
import { useWishlistStore } from "@/stores/wishlist";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlist-api";
import { cn } from "@/lib/utils";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { formatPrice } from "@/lib/format-price";
import {
  PRODUCT_CARD_MAX_VARIANT_CHIPS,
  resolveCardVariant,
  selectableCardVariants,
} from "@/lib/product-card-variants";

const PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  priority = false,
  className,
}: ProductCardProps) {
  const image = product.images[0];
  const accessToken = useAuthStore((s) => s.accessToken);
  const { wishlistEnabled } = useStoreConfig();
  const items = useWishlistStore((s) => s.items);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const [loading, setLoading] = useState(false);

  const inWishlist = items.has(product.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    const next = !inWishlist;
    toggleItem(product.id, next);
    if (!accessToken) return;
    setLoading(true);
    try {
      if (next) await addToWishlist(product.id, accessToken);
      else await removeFromWishlist(product.id, accessToken);
    } catch {
      toggleItem(product.id, !next);
    } finally {
      setLoading(false);
    }
  };

  const selectableVariants = selectableCardVariants(product.variants);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const activeVariant = resolveCardVariant(product.variants, selectedVariantId);
  const imageSrc = image?.url && image.url !== "/next.svg" ? image.url : PLACEHOLDER_IMAGE;
  
  // Extract a clean short description
  const shortDescription = product.description.trim().slice(0, 70);

  // Use the variant name as the unit if available (e.g. " / 1kg")
  // For standard kg pricing, we might just use /kg. Let's use the variant name.
  // The design shows "₹850 /kg", so we format it carefully.
  const isKg = activeVariant?.name?.toLowerCase().includes("1kg") || activeVariant?.name?.toLowerCase() === "kg";
  const unitText = isKg ? "/kg" : activeVariant?.name ? `/ ${activeVariant.name}` : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      {/* Image Container with inner padding */}
      <div className="relative p-2.5 sm:p-3 pb-0">
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-[#faf8f5]"
          aria-label={product.name}
        >
          <Image
            src={imageSrc}
            alt={image?.altText ?? product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Wishlist button top-right */}
        {wishlistEnabled ? (
          <button
            type="button"
            className={cn(
              "absolute right-5 top-5 z-10 flex size-8 items-center justify-center text-muted-foreground transition-all hover:text-brand-maroon hover:scale-110",
              inWishlist && "text-brand-maroon",
              loading && "opacity-60",
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={handleWishlistToggle}
            disabled={loading}
          >
            <Heart className={cn("size-[18px]", inWishlist && "fill-current")} strokeWidth={1.5} />
          </button>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <Link href={`/products/${product.slug}`} className="mb-1.5">
          <h3 className="line-clamp-1 font-heading text-[17px] font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-maroon sm:text-[18px]">
            {product.name}
          </h3>
        </Link>

        {shortDescription ? (
          <p className="mb-4 line-clamp-1 text-[11px] text-muted-foreground sm:text-xs">
            {shortDescription}
            {product.description.length > 70 ? "…" : ""}
          </p>
        ) : (
          <div className="mb-4 min-h-[1rem]" />
        )}

        {/* Bottom row: price + cart */}
        <div className="mt-auto flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-1">
            <span className="font-sans text-[16px] font-semibold text-foreground sm:text-[17px]">
              {formatPrice(activeVariant?.price ?? 0)}
            </span>
            {unitText && (
              <span className="text-[11px] font-medium text-muted-foreground/80 sm:text-[12px]">
                {unitText}
              </span>
            )}
          </div>

          {product.inStock && activeVariant ? (
            <AddToCartButton
              variantId={activeVariant.id}
              className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#521b1b] text-white shadow-sm transition-all hover:bg-brand-maroon-dark hover:scale-105"
              label=""
              icon={<ShoppingCart className="size-[15px]" strokeWidth={2.5} />}
            />
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-border hover:scale-105"
              aria-label={`View ${product.name}`}
            >
              <ShoppingCart className="size-[15px]" strokeWidth={2.5} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
