import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ImageOff } from "lucide-react";
import { fetchPublicGallery } from "@/lib/gallery-api";
import { aspectRatioOf, formatPhotoDate, groupByMonth } from "@/lib/gallery-timeline";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from Sri Sai Baba Ghee Sweets — our kitchens, our sweets and our celebrations across Vijayawada.",
};

// The merchant can add photos at any time from Admin → Gallery, so this must not
// be baked into a static build.
export const revalidate = 300;

export default async function GalleryPage() {
  const gallery = await fetchPublicGallery().catch(() => ({ enabled: false, items: [] }));
  const sections = gallery.enabled ? groupByMonth(gallery.items) : [];
  const total = gallery.enabled ? gallery.items.length : 0;

  return (
    <div className="flex min-h-screen flex-col bg-brand-cream pb-16">
      {/* ── Banner ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-gold/20 py-10 md:py-14">
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 text-center lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">
            Moments From Our Kitchen
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-brand-maroon sm:text-4xl md:text-5xl">
            Gallery
          </h1>

          <div className="mt-4 flex items-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-brand-gold/60 sm:w-16" />
            <span className="size-2 rotate-45 bg-brand-gold" />
            <span className="h-px w-10 bg-brand-gold/60 sm:w-16" />
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-maroon/70 sm:text-base">
            Sweets fresh off the tray, festive hampers and the people who make them —
            a look inside 40 years of pure ghee tradition.
          </p>

          {total > 0 ? (
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-cream/70 px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-maroon">
              <Camera className="size-4 text-brand-gold" aria-hidden />
              {total} photo{total === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>

        <div
          className="absolute -bottom-16 -right-16 size-64 rounded-full bg-brand-gold/20 opacity-40 blur-3xl"
          aria-hidden
        />
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-8 sm:pt-10 lg:px-8">
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-brand-gold/40 bg-card px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-gold/10">
              <ImageOff className="size-6 text-brand-gold" aria-hidden />
            </span>
            <h2 className="mt-5 font-heading text-xl font-bold text-brand-maroon">
              Photos coming soon
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We&apos;re putting this album together. In the meantime, browse the sweets
              themselves.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-maroon px-6 text-sm font-bold text-brand-cream transition-colors hover:bg-brand-maroon-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
            >
              Shop our sweets
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.key}>
                {/* Month heading — sticky so you keep your bearings while scrolling.
                    top-20 clears the fixed site header. */}
                <div className="sticky top-20 z-10 -mx-4 mb-4 bg-brand-cream/90 px-4 py-2 backdrop-blur-sm lg:-mx-8 lg:px-8">
                  <h2 className="flex items-center gap-3 font-heading text-lg font-bold text-brand-maroon sm:text-xl">
                    {section.label}
                    <span className="h-px flex-1 bg-brand-gold/30" aria-hidden />
                    <span className="text-xs font-semibold text-muted-foreground">
                      {section.items.length}
                    </span>
                  </h2>
                </div>

                {/* CSS multi-column masonry: preserves each photo's aspect ratio
                    without measuring container width on the client. */}
                <div className="columns-2 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
                  {section.items.map((image) => {
                    const ratio = aspectRatioOf(image);
                    // Feed next/image real intrinsic dimensions so it reserves the
                    // right box and never shifts layout (CLS).
                    const width = image.width ?? 1200;
                    const height = image.height ?? Math.round(1200 / ratio);
                    return (
                      <figure
                        key={image.id}
                        className="mb-3 break-inside-avoid overflow-hidden rounded-[18px] border border-border bg-card shadow-sm sm:mb-4"
                      >
                        <Image
                          src={image.imageUrl}
                          alt={image.altText || image.caption || "Sri Sai Baba Ghee Sweets photo"}
                          width={width}
                          height={height}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="h-auto w-full object-cover"
                        />
                        {image.caption ? (
                          <figcaption className="px-3.5 py-3">
                            <p className="text-[13px] font-medium leading-snug text-brand-maroon">
                              {image.caption}
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {formatPhotoDate(image.timelineDate)}
                            </p>
                          </figcaption>
                        ) : null}
                      </figure>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      {sections.length > 0 ? (
        <section className="mx-auto mt-12 w-full max-w-[1440px] px-4 lg:px-8">
          <div className="rounded-[24px] bg-brand-maroon px-6 py-10 text-center sm:px-10">
            <h2 className="font-heading text-2xl font-bold text-brand-cream sm:text-3xl">
              Tempted yet?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-cream/80">
              Every sweet you see here is made fresh in our kitchens and delivered to
              your door.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-gold px-6 text-sm font-bold text-brand-maroon transition-colors hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-maroon"
            >
              Order Online
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
