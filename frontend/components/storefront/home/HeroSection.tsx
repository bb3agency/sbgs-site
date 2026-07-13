"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HERO_IMAGES = [
  "/images/Hero-section_image.png",
  "/images/hero-2.png",
  "/images/hero-3-v2.png",
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
    <section ref={containerRef} className="w-full overflow-hidden">
      <div className="relative flex min-h-[480px] flex-col overflow-hidden sm:min-h-[600px] lg:min-h-[640px] lg:flex-row">
        
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
          className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-8 pb-6 text-text-cream sm:px-12 sm:py-16 lg:py-20 lg:pl-16 lg:pr-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="relative font-heading text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-7xl"
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


      </div>
    </section>
  );
}
