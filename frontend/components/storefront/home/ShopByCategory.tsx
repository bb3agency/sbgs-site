"use client";

import Link from "next/link";
import {
  Gift,
  Cookie,
  Droplet,
  ShoppingBasket,
  Leaf,
  Briefcase,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";
import { Stagger, StaggerItem } from "@/components/shared/motion/Stagger";

interface CategoryTile {
  label: string;
  icon: LucideIcon;
  href: string;
  iconColor: string;
  iconBg: string;
}

const TILES: CategoryTile[] = [
  { label: "Festive Boxes", icon: Gift, href: "/products", iconColor: "text-[#7f1416]", iconBg: "bg-[#f7e3e3]" },
  { label: "Daily Fresh Sweets", icon: Cookie, href: "/products", iconColor: "text-[#b07a1e]", iconBg: "bg-[#f9eccf]" },
  { label: "Ghee Specials", icon: Droplet, href: "/products", iconColor: "text-[#d4a537]", iconBg: "bg-[#f9f0d8]" },
  { label: "Dry Fruit Premiums", icon: ShoppingBasket, href: "/products", iconColor: "text-[#8a5a2b]", iconBg: "bg-[#f1e3d2]" },
  { label: "Sugar-Free", icon: Leaf, href: "/products", iconColor: "text-[#5b7d52]", iconBg: "bg-[#e7efe0]" },
  { label: "Corporate Gifting", icon: Briefcase, href: "/products", iconColor: "text-[#7f1416]", iconBg: "bg-[#f1e2cf]" },
  { label: "Wedding Favors", icon: Heart, href: "/products", iconColor: "text-[#b03a4a]", iconBg: "bg-[#f7e0e3]" },
];

export function ShopByCategory() {
  return (
    <section className="bg-[#e3e8d6]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <OrnamentHeading
          lead="Flavours for Every"
          accent="Moment"
          className="mb-10"
        />
        <Stagger className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {TILES.map(({ label, icon: Icon, href, iconColor, iconBg }, idx) => (
            <StaggerItem key={label} index={idx}>
              <Link
                href={href}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-[#efe8e4] bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4a537] hover:shadow-lg sm:p-5"
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 sm:size-14`}
                >
                  <Icon className="size-6 sm:size-7" strokeWidth={1.6} />
                </span>
                <span className="text-xs font-bold text-[#3a2218] sm:text-sm">
                  {label}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
