import Link from "next/link";
import Image from "next/image";
import { Sparkles, ChevronRight } from "lucide-react";
import { getStoreCategories } from "@/lib/categories";

export const metadata = {
  title: "Shop by Category",
  description: "Browse our handcrafted desi ghee sweets by category.",
};

export default async function CategoriesPage() {
  const categories = await getStoreCategories();

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream pb-16">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-maroon py-12 md:py-20">
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 text-center lg:px-8">
          {/* Label chip */}
          <span className="mb-4 inline-flex items-center gap-1.5 border border-brand-gold/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold font-['Montserrat']">
            <Sparkles className="size-3" aria-hidden />
            Our Collections
          </span>

          <h1 className="mb-3 font-serif text-3xl font-normal capitalize text-brand-cream sm:mb-4 sm:text-5xl md:text-6xl">
            Shop by Category
          </h1>

          {/* Breadcrumb */}
          <nav
            className="mb-6 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-cream/60 sm:gap-2 sm:text-sm font-['Montserrat'] uppercase"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-brand-gold">Categories</span>
          </nav>

          {/* Stats strip */}
          <div className="flex items-center gap-6 sm:gap-10 mt-4">
            <div className="text-center">
              <p className="font-serif text-xl font-normal text-brand-cream sm:text-2xl italic">{categories.length}</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-cream/60 font-['Montserrat']">Categories</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-xl font-normal text-brand-cream sm:text-2xl italic">100%</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-cream/60 font-['Montserrat']">Pure Ghee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories Grid ──────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-12 sm:pt-16 lg:px-8">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-x-8 lg:gap-y-12">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-4 text-center"
              >
                {/* Decorative outer ring */}
                <div className="relative w-full aspect-square p-2 sm:p-3">
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-brand-gold/60 transition-transform duration-1000 ease-out group-hover:rotate-180" />
                  <div className="absolute inset-1.5 rounded-full border border-brand-gold/30 transition-transform duration-500 group-hover:scale-105" />
                  
                  <div className="relative h-full w-full overflow-hidden rounded-full shadow-md transition-all duration-500 group-hover:shadow-2xl">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 45vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Inner overlay for richness */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                <div className="flex flex-col items-center mt-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-maroon sm:text-[13px] font-['Montserrat'] transition-colors duration-300 group-hover:text-brand-gold">
                    {cat.name}
                  </h3>
                  <div className="h-px w-6 bg-brand-gold my-2 transition-all duration-300 group-hover:w-12"></div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-maroon/60 font-bold transition-all duration-300 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 font-['Montserrat']">
                    Explore Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-brand-gold/50 bg-card px-4 py-28 text-center shadow-sm">
            <h2 className="mb-3 font-serif text-2xl font-normal text-brand-maroon">
              No categories available
            </h2>
            <p className="mb-8 max-w-md text-sm font-medium text-brand-maroon/70 font-['Montserrat']">
              Categories will appear here once they are added in the admin console.
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center bg-brand-maroon px-8 text-sm font-bold uppercase tracking-widest text-brand-cream transition-all hover:bg-brand-gold font-['Montserrat']"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
