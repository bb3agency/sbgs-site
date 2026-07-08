import Link from "next/link";
import Image from "next/image";
import { HomeCarousel } from "./HomeCarousel";
import type { CategoryWithMeta } from "@/lib/categories";

/** Label-bar tints cycled across category cards (reference Home.tsx §4). */
const LABEL_TINTS = [
  "bg-cat-olive",
  "bg-cat-amber",
  "bg-cat-maroon",
  "bg-cat-brown",
  "bg-cat-rust",
];

/** Short descriptors cycled under category names (reference shows one per tile). */
const LABEL_TAGLINES = [
  "Traditional & iconic",
  "Rich, creamy & delightful",
  "Soft, juicy & irresistible",
  "Wholesome & healthy",
  "Crunchy & flavourful",
];

const CATEGORY_PLACEHOLDER = "/images/product-placeholder.svg";

interface CategoryCarouselProps {
  categories: CategoryWithMeta[];
}

/** "Explore Our Sweet Categories" — image tiles with colored label bars. */
export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto w-full px-4 py-16 sm:py-24 sm:px-6 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-[480px] font-heading text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl">
          Explore Our
          <br />
          Sweet Categories
        </h2>
        <p className="max-w-[300px] text-sm text-muted-foreground">
          From timeless classics to modern favourites, there&rsquo;s something
          sweet for every moment.
        </p>
      </div>

      <HomeCarousel label="sweet categories">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            data-carousel-item
            className="group w-[70%] shrink-0 snap-start sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)]"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={cat.image || CATEGORY_PLACEHOLDER}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className={`flex flex-1 flex-col justify-center px-4 py-5 text-center text-text-cream ${LABEL_TINTS[i % LABEL_TINTS.length]}`}
              >
                <h3 className="font-heading text-2xl font-semibold">{cat.name}</h3>
                <p className="mt-0.5 text-xs opacity-90">
                  {LABEL_TAGLINES[i % LABEL_TAGLINES.length]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </HomeCarousel>
    </section>
  );
}
