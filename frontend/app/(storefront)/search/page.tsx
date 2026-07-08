import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles, ChevronRight, FolderOpen } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { StorefrontPagination } from "@/components/product/StorefrontPagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { NOINDEX_METADATA } from "@/lib/seo";
import { fetchStorefrontProducts } from "@/lib/storefront-products";
import {
  fetchStorefrontCategories,
  getStorefrontCategoryImage,
  normalizeStorefrontSearchQuery,
} from "@/lib/storefront-search";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string; limit?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const q = normalizeStorefrontSearchQuery(params.q ?? "");
  return {
    title: q ? `Results for "${q}"` : "Search Products",
    ...NOINDEX_METADATA,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = normalizeStorefrontSearchQuery(params.q ?? "");
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const limit = Math.min(48, Math.max(1, Number(params.limit ?? "16") || 16));

  const [{ products, meta }, categories] = q
    ? await Promise.all([
        fetchStorefrontProducts({ search: q, page, limit, sort: "newest" }),
        page === 1 ? fetchStorefrontCategories(q) : Promise.resolve([]),
      ])
    : [{ products: [], meta: null }, []];

  const total = meta?.total ?? products.length;
  const totalPages = meta?.totalPages ?? 1;
  const title = q ? `Results for "${q}"` : "Search Products";
  const hasResults = products.length > 0 || categories.length > 0;

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <section className="relative overflow-hidden bg-brand-green py-12 md:py-20">
        <div className="mx-auto flex w-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-10">
          <h1 className="mb-4 font-heading text-3xl font-semibold capitalize text-brand-gold sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <nav
            className="flex items-center gap-2 text-sm font-medium text-text-cream/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-brand-gold">Search</span>
          </nav>
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_60%)]"
          aria-hidden
        />
      </section>

      <section className="mx-auto w-full px-4 pt-12 sm:px-6 lg:px-10">
        <div className="mb-8 sm:mb-10 mx-auto max-w-2xl rounded-3xl bg-card p-3 sm:p-4">
          <SearchInput defaultValue={q} />
        </div>

        {!q ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-card px-4 py-24 text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-brand-gold/15">
              <Search className="size-10 text-brand-gold" aria-hidden />
            </div>
            <h2 className="mb-2 font-heading text-3xl font-semibold text-foreground">
              Start Searching
            </h2>
            <p className="mb-8 text-sm text-muted-foreground max-w-md">
              Search by product name, SKU, or category to find your favourite
              sweets, savories and gift boxes.
            </p>
          </div>
        ) : !hasResults ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-card px-4 py-24 text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-brand-gold/15">
              <Sparkles className="size-10 text-brand-gold" aria-hidden />
            </div>
            <h2 className="mb-2 font-heading text-3xl font-semibold text-foreground">
              No results for &ldquo;{q}&rdquo;
            </h2>
            <p className="mb-8 text-sm text-muted-foreground max-w-md">
              Try checking your spelling, use more general terms, or browse our
              categories.
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-maroon px-8 text-sm font-semibold text-text-cream transition-all hover:-translate-y-0.5 hover:bg-brand-maroon-dark"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {categories.length > 0 ? (
              <section className="rounded-3xl bg-card p-4 lg:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Categories
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">
                    {categories.length} match
                    {categories.length !== 1 ? "es" : ""}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => {
                    const image = getStorefrontCategoryImage(category);
                    return (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="flex items-center gap-3 rounded-2xl border border-border p-3 transition-colors hover:border-brand-maroon hover:bg-brand-cream"
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt=""
                            width={56}
                            height={56}
                            className="size-14 shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
                            <FolderOpen className="size-5 text-brand-maroon" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {category.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Browse category
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {products.length > 0 ? (
              <section className="flex flex-col gap-6">
                <div className="flex justify-between items-center rounded-3xl bg-card p-4 lg:p-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Found {total} product{total !== 1 ? "s" : ""}
                  </p>
                </div>
                <ProductGrid products={products} />
                <StorefrontPagination
                  page={page}
                  totalPages={totalPages}
                  basePath="/search"
                  searchParams={{ q, limit: String(limit) }}
                />
              </section>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
