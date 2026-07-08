"use client";

import { useState } from "react";
import { MapPin, Truck, ShieldCheck, PackageCheck, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { checkPincodeServiceability } from "@/lib/cart-api";
import { getApiErrorMessage } from "@/lib/error-messages";

const PROMISES = [
  { icon: Truck, title: "Pan-India Delivery", desc: "Shipped across the country" },
  { icon: PackageCheck, title: "Fresh & Secure Packing", desc: "Sealed to stay fresh" },
  { icon: ShieldCheck, title: "3–5 Day Delivery", desc: "Dispatched quickly" },
];

type Result =
  | { kind: "ok"; pincode: string }
  | { kind: "no"; pincode: string }
  | { kind: "error"; message: string };

/**
 * Delivery serviceability band — checks a pincode against the real backend
 * (`POST /cart/check-pincode`). Final serviceability is re-validated at checkout;
 * this is an early "do you deliver to me?" reassurance.
 */
export function PincodeServiceabilityBand() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = pincode.trim();
    if (!/^\d{6}$/.test(trimmed) || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await checkPincodeServiceability(trimmed);
      setResult(res.serviceable ? { kind: "ok", pincode: trimmed } : { kind: "no", pincode: trimmed });
    } catch (err) {
      setResult({ kind: "error", message: getApiErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <div className="overflow-hidden rounded-3xl bg-brand-green px-6 py-10 text-text-cream sm:px-10 sm:py-12 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Checker */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Delivery
            </p>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
              We Deliver Across India
            </h2>
            <p className="mt-3 max-w-md text-sm text-text-cream/80">
              Enter your pincode to check delivery availability for your area.
            </p>

            <form onSubmit={handleCheck} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-green" aria-hidden />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setResult(null);
                  }}
                  placeholder="Enter 6-digit pincode"
                  aria-label="Delivery pincode"
                  className="h-12 w-full rounded-full border border-transparent bg-brand-cream pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>
              <button
                type="submit"
                disabled={loading || pincode.length !== 6}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-gold px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-brand-gold-light disabled:opacity-60"
              >
                {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
                Check
              </button>
            </form>

            {result ? (
              <div className="mt-4 flex items-center gap-2 text-sm" role="status" aria-live="polite">
                {result.kind === "ok" ? (
                  <>
                    <CheckCircle2 className="size-4 text-brand-gold" aria-hidden />
                    <span>
                      Great news — we deliver to <strong>{result.pincode}</strong>.
                    </span>
                  </>
                ) : result.kind === "no" ? (
                  <>
                    <XCircle className="size-4 text-text-cream/70" aria-hidden />
                    <span>
                      We don&rsquo;t deliver to <strong>{result.pincode}</strong> yet. Try another pincode.
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="size-4 text-text-cream/70" aria-hidden />
                    <span>{result.message}</span>
                  </>
                )}
              </div>
            ) : null}
          </div>

          {/* Promises */}
          <div className="grid gap-4 sm:grid-cols-3">
            {PROMISES.map((p) => (
              <div key={p.title} className="rounded-2xl bg-text-cream/5 p-5 text-center">
                <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                  <p.icon className="size-5" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold">{p.title}</h3>
                <p className="mt-1 text-xs text-text-cream/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
