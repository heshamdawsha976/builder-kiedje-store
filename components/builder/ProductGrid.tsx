"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export const ProductGrid = ({
  title = "منتجاتنا المميزة",
  subtitle = "اكتشفي أفضل منتجات العناية بالبشرة",
  children,
}: ProductGridProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {children}
        </div>
      </div>
    </section>
  );
};
