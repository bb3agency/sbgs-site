import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CategoryWithMeta } from "@/lib/categories";
import { SectionHeading } from "./SectionHeading";

interface CategoryShowcaseProps {
  categories: CategoryWithMeta[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories?.length) return null;

  const featured = categories.slice(0, 3);

  return (
    <section className="bg-brand-cream">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Shop by category"
          title="Sweets for every occasion."
          description="From everyday ghee sweets to festive gift boxes and corporate hampers — explore a range made fresh and packed with care."
          cta={{ label: "View full catalogue", href: "/products" }}
          className="mb-10 lg:mb-12"
        />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl bg-brand-maroon p-6 text-white shadow-[0_24px_50px_-24px_rgba(35,64,61,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(35,64,61,0.55)] sm:p-7 lg:p-8"
            >
              {/* Background image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Overlay */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-brand-maroon/85 via-brand-maroon/55 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-maroon/90 to-transparent"
              />

              {/* Top label */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-card/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="font-mono">0{idx + 1}</span>
                  Category
                </span>
                <span className="flex size-10 items-center justify-center rounded-full bg-card text-brand-maroon transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              {/* Bottom content */}
              <div className="relative z-10 mt-auto flex flex-col gap-3">
                <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {cat.name}
                </h3>
                <p className="max-w-xs text-sm text-white/85">
                  Made fresh in pure ghee, elegantly packed, and delivered across India.
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Explore category
                  <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
