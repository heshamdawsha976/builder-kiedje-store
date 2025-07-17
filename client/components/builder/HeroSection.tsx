"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  headline?: string;
  subtitle?: string;
  ctaText?: string;
  heroImage?: string;
  backgroundColor?: string;
}

export const HeroSection = ({
  headline = "جمالك يبدأ من كليدج",
  subtitle = "متجر العناية بالبشرة الأول في مصر",
  ctaText = "ابدئي التسوق",
  heroImage = "/placeholder.svg",
  backgroundColor = "#fdf2f8",
}: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor }}>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right space-y-6"
          >
            <div className="space-y-2">
              <Badge className="bg-brand-100 text-brand-700 mb-4">
                منتجات طبيعية وآمنة
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {headline}
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-brand-600 hover:bg-brand-700 px-8"
              >
                {ctaText}
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                تعرفي على منتجاتنا
              </Button>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">100%</div>
                <div className="text-sm text-gray-600">طبيعي</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">24h</div>
                <div className="text-sm text-gray-600">توصيل سريع</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-600">30</div>
                <div className="text-sm text-gray-600">يوم ضمان</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Kledje Skincare Products"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent rounded-2xl"></div>
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-brand-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-brand-300 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
