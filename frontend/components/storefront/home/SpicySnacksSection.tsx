import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchStorefrontProducts } from "@/lib/storefront-products";
import { HomeCarousel } from "./HomeCarousel";
import { HomeProductCard } from "./HomeProductCard";
import { BestsellersParallax } from "./BestsellersParallax";

const SPICY_CATEGORIES = ["Kaaralu", "Kaaram", "Podulu"];

export async function SpicySnacksSection() {
  const { products } = await fetchStorefrontProducts({ limit: 100 });

  const spicyProducts = products.filter((product) =>
    product.category?.name && SPICY_CATEGORIES.includes(product.category.name)
  );

  if (spicyProducts.length === 0) return null;

  return (
    <BestsellersParallax>
      <section className="mx-auto w-full overflow-hidden px-4 py-12 sm:px-6 sm:py-24 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Authentic Spicy Savouries
          </h2>
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-maroon px-6 py-2.5 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-cream"
          >
            View All Products
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <HomeCarousel label="spicy snacks">
          {spicyProducts.map((product) => (
            <div
              key={product.id}
              data-carousel-item
              className="w-[80%] shrink-0 snap-start sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
            >
              <HomeProductCard product={product} priority={false} />
            </div>
          ))}
        </HomeCarousel>
      </section>
    </BestsellersParallax>
  );
}
