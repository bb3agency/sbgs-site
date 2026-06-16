"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { BestsellerCard } from "./BestsellerCard";

interface BestsellerCarouselProps {
  products: Product[];
}

const BADGES = ["Bestseller", "Bestseller", "Bestseller", "Bestseller", "Best for Gifting"];

export function BestsellerCarousel({ products }: BestsellerCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 20
      : 260;
    el.scrollBy({
      left: dir === "right" ? cardWidth * 2 : -cardWidth * 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#efe8e4] bg-white text-[#7f1416] shadow-md transition-colors hover:border-[#d4a537] hover:text-[#d4a537] md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#efe8e4] bg-white text-[#7f1416] shadow-md transition-colors hover:border-[#d4a537] hover:text-[#d4a537] md:flex"
        aria-label="Scroll right"
      >
        <ChevronRight className="size-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="w-[calc(50%-10px)] shrink-0 sm:w-[240px] lg:w-[calc(20%-16px)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <BestsellerCard
              product={product}
              priority={i < 5}
              badge={BADGES[i % BADGES.length]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
