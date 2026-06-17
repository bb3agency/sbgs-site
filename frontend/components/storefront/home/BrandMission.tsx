"use client";

import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/shared/motion/Stagger";

export function BrandMission() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
      {/* Background image/video (using image for now) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sweets/IMG_20260612_165916.jpg"
          alt="Mithai preparation"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Stagger className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        {/* Decorative floral crown/divider placeholder */}
        <StaggerItem className="mb-6 flex justify-center text-[#FAF5EC]/70" index={0}>
          <svg viewBox="0 0 100 50" className="w-24 h-12" aria-hidden="true">
            <path d="M50 10 C60 30, 80 10, 90 20 C80 40, 60 40, 50 50 C40 40, 20 40, 10 20 C20 10, 40 30, 50 10Z" fill="currentColor" />
          </svg>
        </StaggerItem>

        <StaggerItem as="h2" className="mb-8 font-serif text-4xl font-normal text-white sm:text-5xl lg:text-6xl" index={1}>
          Mithai That Tells A <em className="italic">Story</em>
        </StaggerItem>

        {/* Play Button */}
        <StaggerItem index={2}>
          <button 
            className="group mb-8 flex size-20 items-center justify-center rounded-full border border-white bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#7F1416]"
            aria-label="Play video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-8 transition-transform group-hover:scale-110">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </StaggerItem>

        <StaggerItem as="p" className="font-serif text-lg italic text-white/90" index={3}>
          Crafting joy, one sweet at a time.
        </StaggerItem>
      </Stagger>
    </section>
  );
}
