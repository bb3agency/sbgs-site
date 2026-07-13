"use client";

import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";

/**
 * Bulk / corporate gifting CTA band. High-AOV enquiry channel: routes to the
 * contact page and, when a store phone is configured, a prefilled WhatsApp chat.
 */
export function BulkGiftingBand() {
  const config = useStoreConfig();
  const whatsappDigits = (config.contactPhone ?? "").replace(/\D/g, "");
  
  // If the number is 10 digits (no country code), add 91 (India) by default.
  // wa.me links do not use the "+" sign, just the digits.
  const waNumber = whatsappDigits
    ? whatsappDigits.length === 10
      ? `91${whatsappDigits}`
      : whatsappDigits
    : "";
    
  const waHref = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(
        "Hi! I'd like to enquire about bulk / corporate gifting orders.",
      )}`
    : "";

  return (
    <section className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-brand-maroon bg-[url('/images/corporate-mobile-viewport.png')] bg-cover bg-center p-8 text-text-cream md:flex-row md:items-center md:bg-[url('/images/corporate-desktop-viewport.png')] sm:p-12 lg:p-16">
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <div className="relative z-10 flex max-w-2xl flex-col gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
            <Gift className="size-7" aria-hidden />
          </div>
          <h3 className="font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Bulk &amp; Corporate Gifting
          </h3>
          <p className="mt-2 text-base sm:text-lg text-text-cream/80 leading-relaxed">
            Planning weddings, festivals, or looking to impress clients? Order in bulk with premium, hygienically packed hampers, custom packaging, and dedicated support.
          </p>
        </div>
        <div className="relative z-10 mt-4 flex w-full shrink-0 flex-wrap gap-4 md:mt-0 md:w-auto">
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-brand-gold px-8 text-base font-bold text-accent-foreground transition-all hover:scale-105 hover:bg-brand-gold-light hover:shadow-md"
            >
              <FaWhatsapp className="size-5" aria-hidden />
              Enquire on WhatsApp
            </a>
          ) : (
            <Link
              href="/locations"
              className="inline-flex h-14 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-brand-gold px-8 text-base font-bold text-accent-foreground transition-all hover:scale-105 hover:bg-brand-gold-light hover:shadow-md"
            >
              Contact Us
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
