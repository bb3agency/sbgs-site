"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HomeCarouselProps {
  children: React.ReactNode;
  /** Accessible label for the carousel region. */
  label: string;
  /** Extra classes for the scroll track (item widths are set by the children). */
  trackClassName?: string;
  className?: string;
}

/**
 * Generic scroll-snap carousel with the reference design's circular prev/next
 * controls floating on the left/right edges. Server-rendered items are passed
 * as children (children pattern) so product/category data stays on the server.
 */
export function HomeCarousel({ children, label, trackClassName, className }: HomeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByItem = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = item ? item.offsetWidth + 24 : 300;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)} role="group" aria-label={label}>
      <div
        ref={trackRef}
        className={cn(
          "scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4",
          trackClassName,
        )}
      >
        {children}
      </div>

      <div className="pointer-events-none absolute -left-3 -right-3 top-1/2 z-10 hidden -translate-y-1/2 justify-between sm:-left-6 sm:-right-6 sm:flex">
        <button
          type="button"
          onClick={() => scrollByItem(-1)}
          className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-border bg-brand-cream shadow-md transition-colors hover:border-brand-gold hover:bg-brand-gold"
          aria-label={`Previous ${label}`}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByItem(1)}
          className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-border bg-brand-cream shadow-md transition-colors hover:border-brand-gold hover:bg-brand-gold"
          aria-label={`Next ${label}`}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
