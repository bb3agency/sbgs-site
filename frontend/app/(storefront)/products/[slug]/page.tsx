import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, Sparkles, Package, ChevronRight } from "lucide-react";
import { apiClient } from "@/lib/api";
import { mapProduct } from "@/lib/product-adapters";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductVariantSelector } from "@/components/product/ProductVariantSelector";
import { ProductReviewsSection } from "@/components/product/ProductReviewsSection";
import { ProductViewTracker } from "@/components/shared/ProductViewTracker";
import { ProductShareMenu } from "@/components/product/ProductShareMenu";
import { StickyAddToCartBar } from "@/components/product/StickyAddToCartBar";
import { RelatedProductsSection } from "@/components/product/RelatedProductsSection";
import { ViewersAlsoLikedSection } from "@/components/product/ViewersAlsoLikedSection";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
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
    <div className="mt-6 rounded-[20px] bg-card px-5 py-7 shadow-sm sm:mt-8 sm:px-8 sm:py-9">
      <div className="mb-6 h-7 w-48 animate-pulse rounded-lg bg-secondary" />
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

  const firstImage = product.images[0];
  const imageSrc = firstImage?.url ?? "/images/product-placeholder.svg";

  const hasDiscount =
    typeof activeVariant?.compareAtPrice === "number" &&
    activeVariant.compareAtPrice > activeVariant.price;

  return (
    <div className="min-h-screen bg-[#fdfbf7] pb-24">
      <ProductViewTracker productId={product.id} productName={product.name} />

      {/* Sticky bar — appears when CTA scrolls out of view */}
      {product.inStock && activeVariant ? (
        <StickyAddToCartBar
          productName={product.name}
          productImage={imageSrc}
          imageAlt={firstImage?.altText ?? product.name}
          price={activeVariant.price}
          compareAtPrice={hasDiscount ? (activeVariant.compareAtPrice ?? undefined) : undefined}
          variantId={activeVariant.id}
          inStock={product.inStock}
        />
      ) : null}

      <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground sm:mb-8 sm:gap-2 sm:text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-brand-maroon">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/products" className="transition-colors hover:text-brand-maroon">
            Sweets
          </Link>
          <ChevronRight className="size-3" />
          <Link
            href={`/categories/${product.category.slug}`}
            className="transition-colors hover:text-brand-maroon"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="size-3" />
          <span className="truncate font-semibold text-foreground">{product.name}</span>
        </nav>

        {/* --- Main product grid --- */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:gap-16">

          {/* --- LEFT COLUMN: Gallery + About --- */}
          <div className="flex flex-col gap-6">
            {/* Gallery */}
            <div className="min-w-0">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* About this product */}
            <div className="rounded-[20px] bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="size-5 text-brand-maroon" aria-hidden />
                <h3 className="text-base font-bold text-foreground">About this product</h3>
              </div>
              {product.description ? (
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4">
                {[
                  { icon: "🚫", text: "No Preservatives" },
                  { icon: "⭐", text: "Finest Ingredients" },
                  { icon: "📦", text: "Hygienically Packed" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className="text-sm" aria-hidden>{icon}</span>
                    <span className="text-xs font-semibold text-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Info panel --- */}
          <section className="flex min-w-0 flex-col gap-5">
            {/* Category badge + Share */}
            <div className="flex items-start justify-between">
              <Link
                href={`/categories/${product.category.slug}`}
                className="w-fit rounded-sm bg-brand-maroon/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-brand-maroon hover:bg-brand-maroon/15 transition-colors"
              >
                {product.category.name}
              </Link>
              <ProductShareMenu productName={product.name} productUrl={productUrl} />
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">
              {product.name}
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-1">
                <span className="size-1.5 rotate-45 bg-brand-gold" />
                <span className="size-1.5 rotate-45 bg-brand-maroon" />
                <span className="size-1.5 rotate-45 bg-brand-gold" />
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Price + variant selector + CTAs */}
            <ProductVariantSelector product={product} defaultVariant={activeVariant} />

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3 rounded-[16px] border border-border bg-card p-4 sm:grid-cols-4 sm:gap-4 sm:p-5">
              {[
                { icon: Sparkles, title: "Made Fresh", subtitle: "On order" },
                { icon: ShieldCheck, title: "Premium Quality", subtitle: "Finest ingredients" },
                { icon: Package, title: "Secure Packaging", subtitle: "Hygienically packed" },
                { icon: Truck, title: "Delivery Across India", subtitle: "Pan India delivery" },
              ].map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand-maroon" aria-hidden />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">{title}</span>
                    <span className="text-[11px] text-muted-foreground">{subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- You may also like --- */}
        <Suspense fallback={<RelatedSkeleton />}>
          <RelatedProductsSection
            categorySlug={product.category.slug}
            currentProductId={product.id}
          />
        </Suspense>

        {/* --- Viewers also liked --- */}
        <Suspense fallback={<RelatedSkeleton />}>
          <ViewersAlsoLikedSection currentProductId={product.id} />
        </Suspense>

        {/* --- Reviews --- */}
        {storeConfig.reviewsEnabled ? (
          <div className="mt-6 sm:mt-8">
            <ProductReviewsSection productSlug={product.slug} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
