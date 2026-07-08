import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StorefrontPaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== "page") params.set(key, value);
    }
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function StorefrontPagination({
  page,
  totalPages,
  basePath,
  searchParams,
}: StorefrontPaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  // Generate page numbers with ellipsis
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Product pagination"
    >
      <Link
        href={buildHref(basePath, prevPage, searchParams)}
        aria-disabled={page <= 1}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand-maroon hover:text-brand-maroon",
          page <= 1 && "pointer-events-none opacity-40",
        )}
        aria-label="Previous page"
      >
        <ArrowLeft className="size-4" aria-hidden />
      </Link>

      <div className="mx-2 flex items-center gap-1">
        {getPages().map((p, i) => {
          if (p === "...") {
            return (
              <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">
                ...
              </span>
            );
          }
          
          const isCurrent = p === page;
          return (
            <Link
              key={p}
              href={buildHref(basePath, p as number, searchParams)}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                isCurrent
                  ? "bg-brand-maroon text-text-cream shadow-sm"
                  : "text-foreground hover:bg-brand-maroon/10 hover:text-brand-maroon",
              )}
              aria-current={isCurrent ? "page" : undefined}
            >
              {p}
            </Link>
          );
        })}
      </div>

      <Link
        href={buildHref(basePath, nextPage, searchParams)}
        aria-disabled={page >= totalPages}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand-maroon hover:text-brand-maroon",
          page >= totalPages && "pointer-events-none opacity-40",
        )}
        aria-label="Next page"
      >
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </nav>
  );
}
