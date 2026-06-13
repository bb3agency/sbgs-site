import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchStorefrontProducts } from "@/lib/storefront-products";
import { ProductCard } from "@/components/product/ProductCard";

export async function BestsellersSection() {
  const { products } = await fetchStorefrontProducts({
    limit: 10,
    sort: "popularity",
  });

  if (products.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#FAF5EC]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Section title — Dadu's "Curated by Popular Demand" style */}
        <div className="mb-10 text-center lg:mb-14">
          <h2 className="font-heading text-3xl font-medium leading-[1.1] text-[#7F1416] sm:text-4xl lg:text-[4rem]">
            Curated by{" "}
            <em className="font-serif font-normal not-italic text-[#7F1416]/85 italic">
              Popular Demand
            </em>
          </h2>
        </div>

        {/* Product Slider — 3 across on desktop, matching Dadu's layout */}
        <div className="relative flex w-full items-center justify-center">
          {/* Product Grid */}
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
            {products.slice(0, 4).map((product, idx) => (
              <div
                key={product.id}
                className="animate-[fadeInUp_0.6s_ease-out_both]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <ProductCard product={product} priority={idx < 2} />
              </div>
            ))}
          </div>
        </div>

        {/* View All — mobile */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/products?sort=popularity"
            className="group inline-flex h-12 items-center gap-2 bg-[#7F1416] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#601012] hover:shadow-md font-['Montserrat']"
          >
            View All Products
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
