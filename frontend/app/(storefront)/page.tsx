import { Suspense } from "react";
import { getStoreCategories } from "@/lib/categories";
import { getPublicStoreConfig } from "@/lib/storefront-settings";
import { APP_NAME } from "@/lib/constants";
import { HeroSection } from "@/components/storefront/home/HeroSection";

import { CategoryCarousel } from "@/components/storefront/home/CategoryCarousel";
import { StorySection } from "@/components/storefront/home/StorySection";
import { WhyChooseBand } from "@/components/storefront/home/WhyChooseBand";
import { BestsellersSection } from "@/components/storefront/home/BestsellersSection";
import { GiftHampersBanner } from "@/components/storefront/home/GiftHampersBanner";
import { BulkGiftingBand } from "@/components/storefront/home/BulkGiftingBand";
import { PincodeServiceabilityBand } from "@/components/storefront/home/PincodeServiceabilityBand";
import { TestimonialsSection } from "@/components/storefront/home/TestimonialsSection";
import { InstagramStrip } from "@/components/storefront/home/InstagramStrip";
import { NewsletterFaqSection } from "@/components/storefront/home/NewsletterFaqSection";

export const metadata = {
  title: `${APP_NAME} — Pure ghee sweets, made for every celebration`,
  description:
    "Traditional pure-ghee sweets and savories handcrafted in fresh small batches with a 40-year legacy of purity. Hygienically packed, delivered across India.",
  openGraph: {
    title: `${APP_NAME} — Made for Every Celebration`,
    description:
      "Premium pure-ghee sweets and savories, crafted with the finest ingredients and delivered fresh to your doorstep.",
    type: "website",
  },
};

function ProductSectionSkeleton() {
  return (
    <section className="mx-auto w-full px-4 py-16 sm:py-24 sm:px-6 lg:px-10">
      <div className="mb-10 h-10 w-2/3 max-w-md animate-pulse rounded-2xl bg-secondary" />
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-[calc(25%-18px)] shrink-0">
            <div className="rounded-2xl bg-card p-4">
              <div className="mb-4 aspect-square animate-pulse rounded-xl bg-secondary" />
              <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-secondary" />
              <div className="mb-4 h-3 w-1/2 animate-pulse rounded bg-secondary" />
              <div className="h-11 animate-pulse rounded-full bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSkeleton() {
  return (
    <section className="mx-auto w-full px-4 py-16 sm:py-24 sm:px-6 lg:px-10">
      <div className="mx-auto mb-12 h-10 w-72 animate-pulse rounded-2xl bg-secondary" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-6 rounded-2xl bg-card p-8">
            <div className="h-4 w-28 animate-pulse rounded bg-secondary" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-secondary" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-secondary" />
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 animate-pulse rounded-full bg-secondary" />
              <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [categories, storeConfig] = await Promise.all([
    getStoreCategories(),
    getPublicStoreConfig(),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />

      <Suspense fallback={<ProductSectionSkeleton />}>
        <BestsellersSection />
      </Suspense>

      <CategoryCarousel categories={categories} />

      <StorySection />
      <WhyChooseBand />

      <GiftHampersBanner />
      <BulkGiftingBand />
      <PincodeServiceabilityBand />

      <Suspense fallback={<TestimonialsSkeleton />}>
        {storeConfig.reviewsEnabled ? <TestimonialsSection /> : null}
      </Suspense>

      <InstagramStrip />
      <NewsletterFaqSection isCodEnabled={storeConfig.isCodEnabled} />
    </div>
  );
}
