"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileFiltersProps {
  categories: { id: string; slug: string; name: string; parentId?: string | null }[];
}

export function MobileFilters({ categories }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const activeCategory = searchParams.get("category") || "";

  useEffect(() => {
    setOpen(false);
  }, [searchParams, pathname]);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex lg:hidden h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-[#521b1b] bg-white text-foreground shadow-sm transition-colors hover:border-brand-maroon hover:text-brand-maroon"
        aria-label="Filters"
      >
        <SlidersHorizontal className="size-[18px] text-[#8a7a6a]" strokeWidth={2.5} />
      </button>

      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200" 
          onClick={() => setOpen(false)}
        >
          <div 
            className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-[24px] bg-[#fdfcf9] p-6 shadow-xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[17px] font-bold font-heading text-foreground">Filter by</h2>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 transition-colors hover:bg-muted text-muted-foreground">
                <X className="size-5" />
              </button>
            </div>
            
            <div>
              <h3 className="mb-4 text-[13px] font-bold text-foreground">Categories</h3>
              <div className="flex flex-col gap-3.5">
                <Link
                  href={`${pathname}?${createQueryString("category", "")}`}
                  className="group flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <div className={cn(
                    "flex size-4 items-center justify-center rounded-full border transition-colors",
                    !activeCategory ? "border-brand-maroon" : "border-muted-foreground/30 group-hover:border-brand-maroon/50"
                  )}>
                    {!activeCategory ? <div className="size-2 rounded-full bg-brand-maroon" /> : null}
                  </div>
                  <span className={cn(
                    "text-[13px] transition-colors",
                    !activeCategory ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    All Sweets
                  </span>
                </Link>
                
                {categories.filter(cat => !cat.parentId).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`${pathname}?${createQueryString("category", cat.slug)}`}
                    className="group flex items-center gap-3"
                    onClick={() => setOpen(false)}
                  >
                    <div className={cn(
                      "flex size-4 items-center justify-center rounded-full border transition-colors",
                      activeCategory === cat.slug ? "border-brand-maroon" : "border-muted-foreground/30 group-hover:border-brand-maroon/50"
                    )}>
                      {activeCategory === cat.slug ? <div className="size-2 rounded-full bg-brand-maroon" /> : null}
                    </div>
                    <span className={cn(
                      "text-[13px] transition-colors",
                      activeCategory === cat.slug ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
