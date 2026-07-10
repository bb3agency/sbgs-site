import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

/** Real SBGS kitchen photography (public/images/sweets). */
const COLLAGE_IMAGES = [
  { src: "/images/sweets/IMG_20260612_163129.jpg", alt: "Freshly prepared ghee sweets" },
  { src: "/images/sweets/IMG_20260612_164305.jpg", alt: "Traditional sweets arranged for packing" },
  { src: "/images/sweets/IMG_20260612_165401.jpg", alt: "Assorted pure ghee sweets" },
  { src: "/images/sweets/IMG_20260612_170752.jpg", alt: "Handcrafted sweets from our kitchen" },
];

/** "Our Story of Purity" — Staggered photo collage beside a deep-green panel. */
export function StorySection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:py-20 sm:px-6 lg:px-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        
        {/* Modern Staggered Collage */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 pt-10 sm:gap-6 sm:pt-16">
            <div className="group relative aspect-square overflow-hidden rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[0].src}
                alt={COLLAGE_IMAGES[0].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[1].src}
                alt={COLLAGE_IMAGES[1].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[2].src}
                alt={COLLAGE_IMAGES[2].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[3].src}
                alt={COLLAGE_IMAGES[3].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Elegant Green Panel */}
        <div className="relative flex flex-col items-start justify-center overflow-hidden rounded-[2.5rem] bg-brand-green px-8 py-16 text-text-cream sm:px-12 lg:px-16 lg:py-24 shadow-lg">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06)_0%,transparent_60%)]"
            aria-hidden
          />
          <div className="mb-8 flex items-center gap-3 text-brand-gold" aria-hidden>
            <span className="h-px w-12 bg-brand-gold/60" />
            <Sparkle className="size-3.5 fill-current" />
            <span className="h-px w-12 bg-brand-gold/60" />
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-[3.25rem]">
            Our Story of Purity
            <br />
            in Every Sweet
          </h2>
          <p className="mt-6 max-w-[420px] text-lg font-medium opacity-90 leading-relaxed text-[#e6ece9]">
            Handcrafted with love, our sweets are made from the finest
            ingredients to bring you unmatched taste in every bite.
          </p>
          <Link
            href="/about"
            className="mt-12 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-cream px-8 text-[15px] font-bold text-brand-green transition-all hover:scale-105 hover:bg-white hover:shadow-md"
          >
            Explore Our Story
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
