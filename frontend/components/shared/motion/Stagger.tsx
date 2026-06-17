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
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const MotionTag = motion[as];

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
