import type { Metadata } from "next";
import { connection } from "next/server";
import Script from "next/script";
import Link from "next/link";
import { ChevronRight, CreditCard, Banknote, Truck, ShieldCheck, AlertCircle, Lock } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutStartedTracker } from "@/components/checkout/CheckoutStartedTracker";
import { NOINDEX_METADATA } from "@/lib/seo";
import { getPublicStoreConfig } from "@/lib/storefront-settings";
import { formatPrice } from "@/lib/format-price";

export const metadata: Metadata = {
  title: "Checkout",
  ...NOINDEX_METADATA,
};

export default async function CheckoutPage() {
  await connection();
  const storeConfig = await getPublicStoreConfig();

  return (
    <div className="flex flex-col bg-[#FAF5EC] min-h-screen pb-16">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#7F1416] py-10 md:py-14">
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          {/* Lock icon */}
          <div className="mb-3 flex size-12 items-center justify-center border border-[#D4A537]/30 bg-white/5 backdrop-blur-sm">
            <Lock className="size-5 text-[#D4A537]" aria-hidden />
          </div>
          <h1 className="mb-3 font-serif text-3xl font-normal text-[#FAF5EC] sm:text-4xl italic">
            Secure Checkout
          </h1>
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#FAF5EC]/60 sm:gap-2 sm:text-sm font-['Montserrat'] uppercase" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#D4A537]">Home</Link>
            <ChevronRight className="size-3" />
            <Link href="/cart" className="transition-colors hover:text-[#D4A537]">Cart</Link>
            <ChevronRight className="size-3" />
            <span className="text-[#D4A537]">Checkout</span>
          </nav>

          {/* Progress steps */}
          <div className="flex items-center gap-0">
            {[
              { step: 1, label: "Cart", done: true },
              { step: 2, label: "Details", active: true },
              { step: 3, label: "Payment", done: false },
              { step: 4, label: "Confirm", done: false },
            ].map(({ step, label, done, active }, idx) => (
              <div key={step} className="flex items-center">
                <div className={`flex flex-col items-center gap-2 ${active ? "" : "opacity-50"}`}>
                  <div
                    className={`flex size-8 items-center justify-center text-xs font-bold transition-all font-['Montserrat'] ${
                      done
                        ? "bg-[#D4A537] text-[#7F1416]"
                        : active
                          ? "bg-[#FAF5EC] text-[#7F1416] shadow-md"
                          : "border border-[#FAF5EC]/30 text-[#FAF5EC]/60"
                    }`}
                  >
                    {done ? "✓" : step}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest font-['Montserrat'] ${active ? "text-[#FAF5EC]" : "text-[#FAF5EC]/50"}`}>
                    {label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className="mx-2 mb-6 h-px w-10 bg-[#FAF5EC]/20 sm:w-16" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <CheckoutStartedTracker />
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:pt-10 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <CheckoutForm />

          {/* ── Info Sidebar ─────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="border border-[#7F1416]/10 bg-white shadow-sm">
              <div className="border-b border-[#7F1416]/10 bg-[#FAF5EC]/30 px-5 py-4">
                <h2 className="font-serif text-lg font-normal text-[#7F1416] italic">Payment Options</h2>
              </div>

              <div className="flex flex-col gap-3 p-5">
                {/* Pay online */}
                <div className="flex items-start gap-3 border border-[#7F1416]/10 bg-white p-3.5 transition-colors hover:border-[#D4A537]">
                  <div className="flex size-9 shrink-0 items-center justify-center bg-[#7F1416]">
                    <CreditCard className="size-4 text-[#FAF5EC]" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#7F1416] font-['Montserrat']">Pay Online</p>
                    <p className="mt-0.5 text-xs text-[#7F1416]/70 font-['Montserrat']">UPI, Cards, Wallets, Net Banking via Razorpay</p>
                  </div>
                </div>

                {/* COD */}
                {storeConfig.isCodEnabled ? (
                  <div className="flex items-start gap-3 border border-[#7F1416]/10 bg-white p-3.5 transition-colors hover:border-[#D4A537]">
                    <div className="flex size-9 shrink-0 items-center justify-center bg-[#7F1416]">
                      <Banknote className="size-4 text-[#FAF5EC]" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#7F1416] font-['Montserrat']">Cash on Delivery</p>
                      <p className="mt-0.5 text-xs text-[#7F1416]/70 font-['Montserrat']">Pay in cash when your order arrives</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 border border-amber-200 bg-amber-50 p-3.5">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
                    <p className="text-xs text-amber-800 font-['Montserrat']">Cash on Delivery is currently disabled.</p>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex items-start gap-3 border border-[#7F1416]/10 bg-white p-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center bg-[#7F1416]">
                    <Truck className="size-4 text-[#FAF5EC]" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#7F1416] font-['Montserrat']">Live Shipping Estimate</p>
                    <p className="mt-0.5 text-xs text-[#7F1416]/70 font-['Montserrat']">Calculated in real-time based on your pincode</p>
                  </div>
                </div>

                {/* Minimum order */}
                {storeConfig.minOrderValuePaise > 0 && (
                  <div className="flex items-start gap-3 border border-[#7F1416]/10 bg-white p-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center bg-[#7F1416]">
                      <ShieldCheck className="size-4 text-[#FAF5EC]" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#7F1416] font-['Montserrat']">Minimum Order</p>
                      <p className="mt-0.5 text-xs text-[#7F1416]/70 font-['Montserrat']">
                        {formatPrice(storeConfig.minOrderValuePaise)} minimum cart value required
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security trust */}
            <div className="border border-[#7F1416]/10 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#7F1416]/70 font-['Montserrat'] uppercase tracking-widest">
                <Lock className="size-3.5 text-[#D4A537]" aria-hidden />
                256-bit SSL encrypted checkout
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["UPI", "Visa", "Mastercard", "RuPay"].map((brand) => (
                  <span key={brand} className="border border-[#7F1416]/10 bg-[#FAF5EC] px-2.5 py-1 text-[10px] font-bold text-[#7F1416] font-['Montserrat'] uppercase">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
