import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Branches",
  description:
    "Find Sri Sai Baba Ghee Sweets branches near you across Vijayawada — each maintaining our 40-year legacy of purity and taste.",
};

interface Branch {
  name: string;
  area: string;
  timings: string;
  /** Short tag shown as a pill (e.g. Main Branch, Heritage). Optional. */
  tag?: string;
  mapUrl: string;
}

// Uniform branch list — every card renders the exact same fields (tag, name, area,
// timings, Locate). No live map embeds (blocked by CSP + inconsistent); the "Locate"
// button opens the branch on Google Maps.
const BRANCHES: Branch[] = [
  {
    name: "100 Feet Road",
    area: "Auto Nagar, Vijayawada",
    timings: "8:00 AM – 10:00 PM",
    tag: "Main Branch",
    mapUrl:
      "https://www.google.com/maps/place/Sri+sai+baba+Ghee+sweets+and+home+foods/data=!4m2!3m1!1s0x3a35fad96c55b64f:0xc8892b7800bca8f8",
  },
  {
    name: "One Town, Samarang Chowk",
    area: "One Town, Vijayawada",
    timings: "9:00 AM – 10:00 PM",
    tag: "Heritage",
    mapUrl:
      "https://www.google.com/maps/place/Sri+Sai+Baba+ghee+Sweets+and+home+food/data=!4m2!3m1!1s0x3a35eff83caf1a51:0x4c5897db5ec9191b",
  },
  {
    name: "Check Post Centre",
    area: "Auto Nagar Bus Stand, Vijayawada",
    timings: "7:00 AM – 11:00 PM",
    mapUrl:
      "https://www.google.com/maps/place/Sai+Baba+Sweets+%26+Cool+Drinks,+Old+Check+Post+Center/data=!4m2!3m1!1s0x3a35fae0b3d8ee27:0x4392c5d586a3c4",
  },
  {
    name: "Jammichettu Center",
    area: "Moghalraj Puram, Vijayawada",
    timings: "9:30 AM – 10:30 PM",
    mapUrl:
      "https://www.google.com/maps/place/Sri+sai+baba+ghee+sweets+and+home+foods/data=!4m2!3m1!1s0x3a35fb163061d285:0x13742cd6c4080b29",
  },
];

export default function LocationsPage() {
  return (
    <div className="flex flex-col bg-brand-cream min-h-screen pb-16">
      {/* ── Page Header Banner ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-gold/20 py-12 md:py-20">
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            Reach Us At
          </p>
          <h1 className="mb-4 font-heading text-4xl font-bold text-brand-maroon sm:text-5xl md:text-6xl">
            Our Branches
          </h1>

          {/* Decorative divider — gold rules flanking a diamond */}
          <div className="mb-5 flex items-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-brand-gold/60 sm:w-16" />
            <span className="size-2 rotate-45 bg-brand-gold" />
            <span className="h-px w-10 bg-brand-gold/60 sm:w-16" />
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-brand-maroon/70 sm:text-base">
            Visit us across Vijayawada. Every branch carries the same 40-year legacy of
            purity, freshness, and taste.
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-cream/70 px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-maroon">
            <Store className="size-4 text-brand-gold" aria-hidden />
            {BRANCHES.length} branches across Vijayawada
          </span>
        </div>

        {/* Soft ambient glows */}
        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-brand-gold/20 opacity-40 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-16 top-0 size-48 rounded-full bg-card opacity-40 blur-3xl"
          aria-hidden
        />
        {/* Oversized ghost pin anchoring the banner corner */}
        <MapPin
          className="pointer-events-none absolute -bottom-10 left-1/2 hidden size-56 -translate-x-[560px] text-brand-gold/10 lg:block"
          aria-hidden
        />
      </section>

      {/* ── Uniform Branch Grid ─────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:pt-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {BRANCHES.map((branch) => (
            <div
              key={branch.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg motion-safe:hover:-translate-y-1 sm:p-8"
            >
              {/* Gold hairline accent along the top edge */}
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold/0 via-brand-gold/70 to-brand-gold/0"
                aria-hidden
              />

              {/* Ghost map-pin watermark — identical on every card for a uniform look */}
              <MapPin
                className="pointer-events-none absolute -right-6 -top-6 size-32 text-brand-gold/10 transition-transform duration-300 motion-safe:group-hover:scale-110"
                aria-hidden
              />

              <div className="relative z-10">
                {branch.tag ? (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-brand-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-gold">
                    {branch.tag}
                  </span>
                ) : (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-brand-cream px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-maroon/60">
                    Branch
                  </span>
                )}
                <h2 className="font-heading text-2xl font-bold text-brand-maroon sm:text-[28px] sm:leading-snug">
                  {branch.name}
                </h2>

                <div className="mt-4 space-y-2.5">
                  <p className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                      <MapPin className="size-4 text-brand-gold" aria-hidden />
                    </span>
                    {branch.area}
                  </p>
                  <p className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                      <Clock className="size-4 text-brand-gold" aria-hidden />
                    </span>
                    {branch.timings}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-6 border-t border-dashed border-brand-gold/25 pt-5">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Locate ${branch.name} on Google Maps`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-brand-maroon px-5 py-2.5 text-sm font-bold text-brand-cream transition-colors hover:bg-brand-maroon-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                >
                  Locate on Maps
                  <ArrowRight
                    className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Delivery CTA band ───────────────────────────────────────────── */}
      <section className="mx-auto mt-10 w-full max-w-[1440px] px-4 sm:mt-14 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-brand-maroon px-6 py-10 text-center sm:px-10 sm:py-12">
          <MapPin
            className="pointer-events-none absolute -left-8 -top-8 size-40 text-brand-cream/5"
            aria-hidden
          />
          <MapPin
            className="pointer-events-none absolute -bottom-10 -right-8 size-40 text-brand-cream/5"
            aria-hidden
          />
          <p className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            Too far from a branch?
          </p>
          <h2 className="relative z-10 mt-3 font-heading text-2xl font-bold text-brand-cream sm:text-3xl">
            Get the same fresh sweets delivered home
          </h2>
          <p className="relative z-10 mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-cream/80">
            Order online and we will pack your favourites fresh from our kitchens.
          </p>
          <Link
            href="/products"
            className="relative z-10 mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-maroon transition-colors hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-maroon"
          >
            Order Online
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
