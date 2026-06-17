import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { HeroSection } from "@/components/storefront/home/HeroSection";
import { BestsellersSection } from "@/components/storefront/home/BestsellersSection";
import { ShopByCategory } from "@/components/storefront/home/ShopByCategory";
import { InternationalBanner } from "@/components/storefront/home/InternationalBanner";
import { GiftBoxesSection } from "@/components/storefront/home/GiftBoxesSection";
import { WhyChooseSection } from "@/components/storefront/home/WhyChooseSection";
import { OccasionCollections } from "@/components/storefront/home/OccasionCollections";
import { DeliveryServiceability } from "@/components/storefront/home/DeliveryServiceability";
import { LegacySection } from "@/components/storefront/home/LegacySection";
import { InstagramFeed } from "@/components/storefront/home/InstagramFeed";
import { SocialProofSection } from "@/components/storefront/home/SocialProofSection";
import { EditorialBlog } from "@/components/storefront/home/EditorialBlog";
import { BrandMission } from "@/components/storefront/home/BrandMission";
import { ValuePillars } from "@/components/storefront/home/ValuePillars";
import { FarmProcess } from "@/components/storefront/home/FarmProcess";
import { MithaiStory } from "@/components/storefront/home/MithaiStory";
import { FaqSection } from "@/components/storefront/home/FaqSection";
import { NewsletterCTA } from "@/components/storefront/home/NewsletterCTA";
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
        <div className="mx-auto mb-10 h-9 w-2/3 max-w-md animate-pulse rounded-xl bg-[#faf5ec]" />
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
      {/* 1. Hero */}
      <HeroSection />

      {/* Brand Mission */}
      <BrandMission />

      {/* 2. Curated by Popular Demand — bestsellers (wired Add) */}
      <Suspense fallback={<BestsellersSkeleton />}>
        <BestsellersSection />
      </Suspense>

      {/* 3. Flavours for Every Moment — categories (sage band) */}
      <ShopByCategory />

      {/* 4. From You, to Anywhere in the World — international */}
      <InternationalBanner />

      {/* 5. Corporate & Wedding Collections */}
      <GiftBoxesSection />

      {/* 6. Crafted with Devotion — why choose us */}
      <WhyChooseSection />

      {/* Value Pillars */}
      <ValuePillars />

      {/* Farm Process */}
      <FarmProcess isCodEnabled={storeConfig.isCodEnabled} />

      {/* 7. Collections for Every Occasion */}
      <OccasionCollections />

      {/* 8. Check Delivery & Serviceability */}
      <DeliveryServiceability />

      {/* 9. Our Legacy */}
      <LegacySection />

      {/* Mithai Story */}
      <MithaiStory />

      {/* 10. Follow Us For More Mithai Stories */}
      <InstagramFeed />

      {/* 11. Loved by Thousands — stats, testimonials, Featured In */}
      <SocialProofSection reviews={storeConfig.reviewsEnabled ? reviews : []} />

      {/* 12. Sri Sai Baba in the Spotlight — editorial */}
      <EditorialBlog />

      {/* FAQ Section */}
      <FaqSection isCodEnabled={storeConfig.isCodEnabled} />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
}
