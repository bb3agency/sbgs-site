import { getPublicStoreConfig } from "@/lib/storefront-settings";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles, Shield, Users, Droplet, Truck, Star } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `About Us — ${APP_NAME}`,
  description:
    "A family legacy of pure ghee sweets made fresh daily. Traditional recipes, the finest ingredients, and premium gifting crafted with devotion.",
};

const VALUES = [
  {
    icon: Droplet,
    title: "100% Pure Ghee",
    description:
      "Every sweet is made with pure ghee and the finest ingredients — no compromise on quality, no shortcuts. Taste the difference in every bite.",
  },
  {
    icon: Sparkles,
    title: "Made Fresh Daily",
    description:
      "We prepare in small batches every single day so your sweets reach you at their absolute best — never mass-produced, never stale.",
  },
  {
    icon: Shield,
    title: "Quality Promise",
    description:
      "Not satisfied with your order? We replace it or refund it, no questions asked. Your trust is more important than a single transaction.",
  },
  {
    icon: Users,
    title: "Rooted in Tradition",
    description:
      "Traditional recipes passed down through generations, crafted with devotion — the same authentic taste families have loved for years.",
  },
];

const BASE_STATS = [
  { value: "1M+", label: "Happy Customers" },
  { value: "100%", label: "Pure Ghee" },
  { value: "Pan-India", label: "Delivery" },
] as const;

const REVIEWS_STAT = { value: "4.8 ★", label: "Average Rating" } as const;

export default async function AboutPage() {
  const storeConfig = await getPublicStoreConfig();
  const stats = storeConfig.reviewsEnabled
    ? [...BASE_STATS, REVIEWS_STAT]
    : [...BASE_STATS];
  return (
    <div className="flex flex-col bg-[#faf5ec] min-h-screen pb-16">
      {/* ── Page Header Banner ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f5d88e] py-10 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d4a537]">
            Our Story
          </p>
          <h1 className="mb-3 font-heading text-3xl font-bold text-[#7f1416] sm:mb-4 sm:text-4xl md:text-5xl">
            About {APP_NAME}
          </h1>
          <nav
            className="flex items-center gap-1.5 text-xs font-bold text-[#767676] sm:gap-2 sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-[#d4a537]">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#d4a537]">About Us</span>
          </nav>
        </div>
        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-[#f5d88e] opacity-40 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-16 top-0 size-48 rounded-full bg-white opacity-40 blur-3xl"
          aria-hidden
        />
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:pt-12 lg:px-8">
        <div className="grid gap-6 sm:gap-8">

          {/* Story card */}
          <div className="rounded-[20px] bg-white p-6 shadow-sm sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d4a537]">
                  Who we are
                </p>
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#7f1416] sm:text-3xl">
                  Pure ghee sweets, made for your celebrations
                </h2>
                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#767676]">
                  <p>
                    Sri Sai Baba Ghee Sweets is a family legacy built on a single belief: every
                    celebration deserves sweets made the traditional way — with pure ghee, the
                    finest ingredients, and lots of devotion.
                  </p>
                  <p>
                    Our recipes are <strong className="text-[#7f1416]">passed down through generations</strong>,
                    crafted by skilled artisans who take pride in every batch. We prepare fresh
                    every day in small batches, so nothing sits on a shelf — you taste the sweets
                    exactly as they were meant to be.
                  </p>
                  <p>
                    From everyday treats to <strong className="text-[#7f1416]">premium festive gift boxes</strong>,
                    every order is elegantly packed and delivered across India. Made with love,
                    made for the moments that matter most.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[20px] bg-[#faf5ec]">
                <Image
                  src="/images/sweets/IMG_20260612_163129.jpg"
                  alt="Sri Sai Baba Ghee Sweets — premium ghee sweets and gift box"
                  width={600}
                  height={480}
                  className="h-64 w-full object-cover lg:h-80"
                />
              </div>
            </div>
          </div>

          {/* Impact stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-[20px] bg-[#7f1416] px-4 py-6 text-center sm:py-8"
              >
                <span className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  {value}
                </span>
                <span className="mt-1.5 text-xs font-bold uppercase tracking-wider text-white/70">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Values grid */}
          <div className="rounded-[20px] bg-white p-6 shadow-sm sm:p-8 lg:p-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d4a537]">
              What we stand for
            </p>
            <h2 className="mb-8 font-heading text-2xl font-bold text-[#7f1416] sm:text-3xl">
              Our values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-[16px] border border-[#f5ebe0] bg-[#faf5ec] p-5 sm:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#faf5ec]">
                    <Icon className="size-5 text-[#d4a537]" aria-hidden />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-heading text-base font-bold text-[#7f1416]">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#767676]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process steps */}
          <div className="rounded-[20px] bg-white p-6 shadow-sm sm:p-8 lg:p-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d4a537]">
              How it works
            </p>
            <h2 className="mb-8 font-heading text-2xl font-bold text-[#7f1416] sm:text-3xl">
              From kitchen to your celebration
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Droplet, step: "1", title: "Finest Ingredients", desc: "We source pure ghee, premium dry fruits, and the finest ingredients for every recipe." },
                { icon: Sparkles, step: "2", title: "Made Fresh Daily", desc: "Our artisans prepare sweets in small batches every day using traditional recipes." },
                { icon: Star, step: "3", title: "Premium Packing", desc: "Every order is hygienically packed in elegant, gift-ready packaging." },
                { icon: Truck, step: "4", title: "Pan-India Delivery", desc: "Carefully shipped to your door so your sweets arrive fresh and on time." },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#faf5ec]">
                    <Icon className="size-7 text-[#7f1416]" aria-hidden />
                  </div>
                  <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-[#d4a537] text-xs font-bold text-white">
                    {step}
                  </span>
                  <h3 className="mb-2 font-heading text-sm font-bold text-[#7f1416] sm:text-base">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#767676] sm:text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery areas */}
          <div className="rounded-[20px] bg-[#7f1416] p-6 shadow-sm sm:p-8 lg:p-12 text-center">
            <Truck className="mx-auto mb-4 size-10 text-white/70" aria-hidden />
            <h2 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">
              Delivery areas
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-white/75">
              We deliver our sweets and gift boxes across India. Enter your pincode at
              checkout to check serviceability — we are expanding regularly.
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#d4a537] px-8 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-white hover:text-[#7f1416] hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
