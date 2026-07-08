"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Loader2, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useWishlistStore } from "@/stores/wishlist";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { getWishlist, type WishlistItem } from "@/lib/wishlist-api";
import { getApiErrorMessage } from "@/lib/error-messages";
import { ProductCard } from "@/components/product/ProductCard";

function WishlistEmpty({
  title,
  description,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-gold/50 bg-brand-cream px-6 py-20 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
        <Heart className="size-7" aria-hidden />
      </div>
      <h3 className="font-heading text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-maroon px-7 py-3 text-sm font-semibold text-text-cream transition-colors hover:bg-brand-maroon-dark"
      >
        {ctaLabel}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

export default function WishlistPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const { wishlistEnabled } = useStoreConfig();
  // The store's Set of saved product ids drives which fetched items stay visible,
  // so un-hearting a card (ProductCard toggles the store) removes it instantly.
  const savedIds = useWishlistStore((s) => s.items);

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!accessToken || !wishlistEnabled) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getWishlist(accessToken, { limit: 100 });
        if (!cancelled) setItems(data.items);
      } catch (err) {
        if (!cancelled) setError(getApiErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [accessToken, wishlistEnabled]);

  const visibleItems = useMemo(
    () => items.filter((item) => savedIds.has(item.product.id)),
    [items, savedIds],
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            My Wishlist
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {visibleItems.length > 0
              ? `${visibleItems.length} saved item${visibleItems.length === 1 ? "" : "s"}`
              : "Save your favourite sweets to find them here."}
          </p>
        </div>
        <Link
          href="/products"
          className="hidden shrink-0 items-center gap-1.5 rounded-full border border-brand-maroon px-5 py-2.5 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-cream sm:inline-flex"
        >
          Continue Shopping
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      {!wishlistEnabled ? (
        <WishlistEmpty
          title="Wishlist is currently unavailable"
          description="Saved items aren't available right now. Browse our sweets and add them to your cart instead."
          ctaLabel="Browse Sweets"
        />
      ) : loading ? (
        <div className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-brand-maroon" aria-hidden />
          Loading your saved items…
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
          <p className="text-sm font-medium text-destructive">{error}</p>
        </div>
      ) : visibleItems.length === 0 ? (
        <WishlistEmpty
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it here for later."
          ctaLabel="Explore Sweets"
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
}
