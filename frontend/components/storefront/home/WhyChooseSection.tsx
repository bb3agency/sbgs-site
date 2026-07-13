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
import { APP_NAME } from "@/lib/constants";
import { motion, type Variants } from "framer-motion";

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
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function WhyChooseSection() {
  return (
    <section className="bg-[#e3e8d6]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Why Choose {APP_NAME}?
          </h2>
          <span className="h-1 w-16 rounded-full bg-brand-gold" aria-hidden />
        </div>

        <motion.div 
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {REASONS.map(({ title, desc, icon: Icon }) => (
            <motion.div
              key={title}
              variants={itemVariant}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:gap-3 sm:p-5"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-cream text-brand-gold sm:size-11">
                <Icon className="size-4 sm:size-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-xs font-bold text-brand-maroon sm:text-sm">{title}</p>
                <p className="mt-1 text-[10px] leading-snug text-muted-foreground sm:text-xs sm:leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
