import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  cta?: { label: string; href: string };
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  cta,
  className,
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-2 sm:gap-3", alignCls)}>
        {eyebrow ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EAF2E9] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B1D2A]">
            <span className="size-1.5 rounded-full bg-[#F5D88E]" aria-hidden />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="max-w-2xl font-heading text-3xl font-bold leading-[1.1] tracking-tight text-[#6B1D2A] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-[#6B1D2A]/80 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {cta ? (
        <Link
          href={cta.href}
          className="group inline-flex h-11 w-fit items-center gap-2 rounded-full border border-[#6B1D2A]/15 bg-white px-5 text-sm font-bold text-[#6B1D2A] shadow-sm transition-all hover:border-[#6B1D2A] hover:bg-[#6B1D2A] hover:text-white"
        >
          {cta.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
