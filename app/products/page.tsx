"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ArrowLeft,
  Loader2,
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
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cart";
import {
  strapiAPI,
  type StrapiEntity,
  type ProductAttributes,
  type CategoryAttributes,
  getStrapiImageURL,
  formatStrapiEntities,
} from "@/lib/strapi";

// Product component
const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: StrapiEntity<ProductAttributes>;
  onAddToCart: (product: any) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const formattedProduct = {
    id: product.id,
    ...product.attributes,
  };

  const mainImage = getStrapiImageURL(
    product.attributes.images?.data?.[0] || null,
  );
  const avgRating = 4.5; // TODO: Calculate from reviews
  const reviewCount = 12; // TODO: Get from reviews

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden hover-lift border-0 shadow-lg">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-100">
          <div className="aspect-square relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            )}
            <img
              src={mainImage}
              alt={product.attributes.arabicName}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoading ? "opacity-0" : "opacity-100"}`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </div>

          {/* Sale Badge */}
          {product.attributes.isOnSale && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-3 right-3"
            >
              <Badge className="bg-red-500 text-white px-2 py-1">
                خصم {product.attributes.salePercentage}%
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
            className="absolute bottom-3 left-3 right-3 flex gap-2"
          >
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Eye className="h-4 w-4 ml-2" />
              معاينة
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <div className="mb-2">
            <Badge
              variant="outline"
              className="text-xs text-brand-600 border-brand-200"
            >
              {product.attributes.category?.data?.attributes.arabicName ||
                "عام"}
            </Badge>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.attributes.arabicName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= avgRating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              {product.attributes.price} ج.م
            </span>
            {product.attributes.originalPrice &&
              product.attributes.originalPrice > product.attributes.price && (
                <span className="text-sm text-gray-500 line-through">
                  {product.attributes.originalPrice} ج.م
                </span>
              )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={() => onAddToCart(formattedProduct)}
            className="w-full bg-gradient-primary hover:shadow-lg"
            disabled={product.attributes.inventory === 0}
          >
            {product.attributes.inventory === 0 ? (
              "نفد المخزون"
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 ml-2" />
                إضافة للسلة
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Products Page
export default function ProductsPage() {
  const [products, setProducts] = useState<
    Array<StrapiEntity<ProductAttributes>>
  >([]);
  const [categories, setCategories] = useState<
    Array<StrapiEntity<CategoryAttributes>>
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { toast } = useToast();
  const { addItem } = useCartStore();

  // Fetch products from Strapi
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await strapiAPI.getProducts({
        page: currentPage,
        pageSize: 12,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        search: searchTerm || undefined,
        populate: ["images", "category", "reviews"],
      });

      setProducts(response.data);
      setTotalPages(response.meta.pagination?.pageCount || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "خطأ في تحميل المنتجات",
        description: "حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from Strapi
  const fetchCategories = async () => {
    try {
      const response = await strapiAPI.getCategories(["image"]);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Reload products when filters change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, searchTerm]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.arabicName,
      price: product.price,
      image: getStrapiImageURL(product.images?.data?.[0] || null),
      category: product.category?.data?.attributes?.arabicName || "عام",
    });

    toast({
      title: "تم إضافة المنتج",
      description: `تم إضافة ${product.arabicName} إلى السلة`,
    });
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.attributes.price - b.attributes.price;
      case "price-high":
        return b.attributes.price - a.attributes.price;
      case "name":
        return a.attributes.arabicName.localeCompare(b.attributes.arabicName);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display text-gradient mb-4">
            متجر كليدج
          </h1>
          <p className="text-xl text-gray-600">
            اكتشفي مجموعتنا المتنوعة من منتجات العناية بالبشرة الطبيعية
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="ابحثي عن منتج..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pr-10 rounded-xl border-gray-300"
                dir="rtl"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full lg:w-48 rounded-xl">
                <SelectValue placeholder="اختاري الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.attributes.slug}
                  >
                    {category.attributes.arabicName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 rounded-xl">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">الاسم</SelectItem>
                <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-xl"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-xl"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-gray-600">
            {loading ? (
              "جاري التحميل..."
            ) : (
              <>
                عرض {products.length} منتج
                {searchTerm && ` من البحث عن "${searchTerm}"`}
                {selectedCategory !== "all" && (
                  <>
                    {" "}
                    في فئة{" "}
                    {
                      categories.find(
                        (c) => c.attributes.slug === selectedCategory,
                      )?.attributes.arabicName
                    }
                  </>
                )}
              </>
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              لم نجد أي منتجات
            </h3>
            <p className="text-gray-600 mb-6">
              جربي البحث بكلمات أخرى أو تصفحي جميع الفئات
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-gradient-primary"
            >
              مسح الفلاتر
            </Button>
          </motion.div>
        ) : (
          <div
            className={`grid gap-6 ${
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-xl"
            >
              السابق
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="rounded-xl w-10 h-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-xl"
            >
              التالي
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
