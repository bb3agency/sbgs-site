"use client";

import { Sprout, FlaskConical, Users, HeartHandshake, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Sprout,
    title: "Native seeds, not hybrids",
    description:
      "We work with heirloom varieties our grandparents grew — richer flavour, denser nutrition, and built for our soil.",
    accent: "bg-brand-gold/20 text-brand-maroon",
  },
  {
    icon: FlaskConical,
    title: "Tested in independent labs",
    description:
      "Every batch is screened for 300+ pesticide residues by NABL-accredited labs before it ships from our facility.",
    accent: "bg-brand-gold/20 text-brand-maroon",
  },
  {
    icon: HeartHandshake,
    title: "Farmer-first sourcing",
    description:
      "We pay 30–40% above mandi rates and lock annual contracts so farmers can invest in chemical-free practices.",
    accent: "bg-[#fff5db] text-brand-maroon",
  },
  {
    icon: Users,
    title: "Built on customer trust",
    description:
      "Over 10,000 families across India have made Sri Sai Baba Ghee Sweets part of their weekly kitchen. Reviews speak for us.",
    accent: "bg-[#e8f3ff] text-brand-maroon",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const pillarVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ValuePillars() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <SectionHeading
            eyebrow="Why Sri Sai Baba Ghee Sweets"
            title="Four uncompromising standards behind every order."
            description="We don't claim to be the cheapest. We claim to be honest about what's in your basket — and back it up with paperwork you can verify."
            align="center"
            className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
          />
        </motion.div>

        <motion.div 
          className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PILLARS.map(({ icon: Icon, title, description, accent }, idx) => (
            <motion.article
              variants={pillarVariants}
              key={title}
              className="group relative flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-brand-maroon/8 bg-card p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-maroon/20 hover:shadow-[0_24px_60px_-24px_rgba(35,64,61,0.25)]"
            >
              <div
                className={`flex size-14 items-center justify-center rounded-2xl ${accent} transition-transform group-hover:scale-110`}
              >
                <Icon className="size-6" aria-hidden />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <span className="font-mono text-[11px] font-bold tracking-wider text-brand-gold">
                  0{idx + 1}
                </span>
                <h3 className="font-heading text-lg font-bold leading-tight text-brand-maroon sm:text-xl">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
