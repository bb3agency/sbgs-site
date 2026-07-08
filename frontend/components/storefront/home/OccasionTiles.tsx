import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * "Shop by Occasion" — gifting is the top revenue lever for mithai D2C. Tiles
 * deep-link to the catalogue (search-filtered) so they work today and get
 * sharper as the merchant tags products for each occasion.
 */
const OCCASIONS = [
  { title: "Weddings", blurb: "Grand trays & bulk boxes", href: "/products?q=box", tint: "bg-cat-maroon" },
  { title: "Festivals", blurb: "Diwali, Sankranti & more", href: "/products?sort=popularity", tint: "bg-cat-amber" },
  { title: "Corporate Gifting", blurb: "Branded premium hampers", href: "/products?q=gift", tint: "bg-cat-olive" },
  { title: "Return Gifts", blurb: "Small packs, big delight", href: "/products?sort=price_asc", tint: "bg-cat-rust" },
];

export function OccasionTiles() {
  return (
    <section className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
          Gifting made sweet
        </p>
        <h2 className="mx-auto max-w-2xl font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Shop by Occasion
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {OCCASIONS.map((occ) => (
          <Link
            key={occ.title}
            href={occ.href}
            className={`group flex min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl ${occ.tint} p-6 text-text-cream transition-transform hover:-translate-y-1`}
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold">{occ.title}</h3>
              <p className="mt-1 text-sm text-text-cream/80">{occ.blurb}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-cream transition-all group-hover:gap-2.5">
              Explore
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
