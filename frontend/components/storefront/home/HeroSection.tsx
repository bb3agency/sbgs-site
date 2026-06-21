import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Gift,
  Sparkles,
  ShieldCheck,
  Truck,
  Lock,
} from "lucide-react";

const HERO_STATS = [
  {
    label: "100% Pure Ghee",
    desc: "No Compromise",
    icon: ShieldCheck,
  },
  {
    label: "Made Fresh Daily",
    desc: "Small Batches",
    icon: Sparkles,
  },
  {
    label: "Secure Payments",
    desc: "100% Safe",
    icon: Lock,
  },
  {
    label: "Pan-India Delivery",
    desc: "Fast & Reliable",
    icon: Truck,
  },
];

const HERO_CHIPS = [
  { icon: Sparkles, label: "Made fresh daily" },
  { icon: Gift, label: "Premium gifting" },
  { icon: ShieldCheck, label: "100% pure ghee" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf5ec]">
      {/* Decorative blurs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-[#f5d88e] opacity-50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 size-[480px] rounded-full bg-[#f5d88e] opacity-60 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7f1416]/15 bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7f1416] backdrop-blur-sm">
              <span className="flex size-2 items-center justify-center">
                <span className="absolute size-2 animate-ping rounded-full bg-[#d4a537] opacity-70" />
                <span className="relative size-2 rounded-full bg-[#d4a537]" />
              </span>
              Tradition of purity · Promise of quality
            </span>

            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-[#7f1416] sm:text-5xl md:text-6xl lg:text-[68px]">
              Pure Ghee Goodness,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Made for</span>
                <svg
                  aria-hidden
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-1 z-0 h-3 w-full text-[#d4a537]/40"
                >
                  <path
                    d="M2 9 Q150 -3 298 8"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Celebrations.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#8c7b6b] sm:text-lg">
              Crafted with devotion and made with pure ghee. Traditional sweets and
              premium gift boxes in fresh small batches every day — perfect for
              festivals, weddings, and every reason to celebrate.
            </p>

            {/* Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_CHIPS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#7f1416]/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#7f1416]"
                >
                  <Icon className="size-3.5 text-[#d4a537]" aria-hidden />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/products?sort=popularity"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#7f1416] px-8 text-sm font-bold text-white shadow-lg shadow-[#7f1416]/20 transition-all hover:-translate-y-0.5 hover:bg-[#651013] hover:shadow-xl"
              >
                Shop Bestsellers
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/categories"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#7f1416]/25 bg-white px-8 text-sm font-bold text-[#7f1416] transition-all hover:-translate-y-0.5 hover:border-[#7f1416] hover:shadow-md"
              >
                <Gift className="size-4 text-[#d4a537]" />
                Explore Gifting
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-[#efe8e4] bg-white/90 p-4 shadow-sm backdrop-blur-md sm:grid-cols-4 sm:gap-2">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#faf5ec] text-[#d4a537]">
                    <stat.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-bold text-[#7f1416]">
                      {stat.label}
                    </span>
                    <span className="text-[10px] text-[#767676]">{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: editorial visual stack */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[32px] bg-[#f5d88e] shadow-[0_30px_80px_-30px_rgba(35,64,61,0.4)]">
              <Image
                src="/images/sweets/IMG_20260612_163129.jpg"
                alt="Premium gift box of traditional ghee sweets by Sri Sai Baba Ghee Sweets"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#7f1416]/60 to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl border border-white/30 bg-white/90 p-3 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d4a537] text-white">
                    <Gift className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7f1416]">
                      Festive Gift Boxes
                    </p>
                    <p className="text-xs text-[#767676]">
                      Elegant, gift-ready packaging
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating sticker */}
            <div className="absolute -left-4 top-8 hidden rotate-[-8deg] rounded-2xl border border-[#7f1416]/10 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:flex sm:items-center sm:gap-2 md:-left-6">
              <Sparkles className="size-5 text-[#7f1416]" />
              <div>
                <p className="text-xs font-bold text-[#7f1416]">Made fresh daily</p>
                <p className="text-[10px] text-[#767676]">Small batches · Pure ghee</p>
              </div>
            </div>

            {/* Floating trust sticker */}
            <div className="absolute -right-2 bottom-12 hidden rotate-[6deg] flex-col items-center justify-center rounded-full border-4 border-white bg-[#d4a537] p-4 text-[#7f1416] shadow-xl sm:flex md:-right-4">
              <span className="font-heading text-xl font-black leading-none">
                100%
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider">
                Pure ghee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
