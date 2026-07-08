"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
// Brand glyphs: lucide-react ships no brand icons — react-icons is the one
// sanctioned exception, used ONLY for social brand logos (tree-shaken imports).
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { useStoreConfig } from "@/components/providers/StoreConfigProvider";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import type { CategoryWithMeta } from "@/lib/categories";

interface FooterProps {
  categories: CategoryWithMeta[];
}

interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string }>;
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "All Sweets", href: "/products" },
      { label: "Best Sellers", href: "/products?sort=popularity" },
      { label: "Our Branches", href: "/locations" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "My Orders", href: "/orders" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "FAQs", href: "/faq" },
      { label: "Track Order", href: "/orders" },
    ],
  },
];

export function Footer(_props: FooterProps) {
  // Merchant-managed identity/contact (Admin → Settings → Store, via GET /store/config).
  // WhatsApp derives from the store contact phone — no separate setting. Items
  // render only when their value is configured, so there is no dead content.
  const config = useStoreConfig();
  const facebookUrl = config.facebookUrl?.trim() || "";
  const instagramUrl = config.instagramUrl?.trim() || "";
  const contactPhone = config.contactPhone?.trim() || "";
  const contactEmail = config.contactEmail?.trim() || "";
  const storeAddress = config.storeAddress?.trim() || "";
  const storeState = config.storeState?.trim() || "";
  const fullAddress = [storeAddress, storeState].filter(Boolean).join(", ");
  const whatsappDigits = contactPhone.replace(/\D/g, "");
  // wa.me needs a country code; default bare 10-digit Indian numbers to +91.
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits.length === 10 ? `91${whatsappDigits}` : whatsappDigits}`
    : "";
  const socials = [
    { label: "Facebook", href: facebookUrl, icon: <FaFacebookF className="size-4" aria-hidden /> },
    { label: "Instagram", href: instagramUrl, icon: <FaInstagram className="size-4" aria-hidden /> },
    { label: "WhatsApp", href: whatsappHref, icon: <FaWhatsapp className="size-4" aria-hidden /> },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border bg-brand-cream pt-16 sm:pt-20">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] lg:gap-12 sm:pb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label={`${APP_NAME} home`}
            >
              <Image
                src={BRAND_LOGO_SRC}
                alt={`${APP_NAME} logo`}
                width={40}
                height={40}
                className="size-10 object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-xl font-semibold text-brand-maroon">
                  Sri Sai Baba
                </span>
                <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  Ghee Sweets
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Bringing tradition, taste and trust to every bite since
              generations.
            </p>
            {socials.length > 0 ? (
              <div className="mt-6 flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-brand-maroon text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-cream"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-heading text-lg font-semibold text-brand-maroon">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-brand-maroon"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-brand-maroon">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-foreground/80">
              {fullAddress ? (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-maroon" aria-hidden />
                  <span>{fullAddress}</span>
                </li>
              ) : null}
              {contactPhone ? (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-maroon" aria-hidden />
                  <a href={`tel:${contactPhone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-brand-maroon">
                    {contactPhone}
                  </a>
                </li>
              ) : null}
              {contactEmail ? (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-maroon" aria-hidden />
                  <a href={`mailto:${contactEmail}`} className="break-all transition-colors hover:text-brand-maroon">
                    {contactEmail}
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-maroon" aria-hidden />
                <span>Mon – Sun: 9:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-brand-maroon">
              Privacy Policy
            </Link>
            <span aria-hidden>|</span>
            <Link href="/terms" className="transition-colors hover:text-brand-maroon">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
