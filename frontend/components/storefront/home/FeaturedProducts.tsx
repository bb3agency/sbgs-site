import {
  fetchStorefrontProducts,
  prioritizeFeaturedProducts,
} from "@/lib/storefront-products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "./SectionHeading";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export async function FeaturedProducts() {
  const { products } = await fetchStorefrontProducts({
    limit: 8,
    sort: "newest",
  });

  const items = prioritizeFeaturedProducts(products, 8);

  if (items.length === 0) {
    return (
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow=""
            title="Sweets to savour, snacks to share"
            description="Our latest sweet creations will appear here once they are prepared."
            cta={{ label: "Browse catalogue", href: "/products" }}
            className="mb-10"
          />
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[#D4A537]/40 bg-[#fdf8f3] py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#fdf0d5] text-[#6B1D2A]">
              <Sparkles className="size-7" aria-hidden />
            </div>
            <div className="max-w-sm">
              <p className="font-heading text-lg font-bold text-[#6B1D2A]">
                Fresh sweets arriving soon
              </p>
              <p className="mt-2 text-sm text-[#767676]">
                Active products published from the admin catalogue will appear
                here automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow=""
          title="Sweets to savour, snacks to share"
          description="Hand-selected by our halwais — our signature sweets, seasonal specials, and festive staples."
          className="mb-10 lg:mb-12"
          align="center"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
          {items.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center lg:mt-16">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#6B1D2A] px-8 text-sm font-bold text-white transition-colors hover:bg-[#6B1D2A]/90"
          >
            Shop all sweets
          </Link>
        </div>
      </div>
    </section>
  );
}
