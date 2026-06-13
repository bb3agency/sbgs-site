import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const SPOTLIGHT_IMAGES = [
  {
    src: "/images/sweets/IMG_20260612_165916.jpg",
    alt: "Sri Sai Baba Ghee Sweets store interior — vibrant display counter",
    span: "md:col-span-2",
  },
  {
    src: "/images/sweets/IMG_20260612_172627.jpg",
    alt: "Artisan halwai preparing traditional barfi",
    span: "",
  },
  {
    src: "/images/sweets/IMG_20260612_182754.jpg",
    alt: "Assorted mithai display at the store",
    span: "",
  },
  {
    src: "/images/sweets/IMG_20260612_165103.jpg",
    alt: "Premium gift packaging station",
    span: "",
  },
  {
    src: "/images/sweets/IMG_20260612_204938.jpg",
    alt: "Fresh laddu being prepared in the kitchen",
    span: "md:col-span-2",
  },
];

export function StoreSpotlight() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#7F1416" }}>
      {/* Decorative background dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F5D88E 0.5px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-20 size-[500px] rounded-full bg-[#D4A537] opacity-[0.06] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Heading */}
        <div className="mb-10 text-center lg:mb-14">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#F5D88E]/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5D88E]/60 font-['Montserrat']">
              Our Stores
            </span>
            <div className="h-px w-8 bg-[#F5D88E]/40" />
          </div>
          <h2 className="font-serif text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
            That&apos;s Us in the{" "}
            <em className="italic text-[#F5D88E]">Spotlight</em>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/60 sm:text-base font-['Montserrat']">
            A glimpse of our craft, our stores, and the love that goes into
            every box.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
          {SPOTLIGHT_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={`group relative aspect-[4/3] overflow-hidden bg-white/10 ring-1 ring-white/[0.08] transition-all duration-500 hover:ring-[#F5D88E]/30 hover:shadow-xl ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7F1416]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Bottom CTA — Store locator */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-white/40 font-['Montserrat']">
            Visit us at our stores in Nandyal, Andhra Pradesh
          </p>
          <Link
            href="/stores"
            className="inline-flex items-center gap-2 border border-white/20 px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-white/70 transition-all duration-300 hover:border-[#F5D88E]/60 hover:text-[#F5D88E] font-['Montserrat']"
          >
            <MapPin className="size-4" />
            Find a Store
          </Link>
        </div>
      </div>
    </section>
  );
}
