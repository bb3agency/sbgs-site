import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  fetchStorefrontProducts,
  prioritizeFeaturedProducts,
} from "@/lib/storefront-products";
import { HomeCarousel } from "./HomeCarousel";
import { HomeProductCard } from "./HomeProductCard";

/**
 * "Fresh From Our Kitchen" — newest active products, with merchant-featured
 * items pulled to the front (reference: premium sites lead with new/seasonal).
 */
export async function NewArrivalsSection() {
  const { products } = await fetchStorefrontProducts({ limit: 10, sort: "newest" });
  const items = prioritizeFeaturedProducts(products, 10);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Freshly made
          </p>
          <h2 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Fresh From Our Kitchen
          </h2>
        </div>
        <Link
          href="/products?sort=newest"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-maroon px-6 py-2.5 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-cream"
        >
          View All
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <HomeCarousel label="new arrivals">
        {items.map((product, i) => (
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
