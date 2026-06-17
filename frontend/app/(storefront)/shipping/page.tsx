import Link from "next/link";
import { ChevronRight, Truck, MapPin, Clock, PackageCheck, AlertCircle, ShieldCheck } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `Shipping Policy — ${APP_NAME}`,
  description:
    "Delivery areas, charges, timelines, and how we pack and dispatch your sweets and gift boxes safely across India.",
};

const SECTIONS = [
  {
    icon: MapPin,
    title: "1. Delivery Areas",
    content:
      "We deliver our freshly made sweets and gift boxes to serviceable pincodes across India. Enter your delivery pincode at checkout — we will instantly confirm whether we can reach you. We are actively expanding to new areas.",
  },
  {
    icon: Truck,
    title: "2. Shipping Charges & Thresholds",
    content:
      "Our shipping fee and any free-delivery threshold are calculated at checkout based on your order total, weight, and the active configuration set by our operations team. You will always see the exact amount before placing your order — there are no hidden fees.",
  },
  {
    icon: Clock,
    title: "3. Delivery Schedule & Lead Time",
    content:
      "Orders are freshly prepared and dispatched promptly to preserve quality. Once your order ships, you will receive a real-time tracking AWB via email or WhatsApp. Standard delivery takes 3–5 working days across India, with same-day dispatch for orders placed before 1 PM in serviceable areas.",
  },
  {
    icon: PackageCheck,
    title: "4. Order Processing",
    content:
      "Orders placed before 1 PM are typically processed and dispatched the same day. Orders placed on Sundays or public holidays are processed the next working day. You will receive an order confirmation email immediately after placing your order.",
  },
  {
    icon: ShieldCheck,
    title: "5. Packaging & Handling",
    content:
      "Every order is packed in hygienic, gift-ready packaging designed to keep your sweets safe and fresh in transit. We prepare in small batches and dispatch quickly, so your sweets arrive in the best possible condition.",
  },
  {
    icon: AlertCircle,
    title: "6. Failed Deliveries",
    content:
      "If a delivery attempt is unsuccessful (no one available, locked premises), our courier will attempt re-delivery once. For orders that cannot be delivered, we will contact you to arrange an alternative. Please report any delivery issue to us within 24 hours of the delivery attempt.",
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="flex flex-col bg-[#faf5ec] min-h-screen pb-16">
      {/* ── Page Header Banner ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f5d88e] py-10 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d4a537]">
            Policies
          </p>
          <h1 className="mb-3 font-heading text-3xl font-bold text-[#7f1416] sm:mb-4 sm:text-4xl md:text-5xl">
            Shipping Policy
          </h1>
          <nav
            className="flex items-center gap-1.5 text-xs font-bold text-[#767676] sm:gap-2 sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-[#d4a537]">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#d4a537]">Shipping Policy</span>
          </nav>
          <p className="mt-3 text-xs font-medium text-[#7f1416]/60">
            Last updated: June 2026
          </p>
        </div>
        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-[#f5d88e] opacity-40 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-16 top-0 size-48 rounded-full bg-white opacity-40 blur-3xl"
          aria-hidden
        />
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:pt-12 lg:px-8">
        <div className="rounded-[20px] bg-white p-6 shadow-sm sm:p-8 lg:p-12">
          <div className="grid gap-8">
            {SECTIONS.map(({ icon: Icon, title, content }) => (
              <div key={title} className="flex gap-4 sm:gap-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#faf5ec] mt-0.5">
                  <Icon className="size-5 text-[#d4a537]" aria-hidden />
                </div>
                <div>
                  <h2 className="mb-2 font-heading text-lg font-bold text-[#7f1416]">
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#767676]">{content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[16px] border border-[#f5ebe0] bg-[#faf5ec] p-5 sm:p-6">
            <p className="text-sm font-medium text-[#767676]">
              <strong className="text-[#7f1416]">Questions about your delivery?</strong>{" "}
              Contact us at{" "}
              <a
                href="mailto:hello@sbgsweets.com"
                className="font-bold text-[#d4a537] hover:underline"
              >
                hello@sbgsweets.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919876543210"
                className="font-bold text-[#d4a537] hover:underline"
              >
                +91 98765 43210
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
