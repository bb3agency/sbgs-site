"use client";

import Link from "next/link";
import { Gift, Building2, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";

/**
 * Bulk / corporate gifting CTA band. High-AOV enquiry channel: routes to the
 * contact page and, when a store phone is configured, a prefilled WhatsApp chat.
 */
export function BulkGiftingBand() {
  const config = useStoreConfig();
  const whatsappDigits = (config.contactPhone ?? "").replace(/\D/g, "");
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
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bulk orders */}
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-brand-maroon p-8 text-text-cream sm:p-10">
          <div>
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
              <Gift className="size-6" aria-hidden />
            </div>
            <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
              Bulk &amp; Festive Orders
            </h3>
            <p className="mt-3 max-w-sm text-sm text-text-cream/80">
              Planning weddings, festivals or return gifts? Order in bulk with
              custom packaging and dedicated support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-brand-gold-light"
              >
                <FaWhatsapp className="size-4" aria-hidden />
                Enquire on WhatsApp
              </a>
            ) : (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-brand-gold-light"
              >
                Browse Sweets
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        </div>

        {/* Corporate gifting */}
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-brand-gold p-8 text-accent-foreground sm:p-10">
          <div>
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand-maroon/10 text-brand-maroon">
              <Building2 className="size-6" aria-hidden />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-brand-maroon sm:text-3xl">
              Corporate Gifting
            </h3>
            <p className="mt-3 max-w-sm text-sm text-accent-foreground/80">
              Impress clients and teams with premium, hygienically packed hampers
              — branded and delivered on schedule.
            </p>
          </div>
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-maroon px-6 py-3 text-sm font-semibold text-text-cream transition-colors hover:bg-brand-maroon-dark"
            >
              <FaWhatsapp className="size-4" aria-hidden />
              Talk to Our Team
            </a>
          ) : (
            <Link
              href="/products"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-maroon px-6 py-3 text-sm font-semibold text-text-cream transition-colors hover:bg-brand-maroon-dark"
            >
              Browse Sweets
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
