import { SectionHeading } from "./SectionHeading";

export function TestimonialsSectionSkeleton() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="From verified buyers"
          title="Trusted by families who actually read the label."
          description="Loading the latest approved customer reviews…"
          align="center"
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
        />
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-5 rounded-3xl border border-brand-maroon/8 bg-card p-6 sm:p-7"
            >
              <div className="h-11 w-11 animate-pulse rounded-2xl bg-brand-cream" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-brand-cream" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-brand-cream" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-brand-cream" />
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <div className="size-11 animate-pulse rounded-full bg-brand-cream" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-brand-cream" />
                  <div className="h-3 w-32 animate-pulse rounded bg-brand-cream" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
