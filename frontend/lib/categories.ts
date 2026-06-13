import { apiClient } from "./api";
import { resolveProductImageUrl } from "./media-url";
import type { ProductCategory } from "@/types/product";

export interface CategoryWithMeta extends ProductCategory {
  image: string;
  color: string;
}

const CATEGORY_META_FALLBACKS: Record<string, { image: string; color: string }> = {
  "fresh-vegetables": {
    image: "/images/sweets/IMG_20260612_180122.jpg",
    color: "bg-[#e8f5e9]",
  },
  "fruits": {
    image: "/images/sweets/IMG_20260612_173835.jpg",
    color: "bg-[#ffebee]",
  },
  "spices-condiments": {
    image: "/images/sweets/IMG_20260612_165103.jpg",
    color: "bg-[#fdf2e9]",
  },
  "flash-sale": {
    image: "/images/sweets/IMG_20260612_214801.jpg",
    color: "bg-[#fff3e0]",
  },
};

const DEFAULT_META = {
  image: "/images/sweets/IMG_20260612_182754.jpg",
  color: "bg-[#f5f5f5]",
};

export async function getStoreCategories(
  search?: string,
): Promise<CategoryWithMeta[]> {
  try {
    const params = new URLSearchParams();
    if (search?.trim()) {
      params.set("search", search.trim());
    }
    const suffix = params.size > 0 ? `?${params.toString()}` : "";
    const categories = await apiClient<ProductCategory[]>(
      `/products/categories${suffix}`,
    );
    
    return categories.map((cat) => {
      const meta = CATEGORY_META_FALLBACKS[cat.slug] || DEFAULT_META;
      const apiImage = cat.imageUrl?.trim();
      return {
        ...cat,
        image: apiImage ? resolveProductImageUrl(apiImage) : meta.image,
        color: meta.color,
      };
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
