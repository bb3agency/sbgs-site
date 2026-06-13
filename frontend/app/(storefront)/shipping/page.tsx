import Link from "next/link";
import { ChevronRight, Truck, MapPin, Clock, PackageCheck, AlertCircle, Flame } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `Shipping Policy — ${APP_NAME}`,
  description:
    "Delivery areas, charges, timelines, and how we handle fresh dispatch for your handcrafted ghee sweets orders.",
};

const SECTIONS = [
  {
    icon: MapPin,
    title: "1. Delivery Areas",
    content:
      "We deliver handcrafted ghee sweets to serviceable pincodes within Hyderabad and surrounding districts of Telangana, India. Enter your delivery pincode at checkout — we will instantly confirm whether we can reach you. We are actively expanding to new areas.",
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
      "Orders are freshly prepared and dispatched to preserve quality and taste. Once your order ships, you will receive a real-time tracking AWB via email or WhatsApp. Standard delivery takes 1–2 business days within Hyderabad. Delivery to surrounding areas may take up to 3 business days.",
  },
  {
    icon: PackageCheck,
    title: "4. Order Processing",
    content:
      "Orders placed before 6 PM are typically processed and dispatched the following morning. Orders placed on Sundays or public holidays are processed the next working day. You will receive an order confirmation email immediately after placing your order.",
  },
  {
    icon: Flame,
    title: "5. Freshness & Packaging",
    content:
      "All sweets are packed in food-grade, tamper-proof packaging to maintain freshness and presentation. We do not ship sweets that have been sitting in storage — your order is freshly prepared to ensure the best taste and quality.",
  },
  {
    icon: AlertCircle,
    title: "6. Failed Deliveries",
    content:
      "If a delivery attempt is unsuccessful (no one available, locked premises), our courier will attempt re-delivery once. For perishable orders that cannot be delivered, we will contact you to arrange an alternative. We are not liable for quality issues caused by a missed delivery that was not reported to us within 24 hours.",
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="flex flex-col bg-[#fdf8f3] min-h-screen pb-16">
      {/* ── Page Header Banner ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f5e6d8] py-10 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#D4A537]">
            Policies
          </p>
          <h1 className="mb-3 font-heading text-3xl font-bold text-[#6B1D2A] sm:mb-4 sm:text-4xl md:text-5xl">
            Shipping Policy
          </h1>
          <nav
            className="flex items-center gap-1.5 text-xs font-bold text-[#767676] sm:gap-2 sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-[#D4A537]">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#D4A537]">Shipping Policy</span>
          </nav>
          <p className="mt-3 text-xs font-medium text-[#6B1D2A]/60">
            Last updated: June 2026
          </p>
        </div>
        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-[#D4A537] opacity-20 blur-3xl"
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
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fdf0d5] mt-0.5">
                  <Icon className="size-5 text-[#D4A537]" aria-hidden />
                </div>
                <div>
                  <h2 className="mb-2 font-heading text-lg font-bold text-[#6B1D2A]">
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#767676]">{content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[16px] border border-[#ece3d8] bg-[#fdf8f3] p-5 sm:p-6">
            <p className="text-sm font-medium text-[#767676]">
              <strong className="text-[#6B1D2A]">Questions about your delivery?</strong>{" "}
              Contact us at{" "}
              <a
                href="mailto:hello@srisaibabagheesweets.com"
                className="font-bold text-[#D4A537] hover:underline"
              >
                hello@srisaibabagheesweets.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919440445006"
                className="font-bold text-[#D4A537] hover:underline"
              >
                +91 94404 45006
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
