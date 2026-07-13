"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CategoryWithMeta } from "@/lib/categories";

const CATEGORY_PLACEHOLDER = "/images/product-placeholder.svg";

interface CategoryCarouselProps {
  categories: CategoryWithMeta[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  if (categories.length === 0) return null;

  return (
    <section className="w-full bg-[#b8c5b8] py-14 sm:py-20">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Flavours for <em className="italic text-brand-maroon">Every Moment</em>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            From timeless classics to modern favourites, there&rsquo;s something sweet for every moment.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link
                href={`/categories/${cat.slug}`}
                className="group flex flex-col items-center"
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-sm ring-1 ring-black/[0.04]">
                  <Image
                    src={cat.image || CATEGORY_PLACEHOLDER}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay at the bottom for depth */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Category Name */}
                <h3 className="mt-3 text-center font-heading text-sm font-semibold uppercase tracking-wider text-foreground/80 transition-colors group-hover:text-brand-maroon sm:mt-4 sm:text-base">
                  {cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
