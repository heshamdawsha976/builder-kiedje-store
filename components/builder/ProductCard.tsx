"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  description?: string;
  price: number;
  image?: string;
  inStock?: boolean;
}

export const ProductCard = ({
  title = "منتج العناية بالبشرة",
  description = "وصف المنتج باللغة العربية",
  price = 299,
  image = "/placeholder.svg",
  inStock = true,
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!inStock && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            نفد المخزون
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 left-2 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 hover:text-brand-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-brand-600">{price} جنيه</span>
          <Button
            size="sm"
            disabled={!inStock}
            className="bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300"
          >
            <ShoppingBag className="h-4 w-4 ml-1" />
            {inStock ? "أضف للسلة" : "غير متوفر"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
