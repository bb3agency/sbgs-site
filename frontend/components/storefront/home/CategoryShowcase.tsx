import Image from "next/image";
import Link from "next/link";
import type { CategoryWithMeta } from "@/lib/categories";

interface CategoryShowcaseProps {
  categories: CategoryWithMeta[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories?.length) return null;

  const displayCategories = categories.slice(0, 7);

  return (
    <section className="relative overflow-hidden bg-[#FAF5EC]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
        {/* Header — Dadu's "Flavours for Every Moment" with decorative stickers */}
        <div className="mb-8 flex shrink-0 items-center justify-center gap-3 lg:mb-12">
          {/* Left decorative element */}
          <div className="hidden size-[60px] items-center justify-center sm:flex">
            <svg viewBox="0 0 40 40" className="size-10 text-[#7F1416]/30" aria-hidden>
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
            </svg>
          </div>

          <h2 className="text-center font-serif text-3xl text-[#7F1416] sm:text-4xl lg:text-5xl">
            Flavours for{" "}
            <em className="italic">Every Moment</em>
          </h2>

          {/* Right decorative element */}
          <div className="hidden size-[60px] items-center justify-center sm:flex">
            <svg viewBox="0 0 40 40" className="size-10 text-[#7F1416]/30" aria-hidden>
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Category Grid — 7 items in a row */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto grid w-full grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10">
            {displayCategories.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-4 text-center"
              >
                {/* Decorative outer ring */}
                <div className="relative w-full aspect-square p-2 sm:p-3">
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[#D4A537]/60 transition-transform duration-1000 ease-out group-hover:rotate-180" />
                  <div className="absolute inset-1.5 rounded-full border border-[#D4A537]/30 transition-transform duration-500 group-hover:scale-105" />
                  
                  <div className="relative h-full w-full overflow-hidden rounded-full shadow-md transition-all duration-500 group-hover:shadow-2xl">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 45vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Inner overlay for richness */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#7F1416]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                <div className="flex flex-col items-center mt-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#7F1416] sm:text-[11px] font-['Montserrat'] transition-colors duration-300 group-hover:text-[#D4A537] lg:mt-2">
                    {cat.name}
                  </h3>
                  <div className="h-px w-6 bg-[#D4A537] my-2 transition-all duration-300 group-hover:w-12"></div>
                  <span className="text-[10px] uppercase tracking-widest text-[#7F1416]/60 font-bold transition-all duration-300 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 font-['Montserrat']">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
