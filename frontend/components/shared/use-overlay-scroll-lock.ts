"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Scroll lock for overlays (cart sheet, mobile nav, modals).
 *
 * Why this exists instead of `document.body.style.overflow = "hidden"`:
 *
 * 1. Lenis (see SmoothScrollProvider) binds to the window as a `root` smooth
 *    scroller with `smoothWheel`. It drives scrolling from its own RAF loop, so
 *    a plain `overflow: hidden` does NOT stop it — the page kept scrolling
 *    behind open overlays, and Lenis's internal position drifted out of sync
 *    with the real scroll offset, leaving the page unscrollable ("stuck") after
 *    the overlay closed. `lenis.stop()` / `lenis.start()` is the supported way,
 *    and Lenis's own stylesheet applies `overflow: clip` while stopped.
 *
 * 2. Each overlay used to write `document.body.style.overflow = ""` on close.
 *    With two overlays open (mobile nav -> cart sheet), closing either one
 *    unlocked the body while the other was still open. The module-level counter
 *    below means the lock only lifts when the LAST overlay closes.
 *
 * 3. On Lenis routes this must NOT touch `document.body.style` at all. Base UI
 *    dialogs run their own scroll lock that saves the inline overflow styles on
 *    open and restores them on close. Writing the same properties from here
 *    interleaves with that save/restore: a dialog opening over a locked overlay
 *    captures `hidden` as the "original" value and reinstates it on close,
 *    leaving the page permanently unscrollable. Lenis's stop() is sufficient on
 *    its own, so the body fallback is reserved for routes with no Lenis
 *    instance (the admin and ops consoles), and it restores the previous value
 *    rather than blanking the property.
 *
 * Scrollable content INSIDE an overlay must carry `data-lenis-prevent` so Lenis
 * ignores wheel events over it — without that, inner scroll areas feel frozen.
 */

let lockCount = 0;
let previousBodyOverflow: string | null = null;

/** True while any overlay currently holds the scroll lock. */
export function isOverlayScrollLocked(): boolean {
  return lockCount > 0;
}

export function useOverlayScrollLock(locked: boolean): void {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    if (lockCount === 1 && !lenis) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lenis?.stop();

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount > 0) return;

      if (previousBodyOverflow !== null) {
        document.body.style.overflow = previousBodyOverflow;
        previousBodyOverflow = null;
      }
      if (lenis) {
        lenis.start();
        // Re-measure before handing control back. While the lock was held the
        // page may have changed height (an overlay closing reveals content, a
        // route may have rendered underneath), and Lenis would otherwise keep
        // scrolling against the stale limit it measured before the lock.
        lenis.resize();
      }
    };
  }, [locked, lenis]);
}
