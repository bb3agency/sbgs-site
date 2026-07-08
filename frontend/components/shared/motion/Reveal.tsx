"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  once?: boolean;
}

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  none: {},
};

/**
 * Scroll-triggered entry animation (fade + slide) using Framer's whileInView.
 *
 * SSR-safe: until mounted (server render + first client paint) it renders a plain
 * visible element, so content can never be stuck hidden if JS doesn't run. After
 * mount it swaps to the animated element, which fades in as it scrolls into view.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance = 32,
  duration = 0.6,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  // Polymorphic `motion[as]` demands a per-tag ref type; a div ref is
  // structurally safe for every allowed tag here.
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  
  // Collapse the polymorphic tag union to one concrete signature — the
  // rendered element is still the requested `as` tag at runtime.
  const MotionTag = motion[as] as typeof motion.div;
  const offset = OFFSETS[direction];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: (offset.x ?? 0) * distance, y: (offset.y ?? 0) * distance }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: (offset.x ?? 0) * distance, y: (offset.y ?? 0) * distance }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
