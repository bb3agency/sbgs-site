import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MithaiStory() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#7F1416" }}>
      {/* Background image — grayscale artisan photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sweets/IMG_20260612_173004.jpg"
          alt="Artisan preparing traditional Indian sweets"
          fill
          sizes="100vw"
          className="object-cover grayscale opacity-40"
        />
      </div>

      {/* Decorative dotted frame (Dadu's style) */}
      <div className="absolute inset-8 z-[5] rounded-[3rem] border-2 border-dashed border-border/30 pointer-events-none" aria-hidden />

      {/* Content overlay — centered text, Dadu's "A Sweetness Perfected Over Time" style */}
      <div className="relative z-10 flex min-h-[85vh] items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[600px] text-center">
          <h2
            className="mb-0 font-heading text-4xl font-medium leading-[1.2] sm:text-5xl lg:text-[48px]"
            style={{ color: "#F9F3E7" }}
          >
            A Sweetness
          </h2>

          <h3
            className="mt-2 mb-8 font-serif text-3xl italic font-normal sm:text-4xl lg:text-[40px]"
            style={{ color: "#F9F3E7" }}
          >
            Perfected Over Time
          </h3>

          <p
            className="mb-8 text-base leading-[1.6] font-['Montserrat'] sm:text-lg"
            style={{ color: "#F9F3E7" }}
          >
            Inside each Sri Sai Baba sweet box, the legacy of mithai craftsmanship comes
            to life. Years of expertise unfolds in delicate textures and rich
            flavours — all inspired by one family&apos;s pursuit of the perfect ghee
            sweet over three decades.
          </p>

          <Link
            href="/about"
            className="inline-block border border-border bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] text-brand-cream transition-all duration-300 hover:bg-brand-cream hover:text-brand-maroon font-['Montserrat']"
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
