import { type RegisteredComponent } from "@builder.io/sdk-react";
import dynamic from "next/dynamic";

// Dynamic imports for Builder.io components
const ProductCard = dynamic(() =>
  import("./client/components/builder/ProductCard").then((mod) => ({
    default: mod.ProductCard,
  })),
);

const ProductGrid = dynamic(() =>
  import("./client/components/builder/ProductGrid").then((mod) => ({
    default: mod.ProductGrid,
  })),
);

const HeroSection = dynamic(() =>
  import("./client/components/builder/HeroSection").then((mod) => ({
    default: mod.HeroSection,
  })),
);

const NewsletterSection = dynamic(() =>
  import("./client/components/builder/NewsletterSection").then((mod) => ({
    default: mod.NewsletterSection,
  })),
);

export const customComponents: RegisteredComponent[] = [
  {
    component: ProductCard,
    name: "ProductCard",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "منتج العناية بالبشرة",
        required: true,
      },
      {
        name: "description",
        type: "string",
        defaultValue: "وصف المنتج باللغة العربية",
      },
      {
        name: "price",
        type: "number",
        defaultValue: 299,
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
      },
      {
        name: "inStock",
        type: "boolean",
        defaultValue: true,
      },
    ],
  },
  {
    component: ProductGrid,
    name: "ProductGrid",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "منتجاتنا المميزة",
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "اكتشفي أفضل منتجات العناية بالبشرة",
      },
    ],
    canHaveChildren: true,
  },
  {
    component: HeroSection,
    name: "HeroSection",
    inputs: [
      {
        name: "headline",
        type: "string",
        defaultValue: "جمالك يبدأ من كليدج",
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "متجر العناية بالبشرة الأول في مصر",
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "ابدئي التسوق",
      },
      {
        name: "heroImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
      },
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#fdf2f8",
      },
    ],
  },
  {
    component: NewsletterSection,
    name: "NewsletterSection",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "اشتركي في نشرتنا الإخبارية",
      },
      {
        name: "description",
        type: "string",
        defaultValue: "كوني أول من يعلم بالعروض والمنتجات الجديدة",
      },
      {
        name: "buttonText",
        type: "string",
        defaultValue: "اشتراك",
      },
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#f0abfc",
      },
    ],
  },
];
