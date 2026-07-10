"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HERO_IMAGES = [
  "/images/Hero-section_image.png",
  "/images/hero-2.png",
  "/images/hero-3.png",
];

// Motion variants for stagger effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }, // custom sleek easing
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.5 },
  },
};

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Parallax Effect on the background
  useGSAP(
    () => {
      if (!bgWrapperRef.current) return;

      gsap.to(bgWrapperRef.current, {
        y: "20%", // Parallax displacement
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="mx-auto w-full px-0 sm:px-6 lg:px-10 sm:mt-6 overflow-hidden">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-none sm:rounded-3xl lg:min-h-[640px] lg:flex-row">
        
        {/* Background Images with Cross-fade & GSAP Parallax */}
        <div ref={bgWrapperRef} className="absolute inset-x-0 -top-[20%] -bottom-[20%] z-0 bg-black">
          {HERO_IMAGES.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt="Freshly made pure ghee sweets from Sri Sai Baba Ghee Sweets"
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-1000 ease-in-out",
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent backdrop-blur-[0px]" />
        </div>

        {/* Left — content (Animated with Framer Motion) */}
        <motion.div
          className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-10 pb-8 text-text-cream sm:px-12 sm:py-16 lg:py-20 lg:pl-16 lg:pr-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="relative font-heading text-5xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl"
          >
            Made for
            <br />
            Every Celebration
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="relative mt-5 sm:mt-6 max-w-[380px] text-base sm:text-lg opacity-90 drop-shadow-md"
          >
            Pure ghee sweets, made with tradition and the finest ingredients.
          </motion.p>
          <motion.div variants={itemVariants} className="relative mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-brand-gold-light"
            >
              Order Now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-text-cream transition-all hover:gap-3 drop-shadow-md"
            >
              Explore Sweets
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — floating trust badge (Animated with Framer Motion) */}
        <motion.div
          className="relative z-10 flex flex-[1.2] flex-col items-center justify-end pb-10 pt-4 sm:pb-12 lg:items-end lg:justify-center lg:pb-0 lg:pt-0 lg:pr-12"
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-[90%] sm:w-auto rounded-3xl sm:rounded-[20px] bg-white/[0.08] backdrop-blur-lg border border-white/[0.15] px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
            <div className="absolute -top-px -left-px h-8 w-8 rounded-tl-[20px] border-t-2 border-l-2 border-brand-gold/60" />
            <div className="absolute -bottom-px -right-px h-8 w-8 rounded-br-[20px] border-b-2 border-r-2 border-brand-gold/60" />

            <div className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold">
                <ShieldCheck className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-heading text-2xl font-semibold leading-none text-white lg:text-3xl">
                  100%
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-white/70 uppercase">
                  Pure Ghee
                </p>
              </div>
            </div>

            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

            <div className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold">
                <Clock className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="font-heading text-2xl font-semibold leading-none text-white lg:text-3xl">
                  40+
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-white/70 uppercase">
                  Years of Trust
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
