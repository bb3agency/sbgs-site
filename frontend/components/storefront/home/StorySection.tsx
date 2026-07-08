import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkle } from "lucide-react";

/** Real SBGS kitchen photography (public/images/sweets). */
const COLLAGE_IMAGES = [
  { src: "/images/sweets/IMG_20260612_163129.jpg", alt: "Freshly prepared ghee sweets" },
  { src: "/images/sweets/IMG_20260612_164305.jpg", alt: "Traditional sweets arranged for packing" },
  { src: "/images/sweets/IMG_20260612_165401.jpg", alt: "Assorted pure ghee sweets" },
  { src: "/images/sweets/IMG_20260612_170752.jpg", alt: "Handcrafted sweets from our kitchen" },
];

/** "Our Story of Purity" — 2×2 photo collage beside a deep-green panel. */
export function StorySection() {
  return (
    <section className="mx-auto w-full px-4 py-8 sm:py-12 sm:px-6 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Collage */}
        <div className="grid grid-cols-2 gap-4">
          {COLLAGE_IMAGES.map((img) => (
            <div key={img.src} className="group overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Green panel */}
        <div className="relative flex flex-col items-start justify-center overflow-hidden rounded-3xl bg-brand-green px-6 py-12 text-text-cream sm:px-12 lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_60%)]"
            aria-hidden
          />
          <div className="mb-6 flex items-center gap-2 text-brand-gold" aria-hidden>
            <span className="h-px w-10 bg-brand-gold/50" />
            <Sparkle className="size-3 fill-current" />
            <span className="h-px w-10 bg-brand-gold/50" />
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-[1.15] sm:text-5xl">
            Our Story of Purity
            <br />
            in Every Sweet
          </h2>
          <p className="mt-4 max-w-[400px] text-lg opacity-90">
            Handcrafted with love, our sweets are made from the finest
            ingredients to bring you unmatched taste in every bite.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-cream px-7 py-3.5 text-sm font-semibold text-brand-green transition-all hover:-translate-y-0.5"
          >
            Explore Our Story
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
