import Link from "next/link";
import { Star } from "lucide-react";
import {
  clampReviewRating,
  formatReviewerInitials,
  formatReviewerName,
} from "@/lib/review-display";
import { fetchStorefrontRecentReviews } from "@/lib/storefront-reviews";

/**
 * "Loved by Thousands" — real approved customer reviews rendered in the
 * reference testimonial card style (stars, quote, avatar initials + name).
 */
export async function TestimonialsSection() {
  const { reviews } = await fetchStorefrontRecentReviews(3);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full px-4 py-16 sm:py-24 sm:px-6 lg:px-10">
      <h2 className="mb-12 text-center font-heading text-4xl font-semibold text-foreground sm:text-5xl">
        Loved by Thousands
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => {
          const name = formatReviewerName(review.author);
          const initials = formatReviewerInitials(review.author);
          const productLabel = review.productName ?? "Verified purchase";
          const stars = clampReviewRating(review.rating);
          const quote = review.body?.trim() ?? "";

          return (
            <article
              key={review.id}
              className="flex h-full flex-col gap-6 rounded-2xl bg-card p-8"
            >
              {stars > 0 ? (
                <div
                  className="flex gap-0.5 text-brand-gold"
                  aria-label={`${stars} out of 5 stars`}
                >
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="size-[18px] fill-current" aria-hidden />
                  ))}
                </div>
              ) : null}

              <p className="flex-1 italic leading-relaxed text-foreground/90">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="mt-auto flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-brand-gold-light font-heading text-lg font-semibold text-brand-maroon">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-foreground">{name}</h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {review.productSlug ? (
                      <Link
                        href={`/products/${review.productSlug}`}
                        className="transition-colors hover:text-brand-maroon"
                      >
                        {productLabel}
                      </Link>
                    ) : (
                      productLabel
                    )}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
