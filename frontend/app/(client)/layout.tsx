import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreConfigProvider } from "@/components/providers/StoreConfigProvider";
import { getStoreCategories } from "@/lib/categories";
import { getPublicStoreConfig } from "@/lib/storefront-settings";

interface ClientLayoutProps {
  children: ReactNode;
}

// Client extension layer (sbgs-specific pages: blog, locations, sweets-library,
// categories landing). Mirrors the storefront chrome so these pages render with
// the same Header/Footer. This file lives under app/(client)/** and is therefore
// excluded from platform core — safe to customize per client.
export default async function ClientLayout({ children }: ClientLayoutProps) {
  const [categories, storeConfig] = await Promise.all([
    getStoreCategories(),
    getPublicStoreConfig(),
  ]);

  return (
    <StoreConfigProvider config={storeConfig}>
      <Header
        categories={categories}
        minOrderValuePaise={storeConfig.minOrderValuePaise}
      />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
    </StoreConfigProvider>
  );
}
