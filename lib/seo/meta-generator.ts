/**
 * SEO Meta Generator for Kledje Store
 * Comprehensive meta tag generation with Arabic support
 */

import { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product" | "profile";
  locale?: string;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: {
    amount: number;
    currency: "EGP" | "USD";
  };
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  brand?: string;
  category?: string;
  gtin?: string;
  mpn?: string;
  condition?: "new" | "used" | "refurbished";
  alternateLocales?: { [key: string]: string };
}

export class SEOGenerator {
  private baseUrl: string;
  private defaultImage: string;
  private siteName: string;

  constructor(
    baseUrl = "https://kledje.com",
    defaultImage = "/og-default.jpg",
    siteName = "كليدج - Kledje",
  ) {
    this.baseUrl = baseUrl;
    this.defaultImage = defaultImage;
    this.siteName = siteName;
  }

  generateMetadata(config: SEOConfig): Metadata {
    const {
      title,
      description,
      keywords = [],
      image = this.defaultImage,
      url = this.baseUrl,
      type = "website",
      locale = "ar_EG",
      author = "فريق كليدج",
      publishedTime,
      modifiedTime,
      section,
      tags = [],
      price,
      availability,
      brand = "كليدج",
      category,
      gtin,
      mpn,
      condition = "new",
      alternateLocales = {},
    } = config;

    const fullImageUrl = image.startsWith("http")
      ? image
      : `${this.baseUrl}${image}`;
    const fullUrl = url.startsWith("http") ? url : `${this.baseUrl}${url}`;

    // Generate structured data
    const structuredData = this.generateStructuredData(config);

    const metadata: Metadata = {
      title,
      description,
      keywords: keywords.length > 0 ? keywords : undefined,
      authors: [{ name: author }],
      creator: author,
      publisher: this.siteName,
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
      alternates: {
        canonical: fullUrl,
        languages: {
          "ar-EG": fullUrl,
          "en-US": `${fullUrl}/en`,
          ...alternateLocales,
        },
      },
      openGraph: {
        title,
        description,
        url: fullUrl,
        siteName: this.siteName,
        locale,
        type,
        images: [
          {
            url: fullImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
          {
            url: fullImageUrl,
            width: 1080,
            height: 1080,
            alt: title,
          },
        ],
        ...(publishedTime && { publishedTime }),
        ...(modifiedTime && { modifiedTime }),
        ...(section && { section }),
        ...(tags.length > 0 && { tags }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [fullImageUrl],
        creator: "@KledjeBeauty",
        site: "@KledjeBeauty",
      },
      other: {
        // Arabic specific meta tags
        "arabic-title": title,
        "arabic-description": description,

        // E-commerce specific
        ...(price && {
          "product:price:amount": price.amount.toString(),
          "product:price:currency": price.currency,
        }),
        ...(availability && {
          "product:availability": availability,
        }),
        ...(brand && {
          "product:brand": brand,
        }),
        ...(category && {
          "product:category": category,
        }),
        ...(gtin && {
          "product:gtin": gtin,
        }),
        ...(mpn && {
          "product:mpn": mpn,
        }),
        ...(condition && {
          "product:condition": condition,
        }),

        // Structured Data
        "application/ld+json": JSON.stringify(structuredData),
      },
    };

    return metadata;
  }

  private generateStructuredData(config: SEOConfig) {
    const {
      title,
      description,
      image = this.defaultImage,
      url = this.baseUrl,
      type,
      price,
      availability,
      brand = "كليدج",
      category,
      gtin,
      mpn,
      condition = "new",
    } = config;

    const baseStructure = {
      "@context": "https://schema.org",
      "@type": this.getSchemaType(type),
      name: title,
      description,
      image: image.startsWith("http") ? image : `${this.baseUrl}${image}`,
      url: url.startsWith("http") ? url : `${this.baseUrl}${url}`,
    };

    // Product-specific structured data
    if (type === "product" && price) {
      return {
        ...baseStructure,
        "@type": "Product",
        brand: {
          "@type": "Brand",
          name: brand,
        },
        offers: {
          "@type": "Offer",
          price: price.amount,
          priceCurrency: price.currency,
          availability: `https://schema.org/${availability || "InStock"}`,
          condition: `https://schema.org/${this.getConditionSchema(condition)}`,
          seller: {
            "@type": "Organization",
            name: this.siteName,
          },
        },
        ...(category && { category }),
        ...(gtin && { gtin }),
        ...(mpn && { mpn }),
      };
    }

    // Organization/Store structured data
    if (type === "website") {
      return {
        ...baseStructure,
        "@type": "Store",
        telephone: "+20-100-123-4567",
        email: "info@kledje.com",
        address: {
          "@type": "PostalAddress",
          addressCountry: "EG",
          addressRegion: "Cairo",
        },
        openingHours: "Mo-Su 09:00-21:00",
        priceRange: "$$",
        paymentAccepted: "Cash, Credit Card",
        currenciesAccepted: "EGP",
      };
    }

    return baseStructure;
  }

  private getSchemaType(type: string): string {
    const typeMap: { [key: string]: string } = {
      website: "WebSite",
      article: "Article",
      product: "Product",
      profile: "Person",
    };
    return typeMap[type] || "WebPage";
  }

  private getConditionSchema(condition: string): string {
    const conditionMap: { [key: string]: string } = {
      new: "NewCondition",
      used: "UsedCondition",
      refurbished: "RefurbishedCondition",
    };
    return conditionMap[condition] || "NewCondition";
  }

  // Helper methods for common pages
  generateHomepageMetadata(): Metadata {
    return this.generateMetadata({
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
        "منتجات عربية",
        "جمال طبيعي",
        "عناية فاخرة",
        "skincare",
        "natural beauty",
        "kledje",
        "egypt",
        "arabic skincare",
      ],
      type: "website",
    });
  }

  generateProductMetadata(product: {
    name: string;
    arabicName: string;
    description: string;
    price: number;
    currency: "EGP" | "USD";
    image: string;
    category: string;
    sku: string;
    inStock: boolean;
  }): Metadata {
    return this.generateMetadata({
      title: `${product.arabicName} - ${product.name} | كليدج`,
      description: `${product.description} - منتج طبيعي فاخر من كليدج للعناية بالبشرة. اطلبي الآن مع توصيل مجاني داخل القاهرة والجيزة.`,
      keywords: [
        product.arabicName,
        product.name,
        product.category,
        "عناية بالبشرة",
        "منتجات طبيعية",
        "كليدج",
      ],
      image: product.image,
      type: "product",
      price: {
        amount: product.price,
        currency: product.currency,
      },
      availability: product.inStock ? "InStock" : "OutOfStock",
      category: product.category,
      gtin: product.sku,
    });
  }

  generateCategoryMetadata(category: {
    name: string;
    arabicName: string;
    description: string;
    image: string;
    productCount: number;
  }): Metadata {
    return this.generateMetadata({
      title: `${category.arabicName} - ${category.name} | كليدج`,
      description: `${category.description} - تصفحي مجموعة ${category.arabicName} الفاخرة من كليدج. ${category.productCount} منتج طبيعي للعناية بالبشرة.`,
      keywords: [
        category.arabicName,
        category.name,
        "عناية بالبشرة",
        "منتجات طبيعية",
        "كليدج",
      ],
      image: category.image,
      type: "website",
      section: category.arabicName,
    });
  }
}

// Default instance
export const seoGenerator = new SEOGenerator();

// Utility functions
export function generateBreadcrumbStructuredData(
  breadcrumbs: {
    name: string;
    url: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQStructuredData(
  faqs: {
    question: string;
    answer: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
