"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api";
import { mapProductListResponse } from "@/lib/product-adapters";
import type { CategoryWithMeta } from "@/lib/categories";
import type { Product } from "@/types/product";

interface CategoryDropdownProps {
  /** The parent category displayed as the nav link */
  parent: CategoryWithMeta;
  /** Subcategories that belong to this parent */
  subcategories: CategoryWithMeta[];
  /** Whether this nav link is currently active */
  active: boolean;
}

/**
 * A single parent category nav link with a hover dropdown showing its subcategories.
 * Hovering a subcategory shows a nested flyout with its products.
 */
export function CategoryDropdown({
  parent,
  subcategories,
  active,
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const clearSubTimer = useCallback(() => {
    if (subTimerRef.current) {
      clearTimeout(subTimerRef.current);
      subTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredSub(null);
    }, 200);
  }, [clearCloseTimer]);

  const handleSubEnter = useCallback(
    (slug: string) => {
      clearSubTimer();
      subTimerRef.current = setTimeout(() => {
        setHoveredSub(slug);
      }, 120);
    },
    [clearSubTimer],
  );

  const handleSubLeave = useCallback(() => {
    clearSubTimer();
    subTimerRef.current = setTimeout(() => {
      setHoveredSub(null);
    }, 150);
  }, [clearSubTimer]);

  // Fetch products for a subcategory on hover
  useEffect(() => {
    if (!hoveredSub || products[hoveredSub] || loading[hoveredSub]) return;

    setLoading((prev) => ({ ...prev, [hoveredSub]: true }));

    apiClient<unknown>(
      `/products/categories/${encodeURIComponent(hoveredSub)}/products?limit=20&sort=newest&inStock=false`,
    )
      .then((payload) => {
        const mapped = mapProductListResponse(payload);
        setProducts((prev) => ({ ...prev, [hoveredSub]: mapped }));
      })
      .catch(() => {
        setProducts((prev) => ({ ...prev, [hoveredSub]: [] }));
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, [hoveredSub]: false }));
      });
  }, [hoveredSub, products, loading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (subTimerRef.current) clearTimeout(subTimerRef.current);
    };
  }, []);

  // If no subcategories, render a plain link (no dropdown)
  if (subcategories.length === 0) {
    return (
      <Link
        href={`/categories/${parent.slug}`}
        className={cn(
          "relative pb-1 transition-colors hover:text-brand-maroon",
          active &&
            "text-brand-maroon after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-maroon",
        )}
      >
        {parent.name}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger — parent category link */}
      <Link
        href={`/categories/${parent.slug}`}
        className={cn(
          "relative inline-flex items-center gap-1 pb-1 transition-colors hover:text-brand-maroon",
          active &&
            "text-brand-maroon after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-maroon",
        )}
      >
        {parent.name}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </Link>

      {/* Subcategory dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div className="min-w-[220px] rounded-xl border border-border/60 bg-brand-cream shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-2">
            {/* View all link */}
            <Link
              href={`/categories/${parent.slug}`}
              className="flex items-center px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-brand-maroon/5 hover:text-brand-maroon"
            >
              All {parent.name}
            </Link>
            <div className="mx-3 my-1 h-px bg-border/50" />

            {subcategories.map((sub) => (
              <div
                key={sub.id}
                className="relative"
                onMouseEnter={() => handleSubEnter(sub.slug)}
                onMouseLeave={handleSubLeave}
              >
                <Link
                  href={`/categories/${sub.slug}`}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-brand-maroon/5 hover:text-brand-maroon",
                    hoveredSub === sub.slug &&
                      "bg-brand-maroon/5 text-brand-maroon",
                  )}
                >
                  <span>{sub.name}</span>
                  <ChevronRight className="size-3.5 opacity-40" aria-hidden />
                </Link>

                {/* Nested product flyout */}
                {hoveredSub === sub.slug && (
                  <div className="absolute left-full top-0 z-50 pl-1.5">
                    <div 
                      className="min-w-[200px] max-w-[260px] rounded-xl border border-border/60 bg-brand-cream shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-2"
                      onMouseEnter={() => {
                        clearSubTimer();
                        clearCloseTimer();
                      }}
                      onMouseLeave={() => {
                        handleSubLeave();
                        handleMouseLeave();
                      }}
                    >
                      {loading[sub.slug] ? (
                        <div className="flex items-center justify-center px-4 py-4">
                          <div className="size-4 animate-spin rounded-full border-2 border-brand-maroon/30 border-t-brand-maroon" />
                        </div>
                      ) : products[sub.slug]?.length ? (
                        products[sub.slug].map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="block truncate px-4 py-2 text-sm text-foreground transition-colors hover:bg-brand-maroon/5 hover:text-brand-maroon"
                            title={product.name}
                          >
                            {product.name}
                          </Link>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-xs text-muted-foreground">
                          No products yet
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
