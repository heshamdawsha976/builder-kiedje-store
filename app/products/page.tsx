"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Sparkles,
  Leaf,
  Shield,
  Award,
  TrendingUp,
  Package,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { products, categories, brideBox } from "@/client/data/products";

// Product Card Component
const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: any;
  onAddToCart: (product: any) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden hover-lift border-0 shadow-lg glass rounded-3xl">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-kledje-50 to-coral-50 rounded-t-3xl">
          <div className="aspect-square relative">
            <OptimizedImage
              src={product.image}
              alt={product.nameAr}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-all duration-700"
              animationType="scale"
              priority={product.featured}
            />

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-kledje/20 backdrop-blur-sm"
            />
          </div>

          {/* Sale Badge */}
          {discountPercentage > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-4 right-4"
            >
              <Badge className="bg-gradient-coral text-white px-3 py-1 rounded-full font-bold shadow-lg">
                خصم {discountPercentage}%
              </Badge>
            </motion.div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4"
            >
              <Badge className="bg-gradient-teal text-white px-3 py-1 rounded-full font-bold shadow-lg">
                <Star className="w-3 h-3 ml-1" />
                مميز
              </Badge>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl border-0 shadow-lg"
            >
              <Eye className="h-4 w-4 ml-2" />
              معاينة سريعة
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsFavorite(!isFavorite)}
              className={`bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl border-0 shadow-lg transition-colors ${
                isFavorite ? "text-red-500" : "text-gray-600"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-6">
          {/* Category */}
          <div className="mb-3">
            <Badge
              variant="outline"
              className="text-xs text-kledje-600 border-kledje-200 bg-kledje-50"
            >
              {categories.find((c) => c.id === product.category)?.nameAr ||
                "منتجات العناية"}
            </Badge>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg">
            {product.nameAr}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {product.descriptionAr}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating} ({product.reviewCount} تقييم)
            </span>
          </div>

          {/* Ingredients Preview */}
          {product.ingredients && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {product.ingredients.slice(0, 3).map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-nature-cream text-nature-sage border-0"
                  >
                    {ingredient}
                  </Badge>
                ))}
                {product.ingredients.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-600"
                  >
                    +{product.ingredients.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {product.price} ج.م
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">
                {product.originalPrice} ج.م
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-gradient-kledje hover:shadow-xl text-white py-3 rounded-xl font-bold hover-glow"
            disabled={!product.inStock}
          >
            {!product.inStock ? (
              "نفد المخزون"
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 ml-2" />
                إضافة للسلة
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Bride Box Component
const BrideBoxCard = ({
  onAddToCart,
}: {
  onAddToCart: (product: any) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-full"
    >
      <Card className="overflow-hidden hover-lift border-0 shadow-2xl bg-gradient-to-br from-coral-50 via-white to-teal-50 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative overflow-hidden">
            <OptimizedImage
              src={brideBox.image}
              alt={brideBox.nameAr}
              width={600}
              height={500}
              className="w-full h-full object-cover"
              animationType="fade"
            />

            {/* Special Badge */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-6 right-6"
            >
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                <Award className="w-5 h-5 ml-2" />
                عرض خاص
              </Badge>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Badge className="bg-gradient-coral text-white px-4 py-2 rounded-full mb-4 inline-block">
                <Sparkles className="w-4 h-4 ml-2" />
                مجموعة العر��سة
              </Badge>

              <h2 className="text-4xl font-display text-gradient-kledje mb-4">
                {brideBox.nameAr}
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {brideBox.descriptionAr}
              </p>

              {/* Contents Preview */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">يحتوي على:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {brideBox.contents.slice(0, 6).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-teal-400 rounded-full ml-2"></div>
                      {item}
                    </div>
                  ))}
                </div>
                {brideBox.contents.length > 6 && (
                  <p className="text-sm text-gray-500 mt-2">
                    + {brideBox.contents.length - 6} منتجات أخرى
                  </p>
                )}
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {brideBox.price} ج.م
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {brideBox.originalPrice} ج.م
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    وفر{" "}
                    {(
                      ((brideBox.originalPrice - brideBox.price) /
                        brideBox.originalPrice) *
                      100
                    ).toFixed(0)}
                    % • توفير {brideBox.originalPrice - brideBox.price} ج.م
                  </p>
                </div>
              </div>

              <Button
                onClick={() => onAddToCart(brideBox)}
                className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white py-4 rounded-xl font-bold text-lg hover-glow shadow-lg"
              >
                <Package className="h-5 w-5 ml-2" />
                احصلي على البوكس كاملاً
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Main Products Page
export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descriptionAr.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.nameAr.localeCompare(b.nameAr);
      case "rating":
        return b.rating - a.rating;
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    console.log("Adding to cart:", product);
    // Add toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kledje-50/30 via-white to-coral-50/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block mb-4"
          >
            <Badge className="bg-gradient-kledje text-white px-6 py-2 text-lg rounded-full">
              <Leaf className="w-5 h-5 ml-2" />
              منتجات طبيعية 100%
            </Badge>
          </motion.div>

          <h1 className="text-6xl font-display text-gradient-kledje mb-6">
            متجر كليج
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشفي مجموعتنا المتنوعة من منتجات العناية بالبشرة الطبيعية المصممة
            خصيصاً للمرأة العربية
          </p>
        </motion.div>

        {/* Featured Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Shield, label: "منتج آمن", value: "100%" },
            { icon: TrendingUp, label: "نمو المبيعات", value: "+150%" },
            { icon: Star, label: "تقييم العملاء", value: "4.8/5" },
            { icon: Clock, label: "سرعة التوصيل", value: "24h" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center p-6 glass rounded-2xl hover-lift"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-teal text-white rounded-xl mb-3"
              >
                <stat.icon className="h-8 w-8" />
              </motion.div>
              <div className="text-2xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bride Box Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <BrideBoxCard onAddToCart={handleAddToCart} />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="ابحثي عن منتج... (مثل: كريم، مرطب، زيت)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 rounded-xl border-gray-300 py-4 text-lg"
                dir="rtl"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full lg:w-56 rounded-xl py-4">
                <SelectValue placeholder="اختاري الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.nameAr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 rounded-xl py-4">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">المميزة أولاً</SelectItem>
                <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
                <SelectItem value="name">الاسم أبجدياً</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("grid")}
                className="rounded-xl"
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("list")}
                className="rounded-xl"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="text-gray-600 text-lg">
            عرض{" "}
            <span className="font-bold text-kledje-600">
              {sortedProducts.length}
            </span>{" "}
            منتج
            {searchTerm && (
              <span className="text-gray-500"> من البحث عن "{searchTerm}"</span>
            )}
            {selectedCategory !== "all" && (
              <span className="text-gray-500">
                {" "}
                في فئة{" "}
                {categories.find((c) => c.id === selectedCategory)?.nameAr}
              </span>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              لم نجد أي منتجات
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              جربي البحث بكلمات أخرى أو تصفحي جميع الفئات لاكتشاف منتجاتنا
              الرائعة
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-gradient-kledje text-white px-8 py-4 rounded-xl text-lg"
            >
              مسح الفلاتر واستكشاف المنتجات
            </Button>
          </motion.div>
        ) : (
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
