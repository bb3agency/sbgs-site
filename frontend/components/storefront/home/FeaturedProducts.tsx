import {
  fetchStorefrontProducts,
  prioritizeFeaturedProducts,
} from "@/lib/storefront-products";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { SectionHeading } from "./SectionHeading";
import { Sparkles } from "lucide-react";

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
            eyebrow="Curated for you"
            title="Featured sweets & boxes."
            description="Fresh products from our active catalogue will appear here as new batches are prepared."
            cta={{ label: "Browse catalogue", href: "/products" }}
            className="mb-10"
          />
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[#f5d88e] bg-[#faf5ec] py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f5d88e] text-[#7f1416]">
              <Sparkles className="size-7" aria-hidden />
            </div>
            <div className="max-w-sm">
              <p className="font-heading text-lg font-bold text-[#7f1416]">
                Fresh batches arriving soon
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
          eyebrow="Curated for you"
          title="Bestsellers, freshly made."
          description="Hand-selected favourites — traditional sweets, ghee specials, and festive gift boxes worth celebrating with."
          cta={{ label: "Shop all products", href: "/products" }}
          className="mb-10 lg:mb-12"
        />
        <ProductCarousel products={items} />
      </div>
    </section>
  );
}
