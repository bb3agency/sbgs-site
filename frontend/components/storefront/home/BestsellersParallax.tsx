"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function BestsellersParallax({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Parallax fade-up effect on scroll
      gsap.fromTo(
        containerRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Starts animating when top of container hits 85% of viewport
            end: "top 50%",
            scrub: 1, // Smooth scrubbing
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
