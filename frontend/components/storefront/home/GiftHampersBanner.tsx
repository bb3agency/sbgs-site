import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BANNER_IMAGE = "/images/sweets/IMG_20260612_172627.jpg";

/** Gold gift-hampers banner (reference Home.tsx §7). */
export function GiftHampersBanner() {
  return (
    <section className="w-full">
      <div className="flex min-h-[400px] flex-col overflow-hidden bg-brand-gold lg:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <h2 className="font-heading text-4xl font-semibold leading-[1.15] text-brand-maroon sm:text-5xl">
            Make Every Occasion
            <br />
            Extra Special
          </h2>
          <p className="mt-4 max-w-[320px] text-accent-foreground/90">
            Premium gift hampers crafted with love for your loved ones.
          </p>
          <div className="mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-brand-maroon px-7 py-3.5 text-sm font-semibold text-text-cream transition-all hover:-translate-y-0.5 hover:bg-brand-maroon-dark"
            >
              Explore Gift Hampers
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="relative min-h-[300px] flex-[1.5]">
          <Image
            src={BANNER_IMAGE}
            alt="Festive gift hampers with assorted pure ghee sweets"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
