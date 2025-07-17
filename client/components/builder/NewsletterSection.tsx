"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  backgroundColor?: string;
}

export const NewsletterSection = ({
  title = "اشتركي في نشرتنا الإخبارية",
  description = "كوني أول من يعلم بالعروض والمنتجات الجديدة",
  buttonText = "اشتراك",
  backgroundColor = "#f0abfc",
}: NewsletterSectionProps) => {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-pink-100 mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="ادخلي بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-right bg-white"
              dir="rtl"
            />
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-6">
              {buttonText}
            </Button>
          </div>
          <p className="text-sm text-pink-200 mt-4">
            ستحصلين على خصم 20% على أول طلب لك
          </p>
        </motion.div>
      </div>
    </section>
  );
};
