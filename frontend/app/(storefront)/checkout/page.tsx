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
    <div className="flex flex-col bg-[#faf5ec] min-h-screen pb-16">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7f1416] via-[#7f1416] to-[#651013] py-10 md:py-14">
        <div className="absolute -top-16 right-16 size-56 rounded-full bg-[#d4a537] opacity-10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-12 -left-12 size-48 rounded-full bg-[#f5d88e] opacity-10 blur-3xl" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          {/* Lock icon */}
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Lock className="size-5 text-white" aria-hidden />
          </div>
          <h1 className="mb-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Secure Checkout
          </h1>
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-white/60 sm:gap-2 sm:text-sm" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#f5d88e]">Home</Link>
            <ChevronRight className="size-3" />
            <Link href="/cart" className="transition-colors hover:text-[#f5d88e]">Cart</Link>
            <ChevronRight className="size-3" />
            <span className="text-[#f5d88e]">Checkout</span>
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
                <div className={`flex flex-col items-center gap-1 ${active ? "" : "opacity-50"}`}>
                  <div
                    className={`flex size-8 items-center justify-center rounded-full text-xs font-extrabold transition-all ${
                      done
                        ? "bg-[#d4a537] text-white"
                        : active
                          ? "bg-white text-[#7f1416] shadow-lg"
                          : "border-2 border-white/30 text-white/60"
                    }`}
                  >
                    {done ? "✓" : step}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide ${active ? "text-white" : "text-white/50"}`}>
                    {label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className="mx-2 mb-5 h-px w-10 bg-white/20 sm:w-16" aria-hidden />
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
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04]">
              <div className="border-b border-[#f0ece8] bg-gradient-to-r from-[#faf5ec] to-white px-5 py-4">
                <h2 className="font-heading text-base font-bold text-[#7f1416]">Payment Options</h2>
              </div>

              <div className="flex flex-col gap-3 p-5">
                {/* Pay online */}
                <div className="flex items-start gap-3 rounded-xl border border-[#f0ece8] bg-[#faf5ec] p-3.5 transition-colors hover:border-[#f5d88e]">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7f1416]">
                    <CreditCard className="size-4 text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#7f1416]">Pay Online</p>
                    <p className="mt-0.5 text-xs text-[#999]">UPI, Cards, Wallets, Net Banking via Razorpay</p>
                  </div>
                </div>

                {/* COD */}
                {storeConfig.isCodEnabled ? (
                  <div className="flex items-start gap-3 rounded-xl border border-[#f0ece8] bg-[#faf5ec] p-3.5 transition-colors hover:border-[#f5d88e]">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7f1416]">
                      <Banknote className="size-4 text-white" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#7f1416]">Cash on Delivery</p>
                      <p className="mt-0.5 text-xs text-[#999]">Pay in cash when your order arrives</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
                    <p className="text-xs text-amber-800">Cash on Delivery is currently disabled.</p>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex items-start gap-3 rounded-xl border border-[#f0ece8] bg-[#faf5ec] p-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7f1416]">
                    <Truck className="size-4 text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#7f1416]">Live Shipping Estimate</p>
                    <p className="mt-0.5 text-xs text-[#999]">Calculated in real-time based on your pincode</p>
                  </div>
                </div>

                {/* Minimum order */}
                {storeConfig.minOrderValuePaise > 0 && (
                  <div className="flex items-start gap-3 rounded-xl border border-[#f0ece8] bg-[#faf5ec] p-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7f1416]">
                      <ShieldCheck className="size-4 text-white" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#7f1416]">Minimum Order</p>
                      <p className="mt-0.5 text-xs text-[#999]">
                        {formatPrice(storeConfig.minOrderValuePaise)} minimum cart value required
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security trust */}
            <div className="rounded-2xl bg-white p-4 ring-1 ring-black/[0.04]">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#767676]">
                <Lock className="size-3.5 text-[#7f1416]" aria-hidden />
                256-bit SSL encrypted checkout
              </div>
              <div className="mt-3 flex justify-center gap-4">
                {["UPI", "Visa", "Mastercard", "RuPay"].map((brand) => (
                  <span key={brand} className="rounded-md border border-[#f0ece8] bg-[#faf5ec] px-2 py-1 text-[10px] font-bold text-[#999]">
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
