import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import type { CategoryWithMeta } from "@/lib/categories";

interface FooterProps {
  categories: CategoryWithMeta[];
}

export function Footer({ categories }: FooterProps) {
  return (
    <footer className="relative bg-[#6B1515] text-[#FAF5EC] mt-12">
      {/* Scalloped Border Decoration */}
      <div 
        className="absolute top-0 left-0 right-0 -mt-3 h-3 bg-repeat-x z-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' width='24' height='12'%3E%3Cpath d='M0 12 A 12 12 0 0 0 24 12 Z' fill='%236B1515'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 12px'
        }} 
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Quick Links */}
          <div className="flex flex-col">
            <h3 className="mb-6 font-serif text-lg font-normal italic tracking-wide text-[#D4A537] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-4 font-['Montserrat'] text-sm text-[#FAF5EC]/80">
              <li>
                <Link href="/categories/festive-collections" className="transition-colors hover:text-[#D4A537]">
                  Bespoke Weddings
                </Link>
              </li>
              <li>
                <Link href="/categories/corporate-gifting" className="transition-colors hover:text-[#D4A537]">
                  Corporate Gifting
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-[#D4A537]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/locations" className="transition-colors hover:text-[#D4A537]">
                  Our Locations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#D4A537]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Policies */}
          <div className="flex flex-col">
            <h3 className="mb-6 font-serif text-lg font-normal italic tracking-wide text-[#D4A537] uppercase">
              Policies
            </h3>
            <ul className="space-y-4 font-['Montserrat'] text-sm text-[#FAF5EC]/80">
              {[
                { label: "Payment & Shipping", href: "/shipping" },
                { label: "Return & Refund", href: "/returns" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms and Conditions", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[#D4A537]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h3 className="mb-6 font-serif text-lg font-normal italic tracking-wide text-[#D4A537] uppercase">
              Contact
            </h3>
            <ul className="space-y-5 font-['Montserrat'] text-sm text-[#FAF5EC]/80">
              <li className="flex items-start gap-3 leading-relaxed">
                <MapPin className="mt-1 size-4 shrink-0 text-[#D4A537]" aria-hidden />
                <span>Sri Sai Baba Ghee Sweets, <br/>Nandyal, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#D4A537]" aria-hidden />
                <a href="tel:+919440445006" className="transition-colors hover:text-[#D4A537]">
                  +91 94404 45006
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#D4A537]" aria-hidden />
                <a href="mailto:hello@srisaibabagheesweets.com" className="transition-colors hover:text-[#D4A537]">
                  hello@srisaibabagheesweets.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="mb-6 font-serif text-lg font-normal italic tracking-wide text-[#D4A537] uppercase">
              Newsletter
            </h3>
            <p className="mb-6 font-['Montserrat'] text-sm leading-relaxed text-[#FAF5EC]/80">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative flex max-w-sm items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border-b border-[#FAF5EC]/30 bg-transparent py-2 pr-10 font-['Montserrat'] text-sm text-[#FAF5EC] placeholder:text-[#FAF5EC]/50 focus:border-[#D4A537] focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#FAF5EC]/70 hover:text-[#D4A537]"
                aria-label="Subscribe"
              >
                <ArrowRight className="size-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#FAF5EC]/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <Image
              src={BRAND_LOGO_SRC}
              alt="Sri Sai Baba Ghee Sweets"
              width={160}
              height={80}
              className="h-12 w-auto object-contain grayscale invert brightness-200"
            />
          </div>
          <p className="text-center font-['Montserrat'] text-xs text-[#FAF5EC]/60 sm:text-left">
            &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
          <div className="flex gap-4">
             {[
              { label: "Facebook", letter: "f", href: "https://facebook.com" },
              { label: "Instagram", letter: "i", href: "https://instagram.com" }
            ].map((social) => (
              <a
                key={social.letter}
                href={social.href}
                className="flex size-8 items-center justify-center rounded-full border border-[#FAF5EC]/30 text-sm font-bold uppercase transition-all duration-300 hover:border-[#D4A537] hover:bg-[#D4A537] hover:text-[#7F1416]"
                aria-label={social.label}
              >
                {social.letter}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
