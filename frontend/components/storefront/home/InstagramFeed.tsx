import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";

const INSTAGRAM_IMAGES = [
  {
    src: "/images/sweets/IMG_20260612_190805.jpg",
    alt: "Artisan laddu preparation",
  },
  {
    src: "/images/sweets/IMG_20260612_183232.jpg",
    alt: "Festive sweet box arrangement",
  },
  {
    src: "/images/sweets/IMG_20260612_213153.jpg",
    alt: "Traditional barfi and peda platter",
  },
  {
    src: "/images/sweets/IMG_20260612_211348.jpg",
    alt: "Premium gift box packaging",
  },
  {
    src: "/images/sweets/IMG_20260612_172053.jpg",
    alt: "Dry fruit assortment box",
  },
  {
    src: "/images/sweets/IMG_20260612_164724.jpg",
    alt: "Special occasion sweet display",
  },
];

export function InstagramFeed() {
  return (
    <section className="relative overflow-hidden bg-[#7F1416]">
      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Header Row */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left: Heading */}
          <h2 className="font-serif text-3xl font-bold leading-tight text-[#FAF5EC] sm:text-4xl lg:text-5xl md:w-1/3 text-center md:text-left">
            Follow Us For More <br className="hidden md:block" />
            <em className="italic font-normal">Mithai Stories</em>
          </h2>

          {/* Center: Decorative Bird Mascot Placeholder */}
          <div className="flex md:w-1/3 justify-center">
            <svg viewBox="0 0 100 100" className="size-20 text-[#FAF5EC]/30">
              <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* Bird shape approximation */}
              <path d="M40 60 C50 65, 60 55, 65 45 C70 35, 65 30, 60 30 C50 30, 40 40, 35 50 C30 60, 35 65, 40 60Z" fill="currentColor" />
            </svg>
          </div>

          {/* Right: Social Icons */}
          <div className="flex md:w-1/3 justify-center md:justify-end gap-4">
            <Link
              href="https://www.instagram.com/srisaibabagheesweets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-12 items-center justify-center rounded-full border border-[#FAF5EC]/40 text-[#FAF5EC] transition-all hover:bg-[#FAF5EC] hover:text-[#7F1416]"
            >
              <Camera className="size-5" />
            </Link>
            <Link
              href="https://www.facebook.com/srisaibabagheesweets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-12 items-center justify-center rounded-full border border-[#FAF5EC]/40 text-[#FAF5EC] transition-all hover:bg-[#FAF5EC] hover:text-[#7F1416]"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 2-Column Image Carousel Placeholder */}
        <div className="relative flex items-center gap-4">
          {/* Left Arrow */}
          <button className="absolute left-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#7F1416] sm:-left-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {INSTAGRAM_IMAGES.slice(0, 2).map((img, idx) => (
              <Link
                key={idx}
                href="https://www.instagram.com/srisaibabagheesweets"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square w-full overflow-hidden bg-white/5"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay with icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#7F1416]/0 transition-all duration-300 group-hover:bg-[#7F1416]/40">
                  <div className="flex size-14 items-center justify-center rounded-full bg-white/0 opacity-0 transition-all duration-300 group-hover:bg-white/90 group-hover:opacity-100">
                    <Camera className="size-6 text-[#7F1416]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="absolute right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#7F1416] sm:-right-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
