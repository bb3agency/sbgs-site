import Link from "next/link";
import { Reveal } from "@/components/shared/motion/Reveal";

export function InternationalBanner() {
  return (
    <section className="relative overflow-hidden bg-[#7F1416]">
      {/* Decorative textured pattern overlay could go here */}
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 10L10 0ZM10 10L0 0" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <Reveal className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 px-4 py-12 sm:flex-row sm:px-6 sm:py-16 lg:px-8">
        <div className="flex items-center gap-6">
          {/* Icon */}
          <div className="flex size-14 items-center justify-center rounded-full bg-[#FAF5EC]/10 text-[#FAF5EC]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
              <path d="M2 12h20"/>
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-normal leading-[1.2] text-[#FAF5EC] sm:text-3xl">
              From You, to <em className="italic">Anywhere</em> in the World
            </h2>
            <p className="mt-2 text-sm font-sans uppercase tracking-wider text-[#FAF5EC]/80">
              Love knows no borders — delivering worldwide
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="shrink-0 bg-[#FAF5EC] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-[#7F1416] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl font-sans"
        >
          Ship Internationally
        </Link>
      </Reveal>
    </section>
  );
}
