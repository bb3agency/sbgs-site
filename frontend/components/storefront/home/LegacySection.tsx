import Image from "next/image";
import { ScrollText, Sprout, HeartHandshake } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

const POINTS = [
  { title: "Traditional Recipes", desc: "Passed down for generations", icon: ScrollText },
  { title: "Authentic Ingredients", desc: "Sourced with care", icon: Sprout },
  { title: "Made with Devotion", desc: "For your celebrations", icon: HeartHandshake },
];

export function LegacySection() {
  return (
    <section className="bg-[#faf5ec]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Image */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#efe8e4] shadow-sm">
              <Image
                src="/images/sweets/IMG_20260612_180122.jpg"
                alt="Sweet makers preparing fresh sweets in the kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4a537]">
              Our Legacy
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#7f1416] sm:text-3xl lg:text-4xl">
              A Legacy of Purity &amp; Devotion
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6b5a52] sm:text-base">
              {APP_NAME} is a family legacy built on faith, purity and
              uncompromising quality. Every sweet is crafted with traditional
              recipes, the finest ingredients and lots of devotion.
            </p>
          </div>

          {/* Points */}
          <div className="lg:col-span-3">
            <ul className="space-y-5">
              {POINTS.map(({ title, desc, icon: Icon }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#d4a537] shadow-sm">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#3a2218]">{title}</p>
                    <p className="text-xs text-[#767676]">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
