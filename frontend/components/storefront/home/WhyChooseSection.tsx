import {
  Droplet,
  Clock,
  Package,
  Building2,
  Truck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";

interface Reason {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const REASONS: Reason[] = [
  { title: "Pure Ghee", desc: "Made with highest quality ghee", icon: Droplet },
  { title: "Made Fresh Daily", desc: "Fresh batches prepared every day", icon: Clock },
  { title: "Premium Packaging", desc: "Hygienic, elegant & gift-ready", icon: Package },
  { title: "Bulk & Corporate", desc: "Special pricing for bulk and businesses", icon: Building2 },
  { title: "Pan-India Delivery", desc: "Delivering happiness across India", icon: Truck },
  { title: "Customized Gifting", desc: "Personalized boxes for every occasion", icon: Sparkles },
];

export function WhyChooseSection() {
  return (
    <section className="bg-[#e3e8d6]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#3a2218] sm:text-3xl">
            Why Choose {APP_NAME}?
          </h2>
          <span className="h-1 w-16 rounded-full bg-[#d4a537]" aria-hidden />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {REASONS.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#faf5ec] text-[#d4a537]">
                <Icon className="size-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#7f1416]">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#767676]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
