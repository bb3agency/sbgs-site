"use client";

import { Users, Star, MapPin, MessageSquare } from "lucide-react";
import {
  clampReviewRating,
  formatReviewerInitials,
  formatReviewerName,
} from "@/lib/review-display";
import type { StorefrontReview } from "@/lib/storefront-reviews";
import { OrnamentHeading } from "./OrnamentHeading";
import { Stagger, StaggerItem } from "@/components/shared/motion/Stagger";

interface SocialProofSectionProps {
  reviews: StorefrontReview[];
}

const STATS = [
  { value: "1M+", label: "Happy Customers", icon: Users },
  { value: "4.8", label: "Average Rating", icon: Star },
  { value: "50+", label: "Cities Delivered", icon: MapPin },
  { value: "10K+", label: "Reviews", icon: MessageSquare },
];

const MEDIA = ["The Hindu", "Times of India", "Outlook", "BusinessLine"];

const FALLBACK_TESTIMONIALS: Array<{ name: string; quote: string; rating: number }> = [
  {
    name: "Priya Sharma",
    quote:
      "The taste, the quality and the packaging — everything is perfect. Our go-to for every celebration!",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    quote:
      "Ordered a festive box for our office. Everyone loved it! Excellent service and timely delivery.",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    quote:
      "Pure ghee taste you can literally feel. Authentic and absolutely delicious.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < count
              ? "size-3.5 fill-[#d4a537] text-[#d4a537]"
              : "size-3.5 text-[#e3d5b8]"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}

export function SocialProofSection({ reviews }: SocialProofSectionProps) {
  const testimonials =
    reviews.length >= 3
      ? reviews.slice(0, 3).map((r) => ({
          name: formatReviewerName(r.author),
          initials: formatReviewerInitials(r.author),
          quote: r.body?.trim() ?? "",
          rating: clampReviewRating(r.rating) || 5,
        }))
      : FALLBACK_TESTIMONIALS.map((t) => ({
          ...t,
          initials: t.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
        }));

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <OrnamentHeading
          lead="Loved by Thousands,"
          accent="Trusted by Millions"
          className="mb-10"
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-5 lg:col-span-2">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col gap-1">
                <Icon className="size-5 text-[#d4a537]" aria-hidden />
                <span className="font-heading text-xl font-bold text-[#7f1416]">
                  {value}
                </span>
                <span className="text-[11px] font-medium text-[#767676]">{label}</span>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <Stagger className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {testimonials.map((t, idx) => (
              <StaggerItem
                as="article"
                key={t.name + t.quote.slice(0, 12)}
                index={idx}
                className="flex flex-col gap-3 rounded-2xl border border-[#efe8e4] bg-[#faf7f2] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a537] hover:shadow-lg"
              >
                <Stars count={t.rating} />
                <p className="flex-1 text-sm leading-relaxed text-[#3a2218]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-[#efe8e4] pt-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#f5d88e] font-heading text-sm font-bold text-[#7f1416]">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#3a2218]">{t.name}</p>
                    <p className="text-[11px] text-[#767676]">Verified Buyer</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* As Featured In */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#767676] lg:text-right">
              As Featured In
            </p>
            <div className="grid grid-cols-2 gap-3">
              {MEDIA.map((name) => (
                <div
                  key={name}
                  className="flex h-14 items-center justify-center rounded-xl border border-[#efe8e4] bg-white px-3 text-center font-heading text-sm font-bold text-[#7f1416]"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
