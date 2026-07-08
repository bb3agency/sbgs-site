"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";

/** Real SBGS photography used as the social gallery. */
const GALLERY = [
  "/images/sweets/IMG_20260612_173004.jpg",
  "/images/sweets/IMG_20260612_180122.jpg",
  "/images/sweets/IMG_20260612_181209.jpg",
  "/images/sweets/IMG_20260612_182521.jpg",
  "/images/sweets/IMG_20260612_190356.jpg",
  "/images/sweets/IMG_20260612_203546.jpg",
];

/**
 * "Follow us on Instagram" gallery strip — authenticity/social-proof signal.
 * The handle + tile links use the merchant's configured Instagram URL; when it
 * isn't set the tiles simply show the gallery without outbound links.
 */
export function InstagramStrip() {
  const instagramUrl = useStoreConfig().instagramUrl?.trim() || "";
  const handle = instagramUrl
    ? instagramUrl.replace(/\/+$/, "").split("/").pop() || "instagram"
    : "";

  return (
    <section className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
          <FaInstagram className="size-6" aria-hidden />
        </div>
        <h2 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Follow the Sweetness
        </h2>
        {instagramUrl ? (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-maroon transition-colors hover:text-brand-gold"
          >
            @{handle}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">
            A little peek into our kitchen and celebrations.
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
        {GALLERY.map((src, i) => {
          const tile = (
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <Image
                src={src}
                alt="Sri Sai Baba Ghee Sweets"
                fill
                sizes="(max-width: 640px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {instagramUrl ? (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-maroon/0 text-text-cream opacity-0 transition-all duration-300 group-hover:bg-brand-maroon/40 group-hover:opacity-100">
                  <FaInstagram className="size-6" aria-hidden />
                </div>
              ) : null}
            </div>
          );
          return instagramUrl ? (
            <a
              key={i}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View @${handle} on Instagram`}
            >
              {tile}
            </a>
          ) : (
            <div key={i}>{tile}</div>
          );
        })}
      </div>
    </section>
  );
}
