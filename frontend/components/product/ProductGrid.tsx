"use client";

import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stagger, StaggerItem } from "@/components/shared/motion/Stagger";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found yet"
        description="Try changing filters or search terms."
      />
    );
  }

  return (
    <Stagger
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
      stagger={0.05}
    >
      {products.map((product, idx) => (
        <StaggerItem key={product.id} className="h-full" index={idx}>
          <ProductCard product={product} priority={idx < 4} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
