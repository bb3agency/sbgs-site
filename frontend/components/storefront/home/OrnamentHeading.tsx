import { cn } from "@/lib/utils";

interface OrnamentHeadingProps {
  /** Plain leading text rendered in roman. */
  lead?: string;
  /** Emphasised word(s) rendered in italic accent. */
  accent?: string;
  /** Trailing roman text after the accent. */
  trail?: string;
  subtitle?: string;
  tone?: "maroon" | "cream";
  className?: string;
}

function Petal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-6 sm:size-7", className)} aria-hidden="true">
      <path
        d="M20 0 C25 15, 40 20, 40 20 C40 20, 25 25, 20 40 C15 25, 0 20, 0 20 C0 20, 15 15, 20 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Editorial centered section heading with ornamental flourishes and an italic accent word. */
export function OrnamentHeading({
  lead,
  accent,
  trail,
  subtitle,
  tone = "maroon",
  className,
}: OrnamentHeadingProps) {
  const titleColor = tone === "cream" ? "text-[#faf5ec]" : "text-[#7f1416]";
  const flourishColor = tone === "cream" ? "text-[#f5d88e]/60" : "text-[#d4a537]/60";

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="flex items-center justify-center gap-4">
        <Petal className={flourishColor} />
        <h2 className={cn("font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl", titleColor)}>
          {lead ? <span>{lead} </span> : null}
          {accent ? <em className="italic font-semibold">{accent}</em> : null}
          {trail ? <span> {trail}</span> : null}
        </h2>
        <Petal className={flourishColor} />
      </div>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-sm leading-relaxed",
            tone === "cream" ? "text-[#faf5ec]/80" : "text-[#8c7b6b]",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
