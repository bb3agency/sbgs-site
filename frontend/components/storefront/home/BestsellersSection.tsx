import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchStorefrontProducts } from "@/lib/storefront-products";
import { HomeCarousel } from "./HomeCarousel";
import { HomeProductCard } from "./HomeProductCard";

/** "Our Bestsellers, Loved by All" — real popularity-sorted catalogue products. */
export async function BestsellersSection() {
  const { products } = await fetchStorefrontProducts({
    limit: 10,
    sort: "popularity",
  });

  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full px-4 py-16 sm:py-24 sm:px-6 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Our Bestsellers, Loved by All
        </h2>
        <Link
          href="/products?sort=popularity"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-maroon px-6 py-2.5 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-cream"
        >
          View All Products
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <HomeCarousel label="bestselling products">
        {products.map((product, i) => (
          <div
            key={product.id}
            data-carousel-item
            className="w-[80%] shrink-0 snap-start sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
          >
            <HomeProductCard product={product} priority={i < 4} />
          </div>
        ))}
      </HomeCarousel>
    </section>
  );
}
