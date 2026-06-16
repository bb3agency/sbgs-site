import type { Metadata } from "next";
import { interFont, headingFont } from "@/lib/fonts";
import { APP_NAME, BRAND_LOGO_SRC } from "@/lib/constants";
import { getSiteUrl } from "@/lib/seo";
import { MaintenanceBanner } from "@/components/maintenance/MaintenanceBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Pure ghee sweets and premium gifting from Sri Sai Baba Ghee Sweets. Fresh batches every day, made for celebrations.",
  icons: {
    icon: BRAND_LOGO_SRC,
    shortcut: BRAND_LOGO_SRC,
    apple: BRAND_LOGO_SRC,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${headingFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
        {/*
          Global maintenance banner. Self-hides on /ops/* routes (operators
          already see the load-shed panel) and on `normal|reduced|emergency`
          modes. Polls every 60s in steady state, escalates to 5s when a
          maintenance window is pending so the countdown stays accurate.
        */}
        <MaintenanceBanner />
        {children}
      </body>
    </html>
  );
}
