"use client";

import { useState } from "react";
import {
  Truck,
  Clock,
  BadgeIndianRupee,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";

const FEATURES = [
  { title: "Same-Day Dispatch", desc: "Order before 1 PM", icon: Clock },
  { title: "COD Available", desc: "On eligible orders", icon: BadgeIndianRupee },
  { title: "Secure Packing", desc: "Safe & hygienic", icon: ShieldCheck },
  { title: "Delivery in 3-5 Working Days", desc: "Pan-India", icon: PackageCheck },
];

const PROMISES = [
  "Carefully Packed",
  "On-Time Delivery",
  "Live Order Tracking",
  "Dedicated Support",
];

export function DeliveryServiceability() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<null | "ok" | "invalid">(null);

  // Lightweight client-side check only — real serviceability is validated at cart/checkout.
  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(/^\d{6}$/.test(pincode.trim()) ? "ok" : "invalid");
  };

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-border bg-[#faf7f2] p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left: truck + checker */}
            <div className="lg:col-span-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                <div
                  aria-hidden
                  className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-[#1f3d36] text-brand-gold shadow-inner sm:size-28"
                >
                  <Truck className="size-12 sm:size-14" strokeWidth={1.4} />
                </div>

                <div className="w-full text-center sm:text-left">
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Check Delivery &amp; Serviceability
                  </h2>
                  <span className="mx-auto mt-2 block h-1 w-14 rounded-full bg-brand-gold sm:mx-0" aria-hidden />

                  <form
                    onSubmit={handleCheck}
                    className="mt-4 flex w-full max-w-md flex-col gap-2 sm:flex-row"
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value.replace(/\D/g, ""));
                        setStatus(null);
                      }}
                      placeholder="Enter Pincode"
                      aria-label="Delivery pincode"
                      className="h-11 flex-1 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon"
                    />
                    <button
                      type="submit"
                      className="h-11 shrink-0 rounded-lg bg-brand-maroon px-6 text-sm font-bold text-white transition-colors hover:bg-brand-maroon-dark"
                    >
                      Check Availability
                    </button>
                  </form>
                  {status === "ok" ? (
                    <p className="mt-2 text-xs font-semibold text-[#3f7d4f]">
                      Great news — we deliver to {pincode}. Final serviceability is confirmed at checkout.
                    </p>
                  ) : status === "invalid" ? (
                    <p className="mt-2 text-xs font-semibold text-brand-maroon">
                      Please enter a valid 6-digit pincode.
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Feature row */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {FEATURES.map(({ title, desc, icon: Icon }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 size-5 shrink-0 text-brand-maroon" aria-hidden />
                    <div>
                      <p className="text-xs font-bold text-foreground">{title}</p>
                      <p className="text-[11px] text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: promises */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-[#f0d9a8] bg-[#fdf6e6] p-5 sm:p-6">
                <p className="font-heading text-lg font-bold text-brand-maroon">
                  We Deliver Across India
                </p>
                <ul className="mt-4 space-y-3">
                  {PROMISES.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-[#3f7d4f]" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
