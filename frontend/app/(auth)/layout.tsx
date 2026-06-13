import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_SRC, APP_NAME } from "@/lib/constants";
import { NOINDEX_METADATA } from "@/lib/seo";

export const metadata = NOINDEX_METADATA;

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#fdf8f3] px-4 py-12 lg:px-8 font-montserrat">
      <div className="mb-6 flex flex-col items-center">
        <Link href="/">
          <Image
            src={BRAND_LOGO_SRC}
            alt={APP_NAME}
            width={120}
            height={120}
            className="h-20 w-auto object-contain transition-transform hover:scale-105"
            priority
          />
        </Link>
      </div>
      <div className="w-full max-w-lg overflow-hidden rounded-[20px] bg-white border border-[#ece3d8] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {children}
      </div>
    </div>
  );
}
