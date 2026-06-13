import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

const IMPACT = [
  { value: "5,000+", label: "Happy families served" },
  { value: "100%", label: "Pure desi cow ghee used" },
  { value: "50+", label: "Traditional sweet varieties" },
  { value: "0%", label: "Preservatives or additives" },
];

export function ImpactStats() {
  return (
    <section className="bg-[#fdf0e8]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-40px_rgba(107,29,42,0.3)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image */}
            <div className="relative aspect-[16/10] lg:col-span-5 lg:aspect-auto">
              <Image
                src="/images/sweets/IMG_20260612_173835.jpg"
                alt="Assorted traditional Indian sweets made with pure ghee"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/30 to-transparent lg:hidden"
              />
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-white to-transparent lg:block"
              />
            </div>

            {/* Stats */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 lg:p-14">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fdf0d5] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B1D2A]">
                  <Award className="size-3 text-[#D4A537]" aria-hidden />
                  Our impact
                </span>

                <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.1] tracking-tight text-[#6B1D2A] sm:text-4xl">
                  Every sweet tells a story of tradition.
                </h2>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6b6060]">
                  We measure success not by volume, but by the joy on our
                  customers&apos; faces. Every box we deliver carries generations
                  of craft, honest ingredients, and a promise of purity.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6 sm:gap-8">
                  {IMPACT.map((item) => (
                    <div key={item.label} className="border-l-2 border-[#D4A537] pl-4">
                      <p className="font-heading text-3xl font-bold text-[#6B1D2A] sm:text-4xl">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs font-medium leading-snug text-[#767676] sm:text-sm">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link
                    href="/about"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#6B1D2A] px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#501620] hover:shadow-lg"
                  >
                    Our story
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
