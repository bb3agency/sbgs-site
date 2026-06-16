import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { HeroSection } from "@/components/storefront/home/HeroSection";
import { BestsellersSection } from "@/components/storefront/home/BestsellersSection";
import { ShopByCategory } from "@/components/storefront/home/ShopByCategory";
import { WhyChooseSection } from "@/components/storefront/home/WhyChooseSection";
import { OccasionCollections } from "@/components/storefront/home/OccasionCollections";
import { DeliveryServiceability } from "@/components/storefront/home/DeliveryServiceability";
import { LegacySection } from "@/components/storefront/home/LegacySection";
import { SocialProofSection } from "@/components/storefront/home/SocialProofSection";
import { fetchStorefrontRecentReviews } from "@/lib/storefront-reviews";
import { getPublicStoreConfig } from "@/lib/storefront-settings";

export const metadata = {
  title: "Sri Sai Baba Ghee Sweets — Pure ghee sweets, made for celebrations",
  description:
    "Traditional Indian sweets and premium gift boxes crafted in pure ghee. Fresh batches every day, secure payments, and pan-India delivery from Sri Sai Baba Ghee Sweets.",
  openGraph: {
    title: "Sri Sai Baba Ghee Sweets — Pure Ghee Goodness, Made for Celebrations",
    description:
      "Traditional sweets and festive gifting crafted with devotion in pure ghee. Fresh daily, delivered across India.",
    type: "website",
  },
};

function BestsellersSkeleton() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-8 h-9 w-2/3 max-w-md animate-pulse rounded-xl bg-[#faf5ec]" />
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[240px] shrink-0">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [{ reviews }, storeConfig] = await Promise.all([
    fetchStorefrontRecentReviews(3),
    getPublicStoreConfig(),
  ]);

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero with trust strip */}
      <HeroSection />

      {/* 2. Bestsellers — Curated for You */}
      <Suspense fallback={<BestsellersSkeleton />}>
        <BestsellersSection />
      </Suspense>

      {/* 3. Shop by Category */}
      <ShopByCategory />

      {/* 4. Why Choose Us */}
      <WhyChooseSection />

      {/* 5. Collections for Every Occasion */}
      <OccasionCollections />

      {/* 6. Check Delivery & Serviceability */}
      <DeliveryServiceability />

      {/* 7. Our Legacy */}
      <LegacySection />

      {/* 8. Loved by Thousands — social proof */}
      {storeConfig.reviewsEnabled ? (
        <SocialProofSection reviews={reviews} />
      ) : (
        <SocialProofSection reviews={[]} />
      )}
    </div>
  );
}
