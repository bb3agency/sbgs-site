import Link from "next/link";
import { Suspense } from "react";
import { Sparkles, SlidersHorizontal, ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PlpSortSelect } from "@/components/product/PlpSortSelect";
import { StorefrontPagination } from "@/components/product/StorefrontPagination";
import {
  fetchStorefrontProducts,
  type StorefrontProductSort,
} from "@/lib/storefront-products";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sort?: string;
    q?: string;
    category?: string;
  }>;
}

export const metadata = {
  title: "Shop Handcrafted Sweets",
  description:
    "Browse our full range of handcrafted desi ghee sweets, traditional mithai, and everyday indulgences.",
};

const VALID_SORTS = new Set<StorefrontProductSort>([
  "newest",
  "popularity",
  "price_asc",
  "price_desc",
]);

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const limit = Math.min(48, Math.max(1, Number(params.limit ?? "16") || 16));
  const sort = VALID_SORTS.has(params.sort as StorefrontProductSort)
    ? (params.sort as StorefrontProductSort)
    : "newest";
  const q = params.q ?? "";
  const category = params.category ?? "";

  const { products, meta } = await fetchStorefrontProducts({
    page,
    limit,
    sort,
    search: q || undefined,
    category: category || undefined,
  });

  const title = q
    ? `Results for "${q}"`
    : category
      ? category.replace(/-/g, " ")
      : "Shop All Products";

  const totalPages = meta?.totalPages ?? 1;
  const totalProducts = meta?.total ?? products.length;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF5EC] pb-16">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#7F1416] py-12 md:py-20">
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          {/* Label chip */}
          <span className="mb-4 inline-flex items-center gap-1.5 border border-[#D4A537]/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#D4A537] font-['Montserrat']">
            <Sparkles className="size-3" aria-hidden />
            100% Natural
          </span>

          <h1 className="mb-3 font-serif text-3xl font-normal capitalize text-[#FAF5EC] sm:mb-4 sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {/* Breadcrumb */}
          <nav
            className="mb-6 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#FAF5EC]/60 sm:gap-2 sm:text-sm font-['Montserrat'] uppercase"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-[#D4A537]">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#D4A537]">
              {q ? "Search" : category ? category.replace(/-/g, " ") : "Shop"}
            </span>
          </nav>

          {/* Stats strip */}
          {totalProducts > 0 && (
            <div className="flex items-center gap-6 sm:gap-10 mt-4">
              {[
                { value: `${totalProducts}+`, label: "Products" },
                { value: "100%", label: "Pure Ghee" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-xl font-normal text-[#FAF5EC] sm:text-2xl italic">{value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FAF5EC]/60 font-['Montserrat']">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Controls Bar ──────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:pt-10 lg:px-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 border border-[#7F1416]/10 bg-white px-4 py-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4">
          {/* Results count */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-[#7F1416]/70 font-['Montserrat'] uppercase tracking-wider font-semibold">
              {products.length > 0 ? (
                <>
                  <span className="font-extrabold text-[#7F1416]">{products.length}</span>
                  {" "}product{products.length !== 1 ? "s" : ""}
                </>
              ) : (
                <span className="text-[#7F1416]/50">No products found</span>
              )}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#7F1416] font-['Montserrat']">
              <SlidersHorizontal className="size-3.5 text-[#D4A537]" aria-hidden />
              Sort
            </span>
            <Suspense
              fallback={
                <div className="h-9 w-40 animate-pulse bg-[#FAF5EC]" />
              }
            >
              <PlpSortSelect current={sort} />
            </Suspense>
          </div>
        </div>

        {/* Active filters */}
        {(q || category) && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#7F1416]/50 font-['Montserrat']">Active filters:</span>
            {q && (
              <Link
                href={`/products?${new URLSearchParams({ sort, category }).toString()}`}
                className="flex items-center gap-1.5 border border-[#7F1416]/20 bg-white px-3 py-1 text-xs font-semibold text-[#7F1416] transition-colors hover:border-[#D4A537] hover:text-[#D4A537] font-['Montserrat']"
              >
                Search: {q} ×
              </Link>
            )}
            {category && (
              <Link
                href={`/products?${new URLSearchParams({ sort, q }).toString()}`}
                className="flex items-center gap-1.5 border border-[#7F1416]/20 bg-white px-3 py-1 text-xs font-semibold text-[#7F1416] transition-colors hover:border-[#D4A537] hover:text-[#D4A537] font-['Montserrat']"
              >
                {category.replace(/-/g, " ")} ×
              </Link>
            )}
            <Link
              href="/products"
              className="text-xs font-bold text-[#D4A537] transition-colors hover:underline uppercase font-['Montserrat'] tracking-wide"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* Products grid or empty state */}
        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <StorefrontPagination
              page={page}
              totalPages={totalPages}
              basePath="/products"
              searchParams={{ sort, q, category, limit: String(limit) }}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-[#D4A537]/50 bg-white px-4 py-28 text-center shadow-sm">
            <h2 className="mb-3 font-serif text-2xl font-normal text-[#7F1416]">
              {q ? "No products matched your search" : "No active products yet"}
            </h2>
            <p className="mb-8 max-w-md text-sm font-medium text-[#7F1416]/70 font-['Montserrat']">
              {q
                ? "Try checking your spelling or use more general terms."
                : "Add products in the admin console and set their status to Active — they will show up here automatically."}
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center bg-[#7F1416] px-8 text-sm font-bold uppercase tracking-widest text-[#FAF5EC] transition-all hover:bg-[#D4A537] font-['Montserrat']"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
