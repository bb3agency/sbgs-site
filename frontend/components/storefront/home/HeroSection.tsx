import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";

const HERO_IMAGE = "/images/Hero-section_image.png";

/**
 * Homepage hero — maroon rounded panel flowing into a full-bleed product
 * photograph, with two gold stat cards overlapping the photo's right edge
 * (reference: refernce-site Home.tsx §2).
 */
export function HeroSection() {
  return (
    <section className="mx-auto w-full px-0 sm:px-6 lg:px-10 sm:mt-6">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-none sm:rounded-3xl lg:min-h-[640px] lg:flex-row">

        {/* Background Image & Gradient Blur Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="Freshly made pure ghee sweets from Sri Sai Baba Ghee Sweets"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 100vw"
            className="object-cover"
          />
          {/* Gradient blur overlay: vertical for mobile readability, horizontal for desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent backdrop-blur-[0px]" />
        </div>

        {/* Left — content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-14 pb-8 text-text-cream sm:px-12 sm:py-16 lg:py-20 lg:pl-16 lg:pr-0">
          <h1 className="relative font-heading text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
            Made for
            <br />
            Every Celebration
          </h1>
          <p className="relative mt-5 sm:mt-6 max-w-[380px] text-base sm:text-lg opacity-90 drop-shadow-md">
            Pure ghee sweets, made with tradition and the finest ingredients.
          </p>
          <div className="relative mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-brand-gold-light"
            >
              Order Now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-text-cream transition-all hover:gap-3 drop-shadow-md"
            >
              Explore Sweets
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Right — floating trust badge */}
        <div className="relative z-10 flex flex-[1.2] flex-col items-center justify-end pb-10 pt-4 sm:pb-12 lg:items-end lg:justify-center lg:pb-0 lg:pt-0 lg:pr-12">
          {/* Single floating glass panel */}
          <div className="relative w-[85%] sm:w-auto rounded-[20px] bg-white/[0.08] backdrop-blur-lg border border-white/[0.15] px-6 py-7 sm:px-7 sm:py-8 lg:px-8 lg:py-10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
            {/* Decorative gold corner accent */}
            <div className="absolute -top-px -left-px h-8 w-8 rounded-tl-[20px] border-t-2 border-l-2 border-brand-gold/60" />
            <div className="absolute -bottom-px -right-px h-8 w-8 rounded-br-[20px] border-b-2 border-r-2 border-brand-gold/60" />

            {/* Trust signal 1 */}
            <div className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold">
                <ShieldCheck className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-heading text-2xl font-semibold leading-none text-white lg:text-3xl">
                  100%
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-white/70 uppercase">
                  Pure Ghee
                </p>
              </div>
            </div>

            {/* Gold divider */}
            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

            {/* Trust signal 2 */}
            <div className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold">
                <Clock className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-heading text-2xl font-semibold leading-none text-white lg:text-3xl">
                  40+
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-white/70 uppercase">
                  Years of Trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
