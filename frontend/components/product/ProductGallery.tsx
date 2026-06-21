"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { resolveProductImageUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: Array<{ url: string; altText: string }>;
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const current = images[active] ?? images[0];
  const currentSrc = resolveProductImageUrl(current?.url);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
    setZoomed(false);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
    setZoomed(false);
  }, [images.length]);

  // Determine if a thumbnail might be a video (for the play icon overlay)
  const isVideoUrl = (url: string) =>
    /\.(mp4|webm|mov)$/i.test(url) || url.includes("video");

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
      {/* ── Vertical thumbnail strip (left side on desktop, bottom on mobile) ── */}
      {images.length > 1 && (
        <div className="order-2 flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:order-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:pb-0">
          {images.slice(0, 6).map((img, idx) => (
            <button
              key={img.url}
              type="button"
              onClick={() => {
                setActive(idx);
                setZoomed(false);
              }}
              className={cn(
                "relative size-[68px] shrink-0 overflow-hidden rounded-xl bg-white ring-2 transition-all duration-200 sm:size-[76px]",
                idx === active
                  ? "ring-[#d4a537] shadow-md"
                  : "ring-transparent opacity-60 hover:opacity-100 hover:ring-[#f5d88e]",
              )}
              aria-label={`View image ${idx + 1}`}
              aria-pressed={idx === active}
            >
              <Image
                src={resolveProductImageUrl(img.url)}
                alt={img.altText}
                fill
                className="object-cover rounded-xl"
                sizes="76px"
              />
              {/* Video play icon overlay */}
              {isVideoUrl(img.url) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                  <div className="flex size-6 items-center justify-center rounded-full bg-white/90">
                    <Play className="size-3 text-[#7f1416] fill-[#7f1416]" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Main image with navigation arrows ── */}
      <div className="order-1 flex-1 lg:order-2">
        <div
          className={cn(
            "group relative aspect-square overflow-hidden rounded-2xl bg-[#faf5ec] cursor-zoom-in",
            zoomed && "cursor-zoom-out",
          )}
          onClick={() => setZoomed((z) => !z)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomed(false)}
          role="img"
          aria-label={current?.altText ?? productName}
        >
          <Image
            src={currentSrc}
            alt={current?.altText ?? productName}
            fill
            priority
            className={cn(
              "object-contain p-4 transition-all duration-500 ease-out select-none sm:p-8",
              zoomed ? "scale-150" : "scale-100 group-hover:scale-[1.03]",
            )}
            style={
              zoomed
                ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                : { transformOrigin: "center center" }
            }
            sizes="(max-width: 768px) 100vw, 55vw"
            draggable={false}
          />

          {/* Navigation arrows */}
          {images.length > 1 && !zoomed && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg sm:size-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5 text-[#333]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg sm:size-10"
                aria-label="Next image"
              >
                <ChevronRight className="size-5 text-[#333]" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
