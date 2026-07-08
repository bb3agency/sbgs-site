"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number; // Kept for backwards compatibility but not used here
  delay?: number;   // Kept for backwards compatibility but not used here
  as?: "div" | "ul";
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: StaggerProps) {
  const Tag = as;

  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li" | "article" | "h2" | "h3" | "p" | "span" | "button";
  index?: number;
}

export function StaggerItem({
  children,
  className,
  distance = 24,
  as = "div",
  index = 0,
}: StaggerItemProps) {
  // Polymorphic `motion[as]` demands a per-tag ref type; a div ref is
  // structurally safe for every allowed tag here.
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  // Collapse the polymorphic tag union to one concrete signature — the
  // rendered element is still the requested `as` tag at runtime.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ 
        duration: 0.55, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08 // 0.08s stagger per index
      }}
    >
      {children}
    </MotionTag>
  );
}
