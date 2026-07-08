import Image from "next/image";
import Link from "next/link";

export function GiftBoxesSection() {
  return (
    <section className="relative w-full" style={{ height: "83vh" }}>
      <div className="flex h-full w-full flex-col sm:flex-row">
        {/* Left Panel — Corporate Collections (Image bg, white text) */}
        <Link
          href="/categories/corporate-gifting"
          className="group relative flex h-1/2 w-full sm:h-full sm:w-1/2 overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/sweets/IMG_20260612_180646.jpg"
              alt="Corporate Collections"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          
          <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start lg:bottom-12 lg:left-12">
            <h3 className="font-serif text-3xl font-normal italic text-white sm:text-4xl lg:text-5xl">
              Corporate Collections
            </h3>
          </div>

          {/* Carousel dots placeholder */}
          <div className="absolute bottom-8 right-8 z-10 flex gap-2 lg:bottom-12 lg:right-12">
            <div className="size-2 rounded-full bg-card" />
            <div className="size-2 rounded-full bg-card/40" />
            <div className="size-2 rounded-full bg-card/40" />
          </div>
        </Link>

        {/* Right Panel — Wedding Collections (Cream bg, dark red text, medallion) */}
        <Link
          href="/categories/wedding-collections"
          className="group relative flex h-1/2 w-full sm:h-full sm:w-1/2 overflow-hidden bg-brand-cream"
        >
          {/* Decorative medallion placeholder */}
          <div className="absolute right-0 top-0 opacity-10">
             <svg viewBox="0 0 200 200" className="size-64 text-brand-maroon sm:size-96">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
             </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border border-brand-maroon/20">
              <Image
                src="/images/sweets/IMG_20260612_205253.jpg"
                alt="Wedding Collections"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
              />
            </div>
          </div>
          
          <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start lg:bottom-12 lg:left-12">
            <h3 className="font-serif text-3xl font-normal italic text-brand-maroon sm:text-4xl lg:text-5xl">
              Wedding Collections
            </h3>
          </div>

          {/* Carousel dots placeholder */}
          <div className="absolute bottom-8 right-8 z-10 flex gap-2 lg:bottom-12 lg:right-12">
            <div className="size-2 rounded-full bg-brand-maroon" />
            <div className="size-2 rounded-full bg-brand-maroon/40" />
            <div className="size-2 rounded-full bg-brand-maroon/40" />
          </div>
        </Link>
      </div>
    </section>
  );
}
