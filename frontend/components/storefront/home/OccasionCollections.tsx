"use client";

import Image from "next/image";
import Link from "next/link";
import { OrnamentHeading } from "./OrnamentHeading";
import { Stagger, StaggerItem } from "@/components/shared/motion/Stagger";

interface Occasion {
  label: string;
  image: string;
  href: string;
}

const OCCASIONS: Occasion[] = [
  { label: "Weddings", image: "/images/sweets/IMG_20260612_163405.jpg", href: "/products" },
  { label: "Festivals", image: "/images/sweets/IMG_20260612_163953.jpg", href: "/products" },
  { label: "Housewarming", image: "/images/sweets/IMG_20260612_164305.jpg", href: "/products" },
  { label: "Corporate Gifting", image: "/images/sweets/IMG_20260612_165401.jpg", href: "/products" },
  { label: "Birthday Gifts", image: "/images/sweets/IMG_20260612_170752.jpg", href: "/products" },
  { label: "Return Gifts", image: "/images/sweets/IMG_20260612_171151.jpg", href: "/products" },
];

export function OccasionCollections() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <OrnamentHeading
          lead="Collections for Every"
          accent="Occasion"
          className="mb-10"
        />

        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {OCCASIONS.map(({ label, image, href }, idx) => (
            <StaggerItem key={label} index={idx}>
              <Link href={href} className="group flex flex-col gap-2.5">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#efe8e4] shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg">
                  <Image
                    src={image}
                    alt={`${label} sweet collection`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#7f1416]/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <span className="text-center text-sm font-bold text-[#3a2218] transition-colors group-hover:text-[#7f1416]">
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
