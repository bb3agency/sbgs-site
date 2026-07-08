"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { cn } from "@/lib/utils";

interface Faq {
  q: string;
  a: string;
}

interface FaqGroup {
  title: string;
  items: Faq[];
}

function buildGroups(isCodEnabled: boolean): FaqGroup[] {
  return [
    {
      title: "Orders & Products",
      items: [
        {
          q: "What is the shelf life of your sweets?",
          a: "Our pure ghee sweets typically stay fresh for 10–15 days when stored in a cool, dry place. Milk-based sweets are best consumed within 3–4 days and kept refrigerated — storage guidance is included with every order.",
        },
        {
          q: "Are your sweets made with pure ghee?",
          a: "Yes. Every sweet is prepared with 100% pure ghee and the finest ingredients, in fresh small batches — no preservatives or artificial colours.",
        },
        {
          q: "Do you take bulk or festive orders?",
          a: "Absolutely. For weddings, festivals, return gifts and corporate hampers, reach out via our Contact page and our team will help with custom packaging and pricing.",
        },
      ],
    },
    {
      title: "Payment & Delivery",
      items: [
        {
          q: "Do you offer Cash on Delivery?",
          a: isCodEnabled
            ? "Yes — Cash on Delivery is available for eligible pincodes. You'll see the option at checkout if your address qualifies. Prepaid payments (UPI, cards, wallets) are accepted everywhere we ship."
            : "Cash on Delivery is currently unavailable. Prepaid payments (UPI, cards, net banking and wallets) are accepted everywhere we ship, secured by Razorpay.",
        },
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 3–5 business days depending on your location. Sweets are freshly packed and dispatched quickly so they reach you at their best. You can check serviceability for your pincode on our homepage.",
        },
        {
          q: "How is my order packed?",
          a: "Orders are sealed in food-safe, tamper-evident packaging designed to keep sweets fresh and secure in transit.",
        },
      ],
    },
    {
      title: "Returns & Support",
      items: [
        {
          q: "What if I'm not satisfied with my order?",
          a: "If something arrives damaged or below the quality you expected, contact us with a photo within 24 hours of delivery and we'll refund or replace it — no long forms, no back-and-forth.",
        },
        {
          q: "How do I track my order?",
          a: "Once signed in, head to My Orders in your account to see the latest status and tracking for every order.",
        },
      ],
    },
  ];
}

export default function FaqPage() {
  const config = useStoreConfig();
  const { isCodEnabled } = config;
  const groups = useMemo(() => buildGroups(isCodEnabled), [isCodEnabled]);

  // Support channel: WhatsApp (from the store phone) when configured.
  const whatsappDigits = (config.contactPhone ?? "").replace(/\D/g, "");
  const waNumber = whatsappDigits
    ? whatsappDigits.length === 10
      ? `91${whatsappDigits}`
      : whatsappDigits
    : "";
  const waHref = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent("Hi! I have a question.")}`
    : "";
  // Track open state by a stable "groupIndex-itemIndex" key; first item open.
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  return (
    <div className="flex min-h-screen flex-col pb-16">
      <section className="bg-brand-green py-16 text-center sm:py-20">
        <div className="mx-auto flex w-full flex-col items-center px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Questions, answered
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-brand-gold sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <nav
            className="mt-6 flex items-center gap-2 text-sm font-medium text-text-cream/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <ChevronRight className="size-3" aria-hidden />
            <span className="text-brand-gold">FAQ</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pt-12 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10">
          {groups.map((group, gi) => (
            <div key={group.title}>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-foreground">
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.items.map((faq, ii) => {
                  const key = `${gi}-${ii}`;
                  const open = openKey === key;
                  return (
                    <div
                      key={key}
                      className="overflow-hidden rounded-xl border border-brand-maroon/10 bg-card"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : key)}
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
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-card p-8 text-center">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Still have a question?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Our team is happy to help with orders, gifting and anything else.
          </p>
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3 text-sm font-semibold text-text-cream transition-colors hover:opacity-90"
            >
              <FaWhatsapp className="size-4" aria-hidden />
              Chat on WhatsApp
            </a>
          ) : (
            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-maroon px-7 py-3 text-sm font-semibold text-text-cream transition-colors hover:bg-brand-maroon-dark"
            >
              Browse Sweets
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
