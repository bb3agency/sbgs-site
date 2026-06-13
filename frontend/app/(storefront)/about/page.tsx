import { getPublicStoreConfig } from "@/lib/storefront-settings";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Award, Flame, HandHeart, Heart, Package, Truck, Star } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `About Us — ${APP_NAME}`,
  description:
    "Sri Sai Baba Ghee Sweets brings you handcrafted traditional Indian mithai made with 100% pure desi ghee. No preservatives, no shortcuts — just honest sweets.",
};

const VALUES = [
  {
    icon: Award,
    title: "100% Pure Desi Ghee",
    description:
      "Every sweet we make uses only authentic cow ghee — never vanaspati, never palm oil. The richness you taste is genuine and unadulterated.",
  },
  {
    icon: Flame,
    title: "Handcrafted with love",
    description:
      "Our master halwais prepare each batch fresh every morning using time-honoured recipes passed down through generations of sweet-making families.",
  },
  {
    icon: HandHeart,
    title: "No Preservatives, Ever",
    description:
      "We believe in pure taste, naturally fresh. No artificial colours, no chemical preservatives — just honest sweets the way they were always meant to be.",
  },
  {
    icon: Heart,
    title: "Trusted by Thousands",
    description:
      "Over 5,000 families trust Sri Sai Baba Ghee Sweets for their celebrations, festivals, daily indulgence, and gifting needs across India.",
  },
];

const BASE_STATS = [
  { value: "50+", label: "Sweet Varieties" },
  { value: "100%", label: "Pure Desi Ghee" },
  { value: "5,000+", label: "Happy Families" },
] as const;

const REVIEWS_STAT = { value: "4.8 ★", label: "Average Rating" } as const;

export default async function AboutPage() {
  const storeConfig = await getPublicStoreConfig();
  const stats = storeConfig.reviewsEnabled
    ? [...BASE_STATS, REVIEWS_STAT]
    : [...BASE_STATS];
  return (
    <div className="flex flex-col bg-[#fdf8f3] min-h-screen pb-16">
      {/* ── Page Header Banner ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f5e6d8] py-10 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#D4A537]">
            Our Story
          </p>
          <h1 className="mb-3 font-heading text-3xl font-bold text-[#6B1D2A] sm:mb-4 sm:text-4xl md:text-5xl">
            About {APP_NAME}
          </h1>
          <nav
            className="flex items-center gap-1.5 text-xs font-bold text-[#767676] sm:gap-2 sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-[#D4A537]">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#D4A537]">About Us</span>
          </nav>
        </div>
        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-[#D4A537] opacity-20 blur-3xl"
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
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4A537]">
                  Who we are
                </p>
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#6B1D2A] sm:text-3xl">
                  Handcrafted pure ghee sweets, delivered with love
                </h2>
                <div className="space-y-4 text-sm font-medium leading-relaxed text-[#767676]">
                  <p>
                    Sri Sai Baba Ghee Sweets was founded on a single belief: every
                    celebration deserves sweets made the way our grandmothers made
                    them — with pure ghee, honest ingredients, and no shortcuts.
                  </p>
                  <p>
                    Our team of <strong className="text-[#6B1D2A]">master halwais</strong> prepare
                    each batch fresh every morning using traditional recipes that have
                    been perfected over generations. We use only <strong className="text-[#6B1D2A]">100%
                    pure desi cow ghee</strong> — never vanaspati, never palm oil.
                  </p>
                  <p>
                    From <strong className="text-[#6B1D2A]">festive gift boxes</strong> to
                    everyday indulgence, every sweet we sell is made without
                    preservatives, artificial colours, or chemical additives. What you
                    taste is pure, fresh, and crafted with care.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[20px] bg-[#fdf0e8]">
                <Image
                  src="/images/product-placeholder.svg"
                  alt="Sri Sai Baba Ghee Sweets — handcrafted pure ghee mithai"
                  width={600}
                  height={480}
                  className="mx-auto h-64 w-full object-contain p-8 lg:h-80"
                />
              </div>
            </div>
          </div>

          {/* Impact stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-[20px] bg-[#6B1D2A] px-4 py-6 text-center sm:py-8"
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
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#D4A537]">
              What we stand for
            </p>
            <h2 className="mb-8 font-heading text-2xl font-bold text-[#6B1D2A] sm:text-3xl">
              Our values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-[16px] border border-[#ece3d8] bg-[#fdf8f3] p-5 sm:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fdf0d5]">
                    <Icon className="size-5 text-[#D4A537]" aria-hidden />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-heading text-base font-bold text-[#6B1D2A]">
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
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#D4A537]">
              How it works
            </p>
            <h2 className="mb-8 font-heading text-2xl font-bold text-[#6B1D2A] sm:text-3xl">
              From our kitchen to your table
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Award, step: "1", title: "Premium Ingredients", desc: "We source 100% pure desi cow ghee, finest dry fruits, and premium ingredients from trusted suppliers." },
                { icon: Flame, step: "2", title: "Handcrafted by Masters", desc: "Our experienced halwais prepare each sweet fresh every morning using traditional techniques and recipes." },
                { icon: Package, step: "3", title: "Packed with Care", desc: "Sweets are carefully packed in food-grade, tamper-proof packaging to maintain freshness and presentation." },
                { icon: Truck, step: "4", title: "Delivered Fresh", desc: "Secure delivery across major cities. Your sweets arrive as fresh and delicious as when they left our kitchen." },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#fdf0d5]">
                    <Icon className="size-7 text-[#6B1D2A]" aria-hidden />
                  </div>
                  <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-[#D4A537] text-xs font-bold text-white">
                    {step}
                  </span>
                  <h3 className="mb-2 font-heading text-sm font-bold text-[#6B1D2A] sm:text-base">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#767676] sm:text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery areas */}
          <div className="rounded-[20px] bg-[#6B1D2A] p-6 shadow-sm sm:p-8 lg:p-12 text-center">
            <Truck className="mx-auto mb-4 size-10 text-white/70" aria-hidden />
            <h2 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">
              Delivery areas
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-white/75">
              We deliver handcrafted sweets across Hyderabad and the surrounding districts
              of Telangana. Enter your pincode at checkout to check serviceability — we are
              expanding regularly.
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4A537] px-8 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-white hover:text-[#6B1D2A] hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
