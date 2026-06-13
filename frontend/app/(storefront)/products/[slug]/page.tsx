import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ChevronRight, Leaf, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { apiClient } from "@/lib/api";
import { mapProduct } from "@/lib/product-adapters";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductVariantSelector } from "@/components/product/ProductVariantSelector";
import { ProductReviewsSection } from "@/components/product/ProductReviewsSection";
import { ProductViewTracker } from "@/components/shared/ProductViewTracker";
import { ProductDetailTabs } from "@/components/product/ProductDetailTabs";
import { RelatedProductsSection } from "@/components/product/RelatedProductsSection";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { PoliciesSection } from "@/components/product/PoliciesSection";
import { FreeDeliveryMarquee } from "@/components/product/FreeDeliveryMarquee";
import { getPublicStoreConfig } from "@/lib/storefront-settings";
import { STOREFRONT_URL } from "@/lib/constants";
import type { Product } from "@/types/product";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  try {
    const payload = await apiClient<unknown>(`/products/${slug}`);
    const product = mapProduct(payload);
    const image = product?.images[0];
    return {
      title: product?.name ?? "Product",
      description: product?.description ?? "",
      openGraph: image
        ? { images: [{ url: image.url, alt: image.altText }] }
        : undefined,
    };
  } catch {
    return { title: "Product not found" };
  }
}

function RelatedSkeleton() {
  return (
    <div className="mt-8 px-4 lg:px-0">
      <div className="mb-6 h-7 w-48 animate-pulse rounded-lg bg-[#f0e8e0]" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-[200px] shrink-0">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  let product: Product | null = null;

  try {
    const payload = await apiClient<unknown>(`/products/${slug}`);
    product = mapProduct(payload);
  } catch {
    notFound();
  }

  if (!product) notFound();

  const activeVariant =
    product.variants.find((v) => v.isActive) ?? product.variants[0];
  const storeConfig = await getPublicStoreConfig();
  const productUrl = `${STOREFRONT_URL}/products/${product.slug}`;

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <ProductViewTracker productId={product.id} productName={product.name} />

      {/* ── Breadcrumb ───────────────────────────────────────────────────────── */}
      <nav
        className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-[#8c7b6b] sm:px-6 sm:py-4 lg:px-8"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-[#6B1D2A]">
          Home
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/products" className="transition-colors hover:text-[#6B1D2A]">
          Shop
        </Link>
        <ChevronRight className="size-3" />
        <Link
          href={`/categories/${product.category.slug}`}
          className="transition-colors hover:text-[#6B1D2A]"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="size-3" />
        <span className="font-semibold text-[#6B1D2A]">{product.name}</span>
      </nav>

      {/* ── Main product section ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[55%_45%] lg:gap-12">
          {/* Gallery */}
          <div className="overflow-hidden rounded-2xl bg-[#f5ebe0]">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-0">
            {/* Product name */}
            <h1 className="font-serif text-2xl font-bold uppercase leading-tight tracking-wide text-[#6B1D2A] sm:text-3xl lg:text-[2.5rem]">
              {product.name}
            </h1>

            {/* Price + Variant + CTA — all handled by the client component */}
            <ProductVariantSelector product={product} defaultVariant={activeVariant} />

            {/* ── Brand story section ─────────────────────────────── */}
            <div className="mt-8 rounded-2xl border border-[#ece3d8] bg-[#fdf8f3] p-5 sm:p-7">
              <h3 className="font-serif text-lg italic text-[#6B1D2A] sm:text-xl">
                Sri Sai Baba&apos;s Signature
              </h3>
              <h2 className="mt-1 font-serif text-xl font-bold text-[#3a2218] sm:text-2xl">
                {product.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6b5c50]">
                {product.description || "Handcrafted with 100% pure desi ghee and the finest natural ingredients, following time-honored traditional recipes passed down through generations."}
              </p>
            </div>

            {/* Trust signals — 2x2 grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
              {[
                { icon: Leaf, title: "100% Pure", subtitle: "Vegetarian" },
                { icon: Sparkles, title: "Natural", subtitle: "Ingredients" },
                { icon: ShieldCheck, title: "No Added", subtitle: "Preservatives" },
                { icon: Truck, title: "Shipping", subtitle: "and Safety Assured" },
              ].map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f5ebe0]">
                    <Icon className="size-5 text-[#6B1D2A]" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#3a2218] sm:text-sm">{title}</p>
                    <p className="text-[10px] text-[#8c7b6b] sm:text-xs">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Description Tabs ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        <ProductDetailTabs
          description={product.description}
          tags={product.tags}
          categoryName={product.category.name}
          categorySlug={product.category.slug}
        />
      </section>

      {/* ── You will love these too ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<RelatedSkeleton />}>
          <RelatedProductsSection
            categorySlug={product.category.slug}
            currentProductId={product.id}
            title="You will love these too"
            subtitle=""
          />
        </Suspense>
      </section>

      {/* ── FREE DELIVERY marquee ────────────────────────────────────────────── */}
      <FreeDeliveryMarquee />

      {/* ── Our Policies ─────────────────────────────────────────────────────── */}
      <PoliciesSection />

      {/* ── Reviews ──────────────────────────────────────────────────────────── */}
      {storeConfig.reviewsEnabled ? (
        <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <ProductReviewsSection productSlug={product.slug} />
        </section>
      ) : null}
    </div>
  );
}
