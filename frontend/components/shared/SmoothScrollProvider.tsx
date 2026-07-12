"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally for the app
gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The admin and ops consoles use fixed-height shells that scroll internally
  // inside their own <main> containers. Lenis binds to the window/root and
  // captures wheel events globally (smoothWheel), which starves those inner
  // scroll containers and makes the panels appear frozen. Smooth scrolling is a
  // storefront-only enhancement — bypass it entirely on the console routes.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/ops")) {
    return <>{children}</>;
  }

  return <SmoothScrollRoot>{children}</SmoothScrollRoot>;
}

function SmoothScrollRoot({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      // Feed GSAP's ticker time to Lenis to keep them perfectly in sync
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Sync ScrollTrigger when GSAP updates
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false} // Prevent Lenis from running its own internal RAF
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
