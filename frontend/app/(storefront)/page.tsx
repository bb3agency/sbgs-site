import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { getStoreCategories } from "@/lib/categories";
import { HeroSection } from "@/components/storefront/home/HeroSection";
import { CategoryShowcase } from "@/components/storefront/home/CategoryShowcase";
import { GiftBoxesSection } from "@/components/storefront/home/GiftBoxesSection";
import { BestsellersSection } from "@/components/storefront/home/BestsellersSection";
import { InternationalBanner } from "@/components/storefront/home/InternationalBanner";
import { InstagramFeed } from "@/components/storefront/home/InstagramFeed";
import { MithaiStory } from "@/components/storefront/home/MithaiStory";
import { BrandMission } from "@/components/storefront/home/BrandMission";
import { EditorialBlog } from "@/components/storefront/home/EditorialBlog";
import { getPublicStoreConfig } from "@/lib/storefront-settings";

export const metadata = {
  title: "Sri Sai Baba Ghee Sweets — Handcrafted Pure Ghee Sweets & Traditional Mithai",
  description:
    "Premium handcrafted ghee sweets, traditional Indian mithai, and festive gift boxes made with pure desi ghee. No preservatives. Delivered fresh to your doorstep.",
  openGraph: {
    title: "Sri Sai Baba Ghee Sweets — Pure Ghee. Handcrafted Sweets. Timeless Tradition.",
    description:
      "Authentic Indian mithai made with 100% pure desi ghee. No preservatives. Handcrafted with love.",
    type: "website",
  },
};

function ProductSectionSkeleton({
  background = "bg-white",
}: {
  background?: string;
}) {
  return (
    <section className={background}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 h-12 w-2/3 max-w-md animate-pulse rounded-2xl bg-[#fdf0d5]" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[220px] shrink-0">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [categories] = await Promise.all([
    getStoreCategories(),
    getPublicStoreConfig(),
  ]);

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero — "Festive Specials to Timeless Favourites" */}
      <HeroSection />

      {/* 2. Category Grid — Flavours for Every Moment (Swapped from 3rd to 2nd) */}
      <CategoryShowcase categories={categories} />

      {/* 3. Curated by Popular Demand — 4 product cards (Placed in 3rd position) */}
      <Suspense fallback={<ProductSectionSkeleton />}>
        <BestsellersSection />
      </Suspense>

      {/* 4. Worldwide Shipping Banner */}
      <InternationalBanner />

      {/* 5. Brand Story — A Sweetness Perfected Over Time */}
      <MithaiStory />

      {/* 6. Corporate & Wedding Collections — Split Panel */}
      <GiftBoxesSection />

      {/* 7. Social Feed — Follow Us for More Mithai Stories */}
      <InstagramFeed />

      {/* 8. Brand Mission — Mithai That Tells A Story */}
      <BrandMission />

      {/* 9. Blog / Editorial — In the Spotlight */}
      <EditorialBlog />
    </div>
  );
}
