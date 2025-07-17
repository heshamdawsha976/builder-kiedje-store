import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "كليدج - متجر العناية بالبشرة الطبيعية الفاخر",
  description:
    "اكتشفي عالم كليدج الساحر - متجر العناية بالبشرة الطبيعية الأول في مصر. منتجات فاخرة وآمنة وفعّالة لجميع أنواع البشرة العربية مع تقنيات متطورة وتصميم أنيق",
  keywords: [
    "عناية بالبشرة",
    "منتجات طبيعية",
    "تجميل فاخر",
    "كليدج",
    "مصر",
    "العناية الطبيعية",
    "منتجات عر��ية",
    "جمال طبيعي",
    "عناية فاخرة",
  ],
  openGraph: {
    title: "كليدج - متجر العناية بالبشرة الطبيعية الفاخر",
    description:
      "اكتشفي عالم كليدج الساحر - منتجات العناية بالبشرة الطبيعية الفاخرة",
    type: "website",
    locale: "ar_EG",
    siteName: "كليدج - Kledje",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "كليدج - متجر العناية بالبشرة الطبيعية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كليدج - متجر العناية بالبشرة الطبيعية الفاخر",
    description:
      "اكتشفي عالم كليدج الساحر - منتجات العناية بالبشرة الطبيعية الفاخرة",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://kledje.com",
    languages: {
      "ar-EG": "https://kledje.com",
      "en-US": "https://kledje.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          as="style"
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#e879f9" />
        <meta name="msapplication-TileColor" content="#e879f9" />

        {/* Apple specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="كليدج" />

        {/* Rich snippets structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "كليدج - Kledje",
              description: "متجر العناية بالبشرة الطبيعية الفاخر في مصر",
              url: "https://kledje.com",
              logo: "https://kledje.com/logo.png",
              image: "https://kledje.com/og-image.jpg",
              telephone: "+20-100-123-4567",
              email: "info@kledje.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "EG",
                addressRegion: "Cairo",
              },
              openingHours: "Mo-Su 09:00-21:00",
              priceRange: "$$",
              paymentAccepted: "Cash",
              currenciesAccepted: "EGP",
            }),
          }}
        />
      </head>
      <body className="font-arabic antialiased bg-gradient-hero min-h-screen">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-600 text-white px-4 py-2 rounded-md z-50"
        >
          انتقل إلى المحتوى الرئيسي
        </a>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>

          {/* Footer placeholder for future development */}
          <footer className="mt-auto py-8 text-center text-gray-600 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <p className="text-lg">© 2024 كليدج - جميع الحقوق محفوظة</p>
              <p className="text-sm text-gray-500 mt-2">
                صُمم بحب لجمال المرأة العربية 💖
              </p>
            </div>
          </footer>
        </div>

        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                  console.log('Page load time:', loadTime + 'ms');
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
