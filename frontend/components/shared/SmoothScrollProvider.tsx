"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
// Lenis's own stylesheet. This is REQUIRED, not optional, and its absence was
// the root cause of the intermittent "page won't scroll" reports. It supplies:
//   html.lenis, html.lenis body { height: auto }  — without it the document
//     height can be clamped and Lenis measures a scroll limit that is too short,
//     so scrolling dies partway down the page;
//   .lenis-stopped { overflow: clip }             — without it lenis.stop() only
//     halts the RAF loop, so native scrolling continues behind open overlays and
//     Lenis's internal offset drifts out of sync with the real one;
//   [data-lenis-prevent] { overscroll-behavior: contain } — without it scrolling
//     an overlay's inner list chains out to the page at its ends;
//   .lenis-smooth iframe { pointer-events: none }  — without it a wheel over an
//     embedded iframe is swallowed and the page appears frozen.
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isOverlayScrollLocked } from "@/components/shared/use-overlay-scroll-lock";

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

    // ScrollTrigger caches the scroll position and only recomputes it on native
    // scroll events. Lenis moves the page from its own RAF loop, so without this
    // subscription ScrollTrigger works from a stale offset — scrub animations
    // lag behind the page and triggers fire at the wrong point. This is the
    // documented Lenis + GSAP wiring.
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  // On client-side navigation Next resets window scroll, but Lenis keeps its own
  // internal offset. The two then disagree and the new page cannot be scrolled
  // until something forces a resync — the "stuck after navigating" symptom.
  // Reset Lenis to the top and re-measure on every route change.
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // An overlay can still be open across a navigation — the mobile nav and the
    // cart sheet both contain links, and they close in an effect that may run
    // after this one. Restarting Lenis and force-scrolling underneath an open
    // overlay is how the page ended up stuck: `force: true` bypasses the stopped
    // check and drives Lenis to 0 while the document is locked and cannot
    // follow, so the two disagree the moment the overlay closes. Leave a locked
    // scroller alone; the overlay's own cleanup restarts it.
    if (isOverlayScrollLocked()) return;

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
