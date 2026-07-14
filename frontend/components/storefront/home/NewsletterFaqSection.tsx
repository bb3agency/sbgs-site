"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Faq {
  q: string;
  a: string;
}

interface NewsletterFaqSectionProps {
  isCodEnabled?: boolean;
}

function buildFaqs(isCodEnabled: boolean): Faq[] {
  return [
    {
      q: "What is the shelf life of your sweets?",
      a: "Our pure ghee sweets typically stay fresh for 10–15 days when stored in a cool, dry place. Milk-based sweets are best consumed within 3–4 days and kept refrigerated — storage guidance is included with every order.",
    },
    {
      q: "Do you offer Cash on Delivery?",
      a: isCodEnabled
        ? "Yes — Cash on Delivery is available for eligible pincodes. You'll see the option at checkout if your address qualifies. Prepaid payments (UPI, cards, wallets) are accepted everywhere we ship."
        : "Cash on Delivery is currently unavailable. Prepaid payments (UPI, cards, net banking and wallets) are accepted everywhere we ship, secured by Razorpay.",
    },
    {
      q: "How long does delivery take?",
      a: "Standard delivery takes 3–5 business days depending on your location. Sweets are freshly packed and dispatched quickly so they reach you at their best.",
    },
  ];
}

/** FAQ section (Newsletter was removed) */
export function NewsletterFaqSection({ isCodEnabled = false }: NewsletterFaqSectionProps) {
  const faqs = useMemo(() => buildFaqs(isCodEnabled), [isCodEnabled]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto w-full px-4 py-16 sm:py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center font-heading text-4xl font-semibold text-foreground sm:text-[2.75rem] sm:leading-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-brand-maroon/10 bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-foreground transition-colors hover:bg-brand-maroon/[0.02]"
                >
                  {faq.q}
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 transition-transform duration-300",
                      open && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
