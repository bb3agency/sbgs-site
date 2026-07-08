import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function EditorialBlog() {
  const posts = [
    {
      title: "The Heritage of Handcrafted Sweets",
      date: "October 12, 2023",
      excerpt: "Discover the generations of tradition and pure ingredients that make our ghee sweets a timeless favorite.",
      image: "/images/sweets/IMG_20260612_205253.jpg",
      slug: "heritage-of-handcrafted-sweets"
    },
    {
      title: "Festive Gifting: A Guide to the Perfect Box",
      date: "November 05, 2023",
      excerpt: "Explore our curated selection of gift boxes designed to make every celebration memorable and sweet.",
      image: "/images/sweets/IMG_20260612_172053.jpg",
      slug: "festive-gifting-guide"
    }
  ];

  return (
    <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 40 40" className="size-8 text-brand-maroon/40" aria-hidden="true">
               <path d="M20 0 C25 15, 40 20, 40 20 C40 20, 25 25, 20 40 C15 25, 0 20, 0 20 C0 20, 15 15, 20 0Z" fill="currentColor"/>
            </svg>
            <h2 className="font-serif text-3xl font-normal text-brand-maroon sm:text-4xl lg:text-5xl">
              Sri Sai Baba in the <em className="italic">Spotlight</em>
            </h2>
            <svg viewBox="0 0 40 40" className="size-8 text-brand-maroon/40" aria-hidden="true">
               <path d="M20 0 C25 15, 40 20, 40 20 C40 20, 25 25, 20 40 C15 25, 0 20, 0 20 C0 20, 15 15, 20 0Z" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Blog Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button className="absolute -left-4 top-[35%] z-10 flex size-12 items-center justify-center rounded-full bg-card shadow-md text-brand-maroon transition-all hover:bg-brand-maroon hover:text-white md:-left-6">
            <ChevronLeft className="size-6" />
          </button>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
            {posts.map((post, idx) => (
              <article key={idx} className="group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="mb-6 block overflow-hidden bg-card aspect-[4/3]">
                  <Image 
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="text-left">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-brand-gold font-['Montserrat']">
                    {post.date}
                  </span>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="mb-3 font-serif text-2xl font-bold leading-snug text-brand-maroon transition-colors group-hover:text-brand-gold">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm leading-relaxed text-brand-maroon/70 font-['Montserrat']">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="absolute -right-4 top-[35%] z-10 flex size-12 items-center justify-center rounded-full bg-card shadow-md text-brand-maroon transition-all hover:bg-brand-maroon hover:text-white md:-right-6">
            <ChevronRight className="size-6" />
          </button>
        </div>
        
        {/* View All */}
        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-block border-b-2 border-brand-maroon/30 pb-1 text-sm font-bold uppercase tracking-[0.15em] text-brand-maroon transition-colors hover:border-brand-maroon font-['Montserrat']">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
