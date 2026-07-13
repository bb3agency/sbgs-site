"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const textPanelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!bgWrapperRef.current) return;

      gsap.to(bgWrapperRef.current, {
        y: "20%", // Parallax displacement
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full">
      {/* Container with overflow-hidden for parallax bounds */}
      <div 
        ref={containerRef}
        className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-brand-green px-6 py-20 text-center text-text-cream sm:px-12 lg:px-16 lg:py-32"
      >
        {/* Parallax Background */}
        <div ref={bgWrapperRef} className="absolute inset-x-0 -bottom-[30%] -top-[30%] z-0">
          {/* Mobile Background */}
          <Image
            src="/images/story-bg-mobile.png"
            alt="Our Story"
            fill
            sizes="100vw"
            className="object-cover opacity-80 sm:hidden"
          />
          {/* Desktop Background */}
          <Image
            src="/images/story-bg.png"
            alt="Our Story"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="hidden object-cover opacity-80 sm:block"
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content Panel */}
        <motion.div 
          className="relative z-10 flex flex-col items-center"
          variants={textPanelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="mb-8 flex items-center justify-center gap-3 text-brand-gold" aria-hidden>
            <span className="h-px w-12 bg-brand-gold/60 sm:w-16" />
            <Sparkle className="size-3.5 fill-current" />
            <span className="h-px w-12 bg-brand-gold/60 sm:w-16" />
          </div>
          <h2 className="max-w-2xl font-heading text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-[3.25rem]">
            Our Story of Purity
            <br className="hidden sm:block" />
            {" "}in Every Sweet
          </h2>
          <p className="mt-6 max-w-[600px] text-lg font-medium leading-relaxed text-[#e6ece9] opacity-90">
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
      </div>
    </section>
  );
}
