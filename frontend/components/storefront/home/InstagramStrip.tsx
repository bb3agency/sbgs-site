"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";

// Import Elfsight widget dynamically with SSR disabled to prevent hydration errors and ensure DOM availability
const ElfsightWidget = dynamic(
  () => import("react-elfsight-widget").then((mod) => mod.ElfsightWidget),
  { ssr: false }
);

/**
 * "Follow us on Instagram" strip.
 * Fetches the latest posts via an Elfsight widget if the Instagram URL is configured.
 * If no URL is configured, this section is completely hidden.
 */
export function InstagramStrip() {
  const instagramUrl = useStoreConfig().instagramUrl?.trim() || "";
  
  if (!instagramUrl) {
    return null;
  }

  const handle = instagramUrl.replace(/\/+$/, "").split("/").pop() || "instagram";

  return (
    <section className="mx-auto w-full px-4 py-12 sm:px-6 sm:py-24 lg:px-10">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
          <FaInstagram className="size-6" aria-hidden />
        </div>
        <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
          Follow the Sweetness
        </h2>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-maroon transition-colors hover:text-brand-gold"
        >
          @{handle}
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>

      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl min-h-[400px]">
        {/* Elfsight Instagram Widget properly initialized for Next.js */}
        <ElfsightWidget widgetId="ad35a5aa-8ec2-4ae0-9ce9-2068b1f90bca" lazy={true} />
      </div>
    </section>
  );
}
