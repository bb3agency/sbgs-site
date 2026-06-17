import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchStorefrontProducts } from "@/lib/storefront-products";
import { BestsellerCarousel } from "./BestsellerCarousel";
import { OrnamentHeading } from "./OrnamentHeading";

export async function BestsellersSection() {
  const { products } = await fetchStorefrontProducts({
    limit: 10,
    sort: "popularity",
  });

  if (products.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <OrnamentHeading
          lead="Curated by"
          accent="Popular Demand"
          className="mb-10"
        />
        <BestsellerCarousel products={products.slice(0, 10)} />
        <div className="mt-8 text-center">
          <Link
            href="/products?sort=popularity"
            className="group inline-flex items-center gap-1.5 border-b border-[#7f1416]/30 pb-1 text-sm font-bold uppercase tracking-[0.15em] text-[#7f1416] transition-colors hover:border-[#7f1416] hover:text-[#d4a537]"
          >
            View all bestsellers
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
