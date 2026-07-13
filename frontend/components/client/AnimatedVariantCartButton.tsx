"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Loader2, X } from "lucide-react";
import { addCartItem } from "@/lib/cart-api";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { getApiErrorMessage } from "@/lib/error-messages";
import { toast } from "@/lib/toast";
import { trackEvent } from "@/lib/analytics";
import type { ProductVariant } from "@/types/product";

const DoubleChevron = ({ index, color }: { index: number; color: string }) => {
  const base = index * 0.12;
  const dots = [
    { cx: 2, cy: 2, d: 0 },
    { cx: 5, cy: 5, d: 0.05 },
    { cx: 8, cy: 8, d: 0.1 },
    { cx: 5, cy: 11, d: 0.15 },
    { cx: 2, cy: 14, d: 0.2 },
    { cx: 6, cy: 2, d: 0.05 },
    { cx: 9, cy: 5, d: 0.1 },
    { cx: 12, cy: 8, d: 0.15 },
    { cx: 9, cy: 11, d: 0.2 },
    { cx: 6, cy: 14, d: 0.25 },
  ];
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" className="shrink-0 overflow-visible">
      <g fill={color}>
        {dots.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="1"
            className="bd-dot"
            style={{ animationDelay: `${base + p.d}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

interface AnimatedVariantCartButtonProps {
  variants: ProductVariant[];
  className?: string;
}

export function AnimatedVariantCartButton({ variants, className }: AnimatedVariantCartButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmittingId, setIsSubmittingId] = useState<string | null>(null);
  
  const accessToken = useAuthStore((s) => s.accessToken);
  const setCart = useCartStore((s) => s.setCart);
  const markPendingMerge = useCartStore((s) => s.markPendingMerge);

  // Click outside to close
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleAdd = async (variantId: string) => {
    try {
      setIsSubmittingId(variantId);
      const cart = await addCartItem({ variantId, quantity: 1 }, accessToken);
      setCart(cart);
      trackEvent("ADD_TO_CART", { variantId, quantity: 1 });
      if (!accessToken) {
        markPendingMerge();
      }
      toast.success("Added to cart");
      setIsExpanded(false);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setIsSubmittingId(null);
    }
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (variants.length === 1) {
      handleAdd(variants[0].id);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  // Amber variant from user prompt logic for the hover wave
  const v = { from: "#ffd66e", to: "#f5a82e", dot: "#3a210a" };
  
  return (
    <div ref={containerRef} className={cn("relative flex w-full h-11", className)}>
      <style>{`
        @keyframes bd-dot-wave {
          0%, 65%, 100% { opacity: 0.3; transform: translateX(0) scale(0.8); }
          32% { opacity: 1; transform: translateX(0.5px) scale(1.08); }
        }
        .bd-dot {
          transform-box: fill-box;
          transform-origin: center;
          animation: bd-dot-wave 1.8s cubic-bezier(0.45,0.05,0.55,0.95) infinite;
        }
        .bd-root:hover .bd-dot,
        .bd-root:focus-visible .bd-dot {
          animation-duration: 0.95s;
        }
        @media (prefers-reduced-motion: reduce) {
          .bd-dot { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
      
      {/* Unexpanded Button */}
      <button
        type="button"
        onClick={handleMainClick}
        disabled={isSubmittingId !== null}
        className={cn(
          "group/btn bd-root absolute inset-0 w-full inline-flex rounded-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isExpanded ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 active:scale-[0.97]"
        )}
        style={{
          background: "linear-gradient(180deg, #b11f35 0%, #8e192a 100%)", // Brand maroon
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.15)",
        }}
        aria-expanded={isExpanded}
      >
        <span className="absolute inset-0 flex justify-center items-center text-text-cream font-semibold text-[14px] tracking-tight">
          {isSubmittingId !== null && variants.length === 1 ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Add to Cart"
          )}
        </span>
      </button>

      {/* Expanded Variant List */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-between rounded-full bg-brand-cream border border-border overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
          isExpanded ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="flex w-full h-full divide-x divide-border overflow-x-auto scrollbar-hide">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={(e) => { e.preventDefault(); handleAdd(variant.id); }}
              disabled={isSubmittingId === variant.id}
              className="flex-1 min-w-[3.5rem] flex items-center justify-center text-xs font-bold text-brand-maroon hover:bg-brand-gold/20 transition-colors px-2 relative"
            >
              {isSubmittingId === variant.id ? (
                <Loader2 className="size-4 animate-spin text-brand-maroon" />
              ) : (
                variant.name.replace("Default", "Add")
              )}
            </button>
          ))}
        </div>
        
        {/* Close Button */}
        <button
          onClick={(e) => { e.preventDefault(); setIsExpanded(false); }}
          className="shrink-0 flex items-center justify-center h-full px-3 text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors border-l border-border"
          aria-label="Close variant selection"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
