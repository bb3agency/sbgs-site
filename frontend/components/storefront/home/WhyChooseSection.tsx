"use client";

import {
  Droplet,
  Clock,
  Package,
  Building2,
  Truck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";
import { Stagger, StaggerItem } from "@/components/shared/motion/Stagger";

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
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <OrnamentHeading
          lead="Crafted with"
          accent="Devotion"
          subtitle="Why thousands of families trust Sri Sai Baba Ghee Sweets for their celebrations."
          className="mb-10"
        />

        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {REASONS.map(({ title, desc, icon: Icon }, idx) => (
            <StaggerItem
              key={title}
              index={idx}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-[#efe8e4] bg-[#faf7f2] p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4a537] hover:shadow-lg sm:p-5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#faf5ec] text-[#d4a537] transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#7f1416]">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#767676]">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
