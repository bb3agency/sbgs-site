import Link from "next/link";
import { Suspense } from "react";
import { SlidersHorizontal, ChevronRight, Sparkles, ChevronDown, ChevronUp, Search } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PlpSortSelect } from "@/components/product/PlpSortSelect";
import { PlpSearchInput } from "@/components/product/PlpSearchInput";
import { StorefrontPagination } from "@/components/product/StorefrontPagination";
import { getStoreCategories } from "@/lib/categories";
import { cn } from "@/lib/utils";
import {
  fetchStorefrontCategoryProducts,
  type StorefrontProductSort,
} from "@/lib/storefront-products";

const VALID_SORTS = new Set<StorefrontProductSort>(["newest", "popularity", "price_asc", "price_desc"]);

interface CategoryProductsPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; limit?: string; sort?: string; q?: string }>;
}

function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: CategoryProductsPageProps) {
  const { slug } = await params;
  const name = formatCategoryName(slug);
  return { title: `${name} — Pure Ghee Sweets` };
}

export default async function CategoryProductsPage({
  params,
  searchParams,
}: CategoryProductsPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const page = Math.max(1, Number(query.page ?? "1") || 1);
  const limit = Math.min(48, Math.max(1, Number(query.limit ?? "16") || 16));
  const sort: StorefrontProductSort = VALID_SORTS.has(query.sort as StorefrontProductSort)
    ? (query.sort as StorefrontProductSort)
    : "newest";
  const categoryName = formatCategoryName(slug);
  const q = query.q ?? "";

  const [productsData, categories] = await Promise.all([
    fetchStorefrontCategoryProducts(slug, {
      page,
      limit,
      sort,
    }),
    getStoreCategories(),
  ]);

  const currentCategory = categories.find((c) => c.slug === slug);
  const hasUploadedImage = currentCategory?.image && currentCategory.image !== "/images/product-placeholder.svg";

  const { products, meta } = productsData;
  const total = meta?.total ?? products.length;
  const totalPages = meta?.totalPages ?? 1;

  const sortLabel = sort === "newest" ? "Newest" 
                  : sort === "popularity" ? "Popularity" 
                  : sort === "price_asc" ? "Price: Low to High" 
                  : "Price: High to Low";

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfbf7] pb-24">
      {/* ── Page header — dynamic background ─────── */}
      <section 
        className="relative overflow-hidden py-14 text-left"
        style={
          hasUploadedImage
            ? { backgroundImage: `url(${currentCategory.image})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { backgroundColor: "#244f3d" }
        }
      >
        {hasUploadedImage && (
          <div className="absolute inset-0 bg-black/60 z-0" />
        )}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <nav
            className="mb-6 flex items-center gap-2 text-sm font-medium text-text-cream/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <ChevronRight className="size-3" aria-hidden />
            <Link href="/products" className="transition-colors hover:text-brand-gold">
              Shop
            </Link>
            <ChevronRight className="size-3" aria-hidden />
            <span className="capitalize text-brand-gold">
              {categoryName}
            </span>
          </nav>
          
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Made with Pure Ghee
          </p>
          
          <h1 className="mt-3 font-heading text-4xl font-semibold capitalize text-brand-gold sm:text-5xl lg:text-[56px] lg:leading-tight">
            {categoryName}
          </h1>
          
          <p className="mt-4 max-w-xl text-[13px] font-medium text-text-cream/80">
            {total > 0
              ? `${total} active product${total !== 1 ? "s" : ""}`
              : "Products in this category will appear when marked Active in admin"}
          </p>
        </div>

        {/* Decorative illustration pattern on the right */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[600px] opacity-80 lg:block">
          <div className="absolute inset-0 bg-[url('/images/hero-ornament.svg')] bg-cover bg-right bg-no-repeat mix-blend-overlay opacity-30" />
        </div>
      </section>

      {/* ── Main content layout with sidebar ─────────────────────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-8 px-4 pt-10 sm:px-6 lg:flex-row lg:px-10 lg:pt-12">
        
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-[260px] xl:w-[280px]">
          <div className="rounded-[24px] bg-[#fdfcf9] border border-border p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-foreground">Filter by</h2>
              <SlidersHorizontal className="size-[15px] text-foreground" strokeWidth={2.5} />
            </div>

            {/* Categories list */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between cursor-pointer">
                <h3 className="text-[13px] font-bold text-foreground">Categories</h3>
                <ChevronUp className="size-[15px] text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-3.5">
                <Link
                  href="/products"
                  className="group flex items-center gap-3"
                >
                  <div className="flex size-4 items-center justify-center rounded-full border border-muted-foreground/30 transition-colors group-hover:border-brand-maroon/50">
                  </div>
                  <span className="text-[13px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    All Sweets
                  </span>
                </Link>
                
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="group flex items-center gap-3"
                  >
                    <div className={cn(
                      "flex size-4 items-center justify-center rounded-full border transition-colors",
                      slug === cat.slug ? "border-brand-maroon" : "border-muted-foreground/30 group-hover:border-brand-maroon/50"
                    )}>
                      {slug === cat.slug ? <div className="size-2 rounded-full bg-brand-maroon" /> : null}
                    </div>
                    <span className={cn(
                      "text-[13px] transition-colors",
                      slug === cat.slug ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* End of sidebar */}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Top search bar area */}
          <div className="mb-8 flex items-center gap-4">
            <PlpSearchInput placeholder={`Search in ${categoryName}...`} basePath={`/categories/${slug}`} />
            
            {/* Filter button for mobile/extra actions */}
            <button className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-[#521b1b] text-white shadow-sm transition-transform hover:bg-brand-maroon-dark hover:scale-105">
              <SlidersHorizontal className="size-[20px]" strokeWidth={2} />
            </button>
          </div>

          {/* Results count & inline sort */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-[13px] font-semibold text-muted-foreground">
              Showing {Math.min(total, limit)} of {total} products
            </p>
            
            <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
              Sort by:
              <span className="flex items-center gap-1.5 font-bold text-foreground cursor-pointer">
                {sortLabel} <ChevronDown className="size-3.5" />
              </span>
            </div>
          </div>

          {/* Active filters display */}
          {(q) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Search:
              </span>
              {q && (
                <Link
                  href={`/categories/${slug}?${new URLSearchParams({ sort }).toString()}`}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-brand-maroon hover:text-brand-maroon"
                >
                  {q} ×
                </Link>
              )}
            </div>
          )}

          {/* Products grid or empty state */}
          {products.length > 0 ? (
            <>
              <ProductGrid products={products} />
              <StorefrontPagination
                page={page}
                totalPages={totalPages}
                basePath={`/categories/${slug}`}
                searchParams={{ sort, q, limit: String(limit) }}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-white px-4 py-28 text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-brand-maroon/5">
                <Sparkles className="size-10 text-brand-maroon" aria-hidden />
              </div>
              <h2 className="mb-3 font-heading text-3xl font-semibold text-foreground">
                No products in this category yet
              </h2>
              <p className="mb-8 max-w-md text-sm text-muted-foreground">
                Active products assigned to this category in admin will show up here.
              </p>
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#521b1b] px-8 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Browse all sweets
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
