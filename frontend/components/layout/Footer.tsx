import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import { NewsletterForm } from "@/components/client/NewsletterForm";
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
    title: "Shop",
    links: [
      { label: "All Sweets", href: "/products" },
      { label: "Festive Boxes", href: "/products" },
      { label: "Ghee Specials", href: "/products" },
      { label: "Dry Fruit Sweets", href: "/products" },
      { label: "Party Packs", href: "/products" },
      { label: "Gift Cards", href: "/products" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Track Order", href: "/orders" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Cancellation Policy", href: "/returns" },
      { label: "FAQs", href: "/about" },
      { label: "Contact Us", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Store Locator", href: "/locations" },
      { label: "Blog", href: "/about" },
      { label: "Corporate Orders", href: "/products" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/returns" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Cookie Policy", href: "/privacy" },
    ],
  },
];

const SOCIALS: Array<{ label: string; href: string; text?: string; icon?: typeof MessageCircle }> = [
  { label: "Facebook", href: "https://facebook.com", text: "f" },
  { label: "Instagram", href: "https://instagram.com", text: "in" },
  { label: "YouTube", href: "https://youtube.com", text: "yt" },
  { label: "WhatsApp", href: "https://wa.me/919876543210", icon: MessageCircle },
];

const PAYMENTS = ["Razorpay", "VISA", "Mastercard", "UPI"];

export function Footer(_props: FooterProps) {
  return (
    <footer className="bg-[#5c0e16] text-[#f3e6da]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-white"
              aria-label={`${APP_NAME} home`}
            >
              <Image
                src={BRAND_LOGO_SRC}
                alt={`${APP_NAME} logo`}
                width={36}
                height={36}
                className="size-9 object-contain"
              />
              <span>{APP_NAME}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#d4a537]">
              Bringing sweetness to your celebrations since years. Made with pure
              ghee. Made with love.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, text, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white transition-colors hover:bg-[#d4a537] hover:text-[#5c0e16]"
                >
                  {Icon ? <Icon className="size-4" /> : text}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-[#d4a537]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#e7d2c4]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-[#d4a537]">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-[#e7d2c4]">
              Stay updated with offers and new arrivals
            </p>
            <NewsletterForm />
            <div className="mt-5 flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-[#5c0e16]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#e7d2c4] sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <span className="text-[#d4a537]">&hearts;</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
