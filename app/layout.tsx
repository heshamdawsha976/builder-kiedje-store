import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "كليدج - متجر العناية بالبشرة الطبيعية",
  description:
    "متجر العناية بالبشرة الطبيعية الأول في مصر. منتجات آمنة وفعّالة لجميع أنواع البشرة العربية",
  keywords: ["عناية بالبشرة", "منتجات طبيعية", "تجميل", "كليدج", "مصر"],
  openGraph: {
    title: "كليدج - متجر العناية بالبشرة الطبيعية",
    description: "متجر العناية بالبشرة الطبيعية الأول في مصر",
    type: "website",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "كليدج - متجر العناية بالبشرة الطبيعية",
    description: "متجر العناية بالبشرة الطبيعية الأول في مصر",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased">
        <div className="min-h-screen bg-white">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
