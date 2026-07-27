import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreConfigProvider } from "@/components/providers/StoreConfigProvider";
import { priceFont } from "@/lib/fonts";
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
      {/* `contents` keeps the flex-col body layout intact while still cascading
          the --font-price variable to the header, pages, and footer (covers the
          checkout route, which lives under this storefront group). Applied here
          in the theme layer rather than the core root layout to avoid core drift. */}
      <div className={`${priceFont.variable} contents`}>
        <Header
          categories={categories}
          minOrderValuePaise={storeConfig.minOrderValuePaise}
        />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} />
      </div>
    </StoreConfigProvider>
  );
}
