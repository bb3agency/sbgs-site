import { Droplets, Sparkles, ShieldCheck, Award } from "lucide-react";

const PILLARS = [
  {
    icon: Droplets,
    title: "100% Pure Ghee",
    desc: "Every sweet is made with pure cow ghee — never vanaspati or shortcuts.",
  },
  {
    icon: Sparkles,
    title: "Made Fresh Daily",
    desc: "Prepared in small batches so what reaches you is fresh, not warehoused.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienically Packed",
    desc: "Food-safe, tamper-evident packaging that keeps sweets fresh in transit.",
  },
  {
    icon: Award,
    title: "40 Years of Trust",
    desc: "Four decades of tradition, taste and the same uncompromised quality.",
  },
];

/** "Why Sri Sai Baba" USP band — premium positioning between product sections. */
export function WhyChooseBand() {
  return (
    <section className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
          Why Sri Sai Baba
        </p>
        <h2 className="mx-auto max-w-2xl font-heading text-4xl font-semibold text-foreground sm:text-5xl">
          Purity You Can Taste in Every Bite
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="flex flex-col items-center rounded-2xl bg-card p-8 text-center transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
              <pillar.icon className="size-7" aria-hidden />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
