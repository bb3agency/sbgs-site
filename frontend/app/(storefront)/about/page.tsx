import { getPublicStoreConfig } from "@/lib/storefront-settings";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart, Shield, Truck, Utensils, Droplet, ChefHat } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `About Us — ${APP_NAME}`,
  description:
    "Discover the story behind Sri Sai Baba Ghee Sweets & Home Foods. We bring you authentic, handcrafted traditional sweets made with pure ghee and the finest ingredients.",
};

const VALUES = [
  {
    icon: Droplet,
    title: "100% Pure Ghee",
    description:
      "We never compromise on quality. Every sweet is prepared using 100% pure, premium ghee to ensure the authentic aroma and rich taste that traditional sweets deserve.",
  },
  {
    icon: ChefHat,
    title: "Authentic Recipes",
    description:
      "Our recipes have been passed down through generations. We stay true to traditional preparation methods, capturing the true essence of homemade goodness.",
  },
  {
    icon: Shield,
    title: "No Preservatives",
    description:
      "Our sweets and home foods are made fresh without the use of artificial preservatives or chemicals. Just natural, wholesome ingredients in every bite.",
  },
  {
    icon: Heart,
    title: "Handcrafted with Love",
    description:
      "Every delicacy is carefully handcrafted by our experienced artisans who take pride in delivering perfection, just like the sweets made in your own kitchen.",
  },
];

export default async function AboutPage() {
  const storeConfig = await getPublicStoreConfig();
  return (
    <div className="flex flex-col bg-brand-cream min-h-screen pb-16">
      {/* ── Page Header Banner ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-gold/20 py-10 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
            Our Story
          </p>
          <h1 className="mb-3 font-heading text-3xl font-bold text-brand-maroon sm:mb-4 sm:text-4xl md:text-5xl">
            About {APP_NAME}
          </h1>
          <nav
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground sm:gap-2 sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-brand-gold">About Us</span>
          </nav>
        </div>
        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-brand-gold/20 opacity-40 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-16 top-0 size-48 rounded-full bg-card opacity-40 blur-3xl"
          aria-hidden
        />
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:pt-12 lg:px-8">
        <div className="grid gap-6 sm:gap-8">

          {/* Story card */}
          <div className="rounded-[20px] bg-card p-6 shadow-sm sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-gold">
                  Who we are
                </p>
                <h2 className="mb-4 font-heading text-2xl font-bold text-brand-maroon sm:text-3xl">
                  Authentic taste, crafted with pure ghee and tradition
                </h2>
                <div className="space-y-4 text-sm font-medium leading-relaxed text-muted-foreground">
                  <p>
                    Sri Sai Baba Ghee Sweets & Home Foods was founded on a simple philosophy: 
                    to bring the warmth and joy of authentic, homemade delicacies to your family&apos;s celebrations and everyday moments.
                  </p>
                  <p>
                    We believe that true flavor lies in purity. That&apos;s why we meticulously source the finest ingredients and use <strong className="text-brand-maroon">100% pure ghee</strong> for our traditional Indian sweets. 
                    From our famous Badusha to our delicate Kaju Katli, every item is a testament to our rich culinary heritage.
                  </p>
                  <p>
                    Beyond sweets, our selection of savory home foods—including pickles, powders, and namkeens—are prepared with the same dedication to authenticity. 
                    No shortcuts, no artificial preservatives. Just genuine taste crafted with love and delivered fresh to your door.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[20px] bg-brand-cream">
                <Image
                  src="/images/sweets/IMG_20260612_165401.jpg"
                  alt="Sri Sai Baba Ghee Sweets — authentic pure ghee sweets"
                  width={600}
                  height={480}
                  className="mx-auto h-64 w-full object-cover p-0 lg:h-96"
                />
              </div>
            </div>
          </div>

          {/* Values grid */}
          <div className="rounded-[20px] bg-card p-6 shadow-sm sm:p-8 lg:p-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
              What we stand for
            </p>
            <h2 className="mb-8 font-heading text-2xl font-bold text-brand-maroon sm:text-3xl">
              Our values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-[16px] border border-border bg-brand-cream p-5 sm:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-cream">
                    <Icon className="size-5 text-brand-gold" aria-hidden />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-heading text-base font-bold text-brand-maroon">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process steps */}
          <div className="rounded-[20px] bg-card p-6 shadow-sm sm:p-8 lg:p-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
              How it works
            </p>
            <h2 className="mb-8 font-heading text-2xl font-bold text-brand-maroon sm:text-3xl">
              From our kitchen to your home
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Utensils, step: "1", title: "Finest Ingredients", desc: "We source premium quality nuts, pure ghee, and fresh ingredients." },
                { icon: ChefHat, step: "2", title: "Traditional Cooking", desc: "Our artisans meticulously prepare each delicacy using time-honored recipes." },
                { icon: Shield, step: "3", title: "Quality Check", desc: "Every batch is tested for perfect taste, texture, and hygiene." },
                { icon: Truck, step: "4", title: "Secure Delivery", desc: "Carefully packed to preserve freshness and safely delivered to your doorstep." },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-cream">
                    <Icon className="size-7 text-brand-maroon" aria-hidden />
                  </div>
                  <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-white">
                    {step}
                  </span>
                  <h3 className="mb-2 font-heading text-sm font-bold text-brand-maroon sm:text-base">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery areas */}
          <div className="rounded-[20px] bg-brand-maroon p-6 shadow-sm sm:p-8 lg:p-12 text-center">
            <Truck className="mx-auto mb-4 size-10 text-white/70" aria-hidden />
            <h2 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">
              Delivery areas
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-white/75">
              We currently deliver fresh sweets and home foods across our standard delivery zones.
              Enter your pincode at checkout to verify serviceability as we continue to expand.
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-gold px-8 text-sm font-bold text-white transition-transform hover:-translate-y-1 hover:bg-white hover:text-brand-maroon hover:shadow-lg"
            >
              Explore Our Menu
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
