"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const COLLAGE_IMAGES = [
  { src: "/images/sweets/IMG_20260612_163129.jpg", alt: "Freshly prepared ghee sweets" },
  { src: "/images/sweets/IMG_20260612_164305.jpg", alt: "Traditional sweets arranged for packing" },
  { src: "/images/sweets/IMG_20260612_165401.jpg", alt: "Assorted pure ghee sweets" },
  { src: "/images/sweets/IMG_20260612_170752.jpg", alt: "Handcrafted sweets from our kitchen" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const textPanelVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 },
  },
};

export function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for pinning the right panel
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 15%", // When the top of the container hits 15% from top of viewport
          end: () => {
             // Unpin when the bottom of the left column reaches the bottom of the pinned panel
             const leftHeight = leftColRef.current?.offsetHeight || 0;
             const rightHeight = panelRef.current?.offsetHeight || 0;
             return `+=${Math.max(0, leftHeight - rightHeight)}`;
          },
          pin: panelRef.current,
          pinSpacing: false, // Don't push content down, let the left side scroll past
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="mx-auto w-full max-w-[1440px] px-3 sm:px-6 lg:px-10 py-10 sm:py-20">
      {/* Note: items-start allows the left column to be taller and scroll while right is pinned */}
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 relative">
        
        {/* Modern Staggered Collage */}
        <motion.div 
          ref={leftColRef}
          className="grid grid-cols-2 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col gap-4 pt-10 sm:gap-6 sm:pt-16">
            <motion.div variants={imageVariants} className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[0].src}
                alt={COLLAGE_IMAGES[0].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
            <motion.div variants={imageVariants} className="group relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[1].src}
                alt={COLLAGE_IMAGES[1].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
            {/* Adding extra height to the left column to make the pin more pronounced on desktop */}
            <motion.div variants={imageVariants} className="hidden lg:block group relative aspect-square overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-sm mt-6">
              <Image
                src={COLLAGE_IMAGES[0].src} // Re-using for visual height in the grid
                alt="More fresh sweets"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6">
            <motion.div variants={imageVariants} className="group relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[2].src}
                alt={COLLAGE_IMAGES[2].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
            <motion.div variants={imageVariants} className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-sm">
              <Image
                src={COLLAGE_IMAGES[3].src}
                alt={COLLAGE_IMAGES[3].alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Elegant Green Panel (Pinned) */}
        <motion.div 
          ref={panelRef}
          className="relative flex flex-col items-start justify-center overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-brand-green px-6 py-12 text-text-cream sm:px-12 lg:px-16 lg:py-24 shadow-lg lg:min-h-[500px]"
          variants={textPanelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06)_0%,transparent_60%)]"
            aria-hidden
          />
          <div className="mb-8 flex items-center gap-3 text-brand-gold" aria-hidden>
            <span className="h-px w-12 bg-brand-gold/60" />
            <Sparkle className="size-3.5 fill-current" />
            <span className="h-px w-12 bg-brand-gold/60" />
          </div>
          <h2 className="font-heading text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-[3.25rem]">
            Our Story of Purity
            <br />
            in Every Sweet
          </h2>
          <p className="mt-6 max-w-[420px] text-lg font-medium opacity-90 leading-relaxed text-[#e6ece9]">
            Handcrafted with love, our sweets are made from the finest
            ingredients to bring you unmatched taste in every bite.
          </p>
          <Link
            href="/about"
            className="mt-12 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-cream px-8 text-[15px] font-bold text-brand-green transition-all hover:scale-105 hover:bg-white hover:shadow-md"
          >
            Explore Our Story
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
