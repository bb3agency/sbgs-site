"use client";

import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";
import { motion } from "framer-motion";

const textPanelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function StorySection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-3 sm:px-6 lg:px-10 py-10 sm:py-20">
      {/* Elegant Green Panel (Full Width) */}
      <motion.div 
        className="relative flex flex-col items-center text-center justify-center overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-brand-green px-6 py-16 text-text-cream sm:px-12 lg:px-16 lg:py-28 shadow-lg w-full"
        variants={textPanelVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06)_0%,transparent_60%)]"
          aria-hidden
        />
        <div className="mb-8 flex items-center justify-center gap-3 text-brand-gold" aria-hidden>
          <span className="h-px w-12 sm:w-16 bg-brand-gold/60" />
          <Sparkle className="size-3.5 fill-current" />
          <span className="h-px w-12 sm:w-16 bg-brand-gold/60" />
        </div>
        <h2 className="font-heading text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-[3.25rem] max-w-2xl">
          Our Story of Purity
          <br className="hidden sm:block" />
          {" "}in Every Sweet
        </h2>
        <p className="mt-6 max-w-[600px] text-lg font-medium opacity-90 leading-relaxed text-[#e6ece9]">
          Handcrafted with love, our sweets are made from the finest
          ingredients to bring you unmatched taste in every bite.
        </p>
        <Link
          href="/about"
          className="mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-cream px-8 text-[15px] font-bold text-brand-green transition-all hover:scale-105 hover:bg-white hover:shadow-md"
        >
          Explore Our Story
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </motion.div>
    </section>
  );
}
