import { fetchStorefrontProducts } from "@/lib/storefront-products";
import { ProductCarousel } from "@/components/product/ProductCarousel";

interface RelatedProductsSectionProps {
  categorySlug: string;
  currentProductId: string;
  title?: string;
  subtitle?: string;
}

export async function RelatedProductsSection({
  categorySlug,
  currentProductId,
  title = "You will love these too",
  subtitle = "From the same category",
}: RelatedProductsSectionProps) {
  const { products } = await fetchStorefrontProducts({
    category: categorySlug,
    limit: 10,
    sort: "newest",
  });

  const related = products.filter((p) => p.id !== currentProductId).slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section>
      <div className="mb-6 text-center">
        {subtitle && (
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#D4A537]">
            {subtitle}
          </p>
        )}
        <h2 className="font-serif text-2xl font-bold text-[#6B1D2A] sm:text-3xl">
          {title}
        </h2>
      </div>
      <ProductCarousel products={related} />
    </section>
  );
}
