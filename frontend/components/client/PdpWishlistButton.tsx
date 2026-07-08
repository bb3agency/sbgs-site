"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlist";
import { useAuthStore } from "@/stores/auth";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlist-api";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PdpWishlistButtonProps {
  productId: string;
}

export function PdpWishlistButton({ productId }: PdpWishlistButtonProps) {
  const items = useWishlistStore((s) => s.items);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const accessToken = useAuthStore((s) => s.accessToken);
  const [animating, setAnimating] = useState(false);

  const isWished = items.has(productId);

  const handleToggle = async () => {
    const next = !isWished;
    toggleItem(productId, next);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    try {
      if (next && accessToken) {
        await addToWishlist(productId, accessToken);
      } else if (!next && accessToken) {
        await removeFromWishlist(productId, accessToken);
      }
    } catch {
      // Revert on failure
      toggleItem(productId, !next);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border-2 transition-all duration-200 sm:size-11",
        isWished
          ? "border-[#e74c6f] bg-[#fef2f5] text-[#e74c6f]"
          : "border-[#e8e0d8] bg-card text-[#ccc] hover:border-[#e74c6f] hover:text-[#e74c6f]",
        animating && "scale-125",
      )}
    >
      <Heart
        className={cn("size-5 transition-all", isWished && "fill-[#e74c6f]")}
      />
    </button>
  );
}
