"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Sparkles,
  Shield,
  Truck,
  Award,
  Eye,
  Share2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Leaf,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  ingredients: string[];
  benefits: string[];
  skinType: string[];
  inStock: boolean;
  featured?: boolean;
  category: string;
}

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddToWishlist: (product: Product) => void;
}

const ProductQuickView = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
}: ProductQuickViewProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  if (!product) return null;

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    onAddToWishlist(product);
  };

  const tabs = [
    { id: "overview", label: "نظرة عامة", icon: Eye },
    { id: "ingredients", label: "المكونات", icon: Leaf },
    { id: "benefits", label: "الفوائد", icon: Sparkles },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-[201] overflow-hidden flex flex-col max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-kledje-50 to-coral-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-kledje rounded-2xl flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    معاينة سريعة
                  </h2>
                  <p className="text-sm text-gray-600">
                    {product.category} • رمز المنتج: {product.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:bg-white"
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* Product Images */}
              <div className="lg:w-1/2 relative bg-gradient-to-br from-kledje-50 to-coral-50 flex items-center justify-center">
                <div className="relative w-full max-w-md mx-auto p-8">
                  {/* Main Image */}
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Badges */}
                    {product.featured && (
                      <Badge className="absolute top-4 right-4 bg-gradient-coral text-white px-3 py-1">
                        <Crown className="w-4 h-4 ml-1" />
                        مميز
                      </Badge>
                    )}

                    {discountPercentage > 0 && (
                      <Badge className="absolute top-4 left-4 bg-gradient-teal text-white px-3 py-1">
                        خصم {discountPercentage}%
                      </Badge>
                    )}

                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </motion.button>
                      </>
                    )}
                  </motion.div>

                  {/* Image Indicators */}
                  {product.images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-kledje-500 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-8 left-8 w-12 h-12 bg-gradient-kledje rounded-full opacity-20 blur-sm"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: 1,
                    }}
                    className="absolute bottom-8 right-8 w-8 h-8 bg-gradient-coral rounded-full opacity-20 blur-sm"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-8 overflow-y-auto">
                {/* Product Name & Rating */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-medium text-gray-700">
                        {product.rating}
                      </span>
                      <span className="text-gray-500">
                        ({product.reviewCount} تقييم)
                      </span>
                    </div>

                    <Badge
                      className={`${
                        product.inStock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock ? "متوفر" : "نفد المخزون"}
                    </Badge>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-bold text-kledje-600">
                      {product.price} ج.م
                    </span>
                    {product.originalPrice && (
                      <div className="flex flex-col">
                        <span className="text-xl text-gray-500 line-through">
                          {product.originalPrice} ج.م
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          وفر {product.originalPrice - product.price} ج.م
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                  <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-xl">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                          selectedTab === tab.id
                            ? "bg-white text-kledje-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <motion.div
                    key={selectedTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[200px]"
                  >
                    {selectedTab === "overview" && (
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-kledje-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Leaf className="h-5 w-5 text-kledje-600" />
                              <span className="font-medium text-kledje-800">
                                طبيعي 100%
                              </span>
                            </div>
                            <p className="text-sm text-kledje-700">
                              مكونات طبيعية معتمدة
                            </p>
                          </div>

                          <div className="p-4 bg-coral-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="h-5 w-5 text-coral-600" />
                              <span className="font-medium text-coral-800">
                                آمن للاستخدام
                              </span>
                            </div>
                            <p className="text-sm text-coral-700">
                              مختبر ومعتمد طبياً
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTab === "ingredients" && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">
                          المكونات الطبيعية
                        </h4>
                        <div className="grid gap-3">
                          {product.ingredients.map((ingredient, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
                            >
                              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                                <Leaf className="h-4 w-4 text-green-600" />
                              </div>
                              <span className="text-green-800 font-medium">
                                {ingredient}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedTab === "benefits" && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">
                          الفوائد والنتائج
                        </h4>
                        <div className="grid gap-3">
                          {product.benefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl"
                            >
                              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="text-purple-800 font-medium">
                                {benefit}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                <Separator className="my-6" />

                {/* Quantity & Actions */}
                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">الكمية:</span>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                      >
                        <Minus className="h-5 w-5" />
                      </motion.button>

                      <span className="w-12 text-center font-bold text-xl">
                        {quantity}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={!product.inStock}
                        className="w-10 h-10 rounded-xl bg-kledje-100 flex items-center justify-center text-kledje-600 hover:bg-kledje-200 disabled:opacity-50"
                      >
                        <Plus className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => onAddToCart(product, quantity)}
                        disabled={!product.inStock}
                        className="w-full bg-gradient-to-r from-kledje-500 to-kledje-600 text-white py-4 text-lg rounded-2xl shadow-lg relative overflow-hidden group"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <ShoppingBag className="h-6 w-6" />
                          <span>
                            إضافة للسلة -{" "}
                            {(product.price * quantity).toFixed(0)} ج.م
                          </span>
                          <Zap className="h-6 w-6" />
                        </div>
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </Button>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleAddToWishlist}
                          variant="outline"
                          className={`w-full py-3 rounded-xl transition-all ${
                            isInWishlist
                              ? "border-red-300 bg-red-50 text-red-600"
                              : "border-gray-300 text-gray-700 hover:border-red-300"
                          }`}
                        >
                          <Heart
                            className={`h-5 w-5 ml-2 ${
                              isInWishlist ? "fill-current" : ""
                            }`}
                          />
                          {isInWishlist ? "في المفضلة" : "إضافة للمفضلة"}
                        </Button>
                      </motion.div>

                      <Button
                        variant="outline"
                        className="w-full py-3 rounded-xl border-kledje-300 text-kledje-600 hover:bg-kledje-50"
                      >
                        <Eye className="h-5 w-5 ml-2" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>ضمان 30 يوم</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>توصيل مجاني</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>جودة معتمدة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
