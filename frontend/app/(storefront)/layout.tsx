import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { HeaderV2 } from "@/components/layout/HeaderV2";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { StoreConfigProvider } from "@/components/providers/StoreConfigProvider";
import { getStoreCategories } from "@/lib/categories";
import { getPublicStoreConfig } from "@/lib/storefront-settings";

interface StorefrontLayoutProps {
  children: ReactNode;
}

export default async function StorefrontLayout({ children }: StorefrontLayoutProps) {
  const [categories, storeConfig] = await Promise.all([
    getStoreCategories(),
    getPublicStoreConfig(),
  ]);

  return (
    <StoreConfigProvider config={storeConfig}>
      <HeaderV2
        categories={categories}
        minOrderValuePaise={storeConfig.minOrderValuePaise}
      />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
      <WhatsAppFloat />
    </StoreConfigProvider>
  );
}
// Cache invalidation
