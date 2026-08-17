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

  return <SmoothScrollRoot pathname={pathname}>{children}</SmoothScrollRoot>;
}

function SmoothScrollRoot({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string | null;
}) {
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

  // On client-side navigation Next resets window scroll, but Lenis keeps its own
  // internal offset. The two then disagree and the new page cannot be scrolled
  // until something forces a resync — the "stuck after navigating" symptom.
  // Reset Lenis to the top and re-measure on every route change.
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    // start() clears any lock an overlay left behind if it unmounted mid-navigation.
    lenis.start();
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.resize();
    ScrollTrigger.refresh();
  }, [pathname]);

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
