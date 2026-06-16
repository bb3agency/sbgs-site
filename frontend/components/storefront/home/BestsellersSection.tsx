import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchStorefrontProducts } from "@/lib/storefront-products";
import { BestsellerCarousel } from "./BestsellerCarousel";

export async function BestsellersSection() {
  const { products } = await fetchStorefrontProducts({
    limit: 10,
    sort: "popularity",
  });

  if (products.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#3a2218] sm:text-3xl">
            <span className="text-[#7f1416]">Bestsellers</span> — Curated for You
          </h2>
          <Link
            href="/products?sort=popularity"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-bold text-[#7f1416] transition-colors hover:text-[#d4a537] sm:flex"
          >
            View all bestsellers
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <BestsellerCarousel products={products.slice(0, 10)} />
      </div>
    </section>
  );
}
