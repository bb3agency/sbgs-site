import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-[#F6EDE0]">
      {/* Background Image — premium sweet gift boxes with slow zoom */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sweets/IMG_20260612_183232.jpg"
          alt="Premium gift boxes of traditional Indian sweets"
          fill
          priority
          className="object-cover animate-[heroZoom_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        {/* Left-to-right dark gradient overlay for text readability, leaving the right side clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content — editorial layout matching Dadu's style */}
      <div className="relative z-10 flex min-h-[100vh] items-end pb-32">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            {/* Decorative accent */}
            <div className="mb-6 flex items-center justify-start gap-3">
              <span className="font-['Montserrat'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A537]">
                Since 1985 — Nandyal
              </span>
              <div className="h-px w-10 bg-[#D4A537]/60" />
            </div>

            {/* Script heading — Libre Baskerville style */}
            <p className="font-serif text-xl italic text-[#D4A537] sm:text-2xl lg:text-3xl">
              Festive Specials
            </p>

            <h1 className="mt-2 font-heading text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
              to Timeless{" "}
              <span className="block font-serif italic font-normal text-[#FAF5EC]/90">
                Favourites
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#FAF5EC]/80 sm:text-base lg:text-lg font-['Montserrat'] uppercase tracking-widest font-semibold">
              Premium Handcrafted Ghee Sweets & Traditional Indian Mithai
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-start gap-4">
              <Link
                href="/products"
                className="group inline-flex h-14 items-center gap-3 bg-[#FAF5EC] px-9 text-sm font-bold uppercase tracking-[0.15em] text-[#7B1C1C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/10 font-['Montserrat']"
              >
                Explore Now
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-start gap-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 font-['Montserrat']">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#4CAF50]" />
                100% Pure Ghee
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <span className="size-1.5 rounded-full bg-[#D4A537]" />
                No Preservatives
              </span>
              <span className="hidden items-center gap-2 md:flex">
                <span className="size-1.5 rounded-full bg-[#D4A537]" />
                Pan India Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="size-5 text-white/60" />
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919440445006"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="size-7 fill-white" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
}
