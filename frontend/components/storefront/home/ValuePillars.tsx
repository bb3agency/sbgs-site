import { Award, Flame, HandHeart, Heart, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Award,
    title: "Loved By India",
    description: "Loved by 5 lakh+ customers",
    accent: "bg-transparent text-white border border-white/20",
  },
  {
    icon: HandHeart,
    title: "Handmade",
    description: "Every piece is made with love",
    accent: "bg-transparent text-white border border-white/20",
  },
  {
    icon: Flame,
    title: "Ships in 5-7 Days",
    description: "Write to us to expedite your order",
    accent: "bg-transparent text-white border border-white/20",
  },
  {
    icon: Heart, // We might need a different icon for no preservatives if available
    title: "No Preservatives",
    description: "Pure taste, naturally fresh",
    accent: "bg-transparent text-white border border-white/20",
  },
];

export function ValuePillars() {
  return (
    <section className="bg-[#6B1D2A]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* We can omit the section heading if the image doesn't have one, but let's keep it styled for maroon background if needed. Actually, the scratchpad says: "Horizontal layout of 4 key value pillars/trust badges with white icons and text". No heading mentioned. Let's make it a horizontal layout. */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, description, accent }) => (
            <article
              key={title}
              className="group relative flex flex-col items-center gap-4 text-center transition-all duration-300 hover:-translate-y-1 sm:p-4"
            >
              <div
                className={`flex size-16 items-center justify-center rounded-full ${accent} transition-transform group-hover:scale-110`}
              >
                <Icon className="size-8" aria-hidden />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <h3 className="font-heading text-xl font-bold leading-tight text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
