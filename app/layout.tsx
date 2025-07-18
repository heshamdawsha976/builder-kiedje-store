import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModernHeader } from "@/components/ui/modern-header";
import ModernFooter from "@/components/ui/modern-footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "كليدج - منتجات العناية بالبشرة الطبيعية",
  description:
    "اكتشفي أفضل منتجات العناية بالبشرة الطبيعية 100%. منتجات آمنة وفعّالة للمرأة العربية مع ضمان الجودة وتوصيل مجاني.",
  keywords:
    "منتجات طبيعية, العناية بالبشرة, كليدج, كريمات طبيعية, بوكس العروسة, منتجات آمنة",
  openGraph: {
    title: "كليدج - منتجات العناية بالبشرة الطبيعية",
    description: "اكتشفي أفضل منتجات العناية بالبشرة الطبيعية 100%",
    type: "website",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "كليدج - منتجات العناية بالبشرة الطبيعية",
    description: "اكتشفي أفضل منتجات العناية بالبشرة الطبيعية 100%",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Tajawal:wght@200;300;400;500;700;800;900&family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} font-arabic min-h-screen bg-gradient-to-br from-kledje-50/30 via-white to-coral-50/30`}
      >
        <ModernHeader />
        <main className="relative">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
