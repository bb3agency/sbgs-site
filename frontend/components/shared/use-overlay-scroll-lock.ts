"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Scroll lock for overlays (cart sheet, mobile nav, modals) on Lenis routes.
 *
 * Why this exists instead of `document.body.style.overflow = "hidden"`:
 *
 * 1. Lenis (see SmoothScrollProvider) binds to the window as a `root` smooth
 *    scroller with `smoothWheel`. It drives scrolling from its own RAF loop, so
 *    `body { overflow: hidden }` does NOT stop it — the page kept scrolling
 *    behind open overlays, and Lenis's internal position drifted out of sync
 *    with the real scroll offset, leaving the page unscrollable ("stuck") after
 *    the overlay closed. `lenis.stop()` / `lenis.start()` is the supported way.
 *
 * 2. Each overlay used to write `document.body.style.overflow = ""` on close.
 *    With two overlays open (mobile nav → cart sheet), closing either one
 *    unlocked the body while the other was still open. The module-level counter
 *    below means the lock only lifts when the LAST overlay closes.
 *
 * The body style is still set as a fallback: admin/ops routes bypass Lenis
 * entirely, so they need the plain CSS lock.
 *
 * Scrollable content INSIDE an overlay must carry `data-lenis-prevent` so Lenis
 * ignores wheel events over it — without that, inner scroll areas feel frozen.
 */

let lockCount = 0;

export function useOverlayScrollLock(locked: boolean): void {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    if (lockCount === 1) {
      document.body.style.overflow = "hidden";
    }
    lenis?.stop();

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = "";
        lenis?.start();
      }
    };
  }, [locked, lenis]);
}
