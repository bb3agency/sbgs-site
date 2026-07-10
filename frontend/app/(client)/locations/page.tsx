import type { Metadata } from "next";
import { ArrowRight, MapPin, Clock } from "lucide-react";

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
      <section className="relative overflow-hidden bg-brand-gold/20 py-10 md:py-16">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
            Reach Us At
          </p>
          <h1 className="mb-3 font-heading text-3xl font-bold text-brand-maroon sm:mb-4 sm:text-4xl md:text-5xl">
            Our Branches
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-brand-maroon/70 sm:text-base">
            Visit us across Vijayawada. Every branch carries the same 40-year legacy of
            purity, freshness, and taste.
          </p>
        </div>
        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-brand-gold/20 opacity-40 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-16 top-0 size-48 rounded-full bg-card opacity-40 blur-3xl"
          aria-hidden
        />
      </section>

      {/* ── Uniform Branch Grid ─────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:pt-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {BRANCHES.map((branch) => (
            <div
              key={branch.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
            >
              {/* Ghost map-pin watermark — identical on every card for a uniform look */}
              <MapPin
                className="pointer-events-none absolute -right-6 -top-6 size-32 text-brand-gold/10"
                aria-hidden
              />

              <div className="relative z-10">
                {branch.tag ? (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-brand-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-gold">
                    {branch.tag}
                  </span>
                ) : (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-brand-cream px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-maroon/60">
                    Branch
                  </span>
                )}
                <h2 className="font-heading text-xl font-bold text-brand-maroon sm:text-2xl">
                  {branch.name}
                </h2>
                <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" aria-hidden />
                  {branch.area}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4 shrink-0 text-brand-gold" aria-hidden />
                  {branch.timings}
                </p>
              </div>

              <div className="relative z-10 mt-6">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-maroon px-4 py-2 text-sm font-bold text-brand-cream transition-colors hover:bg-brand-maroon/90"
                >
                  Locate on Maps
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
