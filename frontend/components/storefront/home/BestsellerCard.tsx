"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Star, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useAuthStore } from "@/stores/auth";
import { useWishlistStore } from "@/stores/wishlist";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlist-api";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

interface BestsellerCardProps {
  product: Product;
  priority?: boolean;
  badge?: string;
}

export function BestsellerCard({ product, priority = false, badge }: BestsellerCardProps) {
  const image = product.images[0];
  const accessToken = useAuthStore((s) => s.accessToken);
  const { wishlistEnabled } = useStoreConfig();
  const items = useWishlistStore((s) => s.items);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const [loading, setLoading] = useState(false);

  const inWishlist = items.has(product.id);

  const activeVariants = product.variants.filter((v) => v.isActive);
  const variants = activeVariants.length > 0 ? activeVariants : product.variants;
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");
  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];

  const imageSrc =
    image?.url && image.url !== "/next.svg" ? image.url : PLACEHOLDER_IMAGE;

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!accessToken) {
      alert("Please sign in to save items to your wishlist.");
      return;
    }
    if (loading) return;
    setLoading(true);
    toggleItem(product.id, !inWishlist);
    try {
      if (inWishlist) {
        await removeFromWishlist(product.id, accessToken);
      } else {
        await addToWishlist(product.id, accessToken);
      }
    } catch {
      toggleItem(product.id, inWishlist);
      alert("Failed to update wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#efe8e4] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-[#faf5ec]"
          aria-label={product.name}
        >
          <Image
            src={imageSrc}
            alt={image?.altText ?? product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {badge ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#d4a537] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#7f1416] shadow-sm">
            {badge}
          </span>
        ) : null}

        {wishlistEnabled ? (
          <button
            type="button"
            onClick={handleWishlistToggle}
            disabled={loading}
            className={cn(
              "absolute right-2.5 top-2.5 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#7f1416] shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-[#d4a537] hover:text-white",
              inWishlist && "bg-[#7f1416] text-white",
              loading && "opacity-60",
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("size-3.5", inWishlist && "fill-current")} />
          </button>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.slug}`} className="min-w-0">
            <h3 className="truncate text-sm font-bold text-[#3a2218] transition-colors group-hover:text-[#7f1416]">
              {product.name}
            </h3>
          </Link>
          {product.reviewCount > 0 ? (
            <span className="flex shrink-0 items-center gap-0.5 text-[11px] font-bold text-[#3a2218]">
              <Star className="size-3 fill-[#d4a537] text-[#d4a537]" aria-hidden />
              {product.rating.toFixed(1)}
              <span className="font-medium text-[#767676]">
                ({product.reviewCount > 999 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
              </span>
            </span>
          ) : null}
        </div>

        <p className="mt-1.5 text-sm font-extrabold text-[#7f1416]">
          From {formatPrice(selected?.price ?? 0)}
        </p>

        {/* Variant size chips */}
        {variants.length > 1 ? (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {variants.slice(0, 3).map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedId(v.id)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                  v.id === selectedId
                    ? "border-[#7f1416] bg-[#faf5ec] text-[#7f1416]"
                    : "border-[#efe8e4] bg-white text-[#767676] hover:border-[#d4a537]",
                )}
                aria-pressed={v.id === selectedId}
              >
                {v.name}
              </button>
            ))}
          </div>
        ) : null}

        {/* Add to cart — wired */}
        <div className="mt-3">
          {product.inStock && selected ? (
            <AddToCartButton
              key={selected.id}
              variantId={selected.id}
              label="Add"
              icon={<Plus className="size-4" />}
              className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[#7f1416] text-sm font-bold text-white transition-colors hover:bg-[#651013] disabled:opacity-60"
            />
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-[#efe8e4] bg-[#faf5ec] text-sm font-bold text-[#767676] transition-colors hover:border-[#7f1416] hover:text-[#7f1416]"
            >
              View
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
