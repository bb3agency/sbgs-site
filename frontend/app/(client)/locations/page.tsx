import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  Navigation,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Branches",
  description:
    "Find Sri Sai Baba Ghee Sweets branches near you across Vijayawada — each maintaining our 40-year legacy of purity and taste. Or order online for doorstep delivery.",
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
    <div className="flex min-h-screen flex-col bg-brand-cream pb-16">
      {/* ── Order Online — deliberately ABOVE the branches banner ─────────────
          Most visitors reach this page from a shared maps/social link, so the
          conversion path has to be the first thing on screen rather than sitting
          below four branch cards. ------------------------------------------- */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:pt-8 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-brand-maroon shadow-lg">
          {/* Ghost pins + soft glow for depth, purely decorative */}
          <MapPin
            className="pointer-events-none absolute -left-10 -top-12 size-48 text-brand-cream/[0.06]"
            aria-hidden
          />
          <MapPin
            className="pointer-events-none absolute -bottom-16 right-4 size-52 text-brand-cream/[0.06]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-brand-gold/20 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                <Truck className="size-3.5" aria-hidden />
                Delivered across India
              </span>

              <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-brand-cream sm:text-4xl lg:text-[44px]">
                Order our sweets online
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-brand-cream/85 sm:text-base">
                Can&apos;t make it to a branch? Shop the same ghee sweets, savouries and
                festive gift boxes — packed fresh from our kitchens and delivered to
                your door.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-gold px-7 text-sm font-bold text-brand-maroon transition-colors hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-maroon"
                >
                  <ShoppingBag className="size-4" aria-hidden />
                  Order Online
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <a
                  href="#branches"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-brand-cream/30 px-6 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream"
                >
                  <MapPin className="size-4" aria-hidden />
                  Or visit a branch
                </a>
              </div>
            </div>

            {/* Trust strip — reads as a column on desktop, wraps inline on mobile */}
            <ul className="flex shrink-0 flex-wrap gap-x-6 gap-y-3 border-t border-brand-cream/15 pt-5 text-xs font-medium text-brand-cream/80 lg:flex-col lg:gap-3 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 lg:text-sm">
              <li className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-cream/10">
                  <ShoppingBag className="size-4 text-brand-gold" aria-hidden />
                </span>
                Packed fresh to order
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-cream/10">
                  <Truck className="size-4 text-brand-gold" aria-hidden />
                </span>
                Pan-India shipping
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-cream/10">
                  <Clock className="size-4 text-brand-gold" aria-hidden />
                </span>
                40 years of pure ghee
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Branches banner ──────────────────────────────────────────────── */}
      <section
        id="branches"
        className="relative mt-10 scroll-mt-24 overflow-hidden bg-brand-gold/20 py-10 md:mt-14 md:py-14"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 text-center lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">
            Reach Us At
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-brand-maroon sm:text-4xl md:text-5xl">
            Our Branches
          </h2>

          <div className="mt-4 flex items-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-brand-gold/60 sm:w-16" />
            <span className="size-2 rotate-45 bg-brand-gold" />
            <span className="h-px w-10 bg-brand-gold/60 sm:w-16" />
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-maroon/70 sm:text-base">
            {BRANCHES.length} stores across Vijayawada. Every branch carries the same
            40-year legacy of purity, freshness, and taste.
          </p>
        </div>

        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-brand-gold/20 opacity-40 blur-3xl"
          aria-hidden
        />
      </section>

      {/* ── Branch grid ──────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:pt-10 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {BRANCHES.map((branch) => (
            <div
              key={branch.name}
              className="group relative flex flex-col overflow-hidden rounded-[22px] border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg motion-safe:hover:-translate-y-1 sm:p-6"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold/0 via-brand-gold/70 to-brand-gold/0"
                aria-hidden
              />
              <MapPin
                className="pointer-events-none absolute -right-5 -top-5 size-24 text-brand-gold/10 transition-transform duration-300 motion-safe:group-hover:scale-110"
                aria-hidden
              />

              <div className="relative z-10 flex-1">
                <span
                  className={
                    branch.tag
                      ? "inline-flex w-fit rounded-full bg-brand-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-gold"
                      : "inline-flex w-fit rounded-full bg-brand-cream px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-maroon/60"
                  }
                >
                  {branch.tag ?? "Branch"}
                </span>

                <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-brand-maroon sm:text-xl">
                  {branch.name}
                </h3>

                <div className="mt-3 space-y-2">
                  <p className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" aria-hidden />
                    {branch.area}
                  </p>
                  <p className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                    <Clock className="size-4 shrink-0 text-brand-gold" aria-hidden />
                    {branch.timings}
                  </p>
                </div>
              </div>

              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${branch.name} on Google Maps`}
                className="relative z-10 mt-5 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-brand-maroon px-4 text-[13px] font-bold text-brand-cream transition-colors hover:bg-brand-maroon-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              >
                <Navigation className="size-4" aria-hidden />
                Get directions
              </a>
            </div>
          ))}
        </div>

        {/* Closing helper line — keeps the page from ending on a hard grid edge */}
        <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-[13px] text-muted-foreground">
          <Phone className="size-4 text-brand-gold" aria-hidden />
          Planning a bulk or festive order? Call the branch nearest to you, or
          <Link
            href="/products"
            className="font-semibold text-brand-maroon underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-maroon-dark"
          >
            order online
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
