"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Faq {
  q: string;
  a: string;
}

interface FaqSectionProps {
  isCodEnabled?: boolean;
}

function buildFaqs(isCodEnabled: boolean): Faq[] {
  return [
    {
      q: "What kind of ghee do you use in your sweets?",
      a: "Every product from Sri Sai Baba Ghee Sweets is made exclusively with 100% pure desi cow ghee. We never use vanaspati, dalda, or palm oil — the richness you taste is real, traditional, and unadulterated.",
    },
    {
      q: "Do you offer Cash on Delivery?",
      a: isCodEnabled
        ? "Yes — COD is available when enabled for your delivery pincode. You'll see the option at checkout if your address qualifies. Prepaid orders (UPI, cards, wallets) are accepted everywhere we ship."
        : "Cash on Delivery is currently unavailable. Prepaid orders (UPI, cards, wallets) are accepted everywhere we ship.",
    },
    {
      q: "How fresh are your sweets?",
      a: "Our master halwais prepare sweets fresh every morning in small batches. Orders are packed the same day and dispatched for delivery — so what arrives at your door is as fresh as it gets.",
    },
    {
      q: "What if I'm not satisfied with my order?",
      a: "If something arrives damaged, spoiled, or below the quality you expected, message us with a photo within 24 hours of delivery and we'll refund or replace it — no long forms, no back-and-forth.",
    },
    {
      q: "Do you sell festive gift boxes?",
      a: "Absolutely! We offer premium festive assortment boxes for Diwali, Raksha Bandhan, weddings, and more. Custom packaging is available for bulk orders — reach out to us on WhatsApp to discuss.",
    },
  ];
}

export function FaqSection({ isCodEnabled = false }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = useMemo(() => buildFaqs(isCodEnabled), [isCodEnabled]);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Sticky heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fdf0d5] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B1D2A]">
                <span
                  className="size-1.5 rounded-full bg-[#D4A537]"
                  aria-hidden
                />
                Questions, answered
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.1] tracking-tight text-[#6B1D2A] sm:text-4xl lg:text-5xl">
                Everything you wanted to ask before you order.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#6b6060]">
                We&apos;ve answered the ones we get most. If yours isn&apos;t
                here, our team replies on WhatsApp within an hour.
              </p>

              <Link
                href="https://wa.me/919440445006"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#6B1D2A] px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#501620] hover:shadow-lg"
              >
                <MessageCircle className="size-4" />
                Chat with us on WhatsApp
              </Link>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className={cn(
                      "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                      isOpen
                        ? "border-[#6B1D2A]/20 shadow-[0_12px_30px_-18px_rgba(107,29,42,0.25)]"
                        : "border-[#ece3d8]",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#fdf8f3] sm:px-6 sm:py-6"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-bold text-[#6B1D2A] sm:text-lg">
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
                          isOpen
                            ? "bg-[#6B1D2A] text-white"
                            : "bg-[#fdf0d5] text-[#6B1D2A]",
                        )}
                        aria-hidden
                      >
                        {isOpen ? (
                          <Minus className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-6 text-sm leading-relaxed text-[#6b6060] sm:px-6 sm:text-[15px]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
