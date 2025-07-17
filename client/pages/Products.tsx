import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { products, categories } from "../data/products";
import { useCartStore } from "../store/cart";

export default function Products() {
  const { addItem } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مجموعة منتجات كليديج
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشفي أفضل مستحضرات التجميل المصممة خصيصاً لجمالك الطبيعي
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحثي عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-brand-600 hover:bg-brand-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                >
                  {category.nameAr}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
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
              </Link>

              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 hover:text-brand-600 transition-colors">
                    {product.nameAr}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.descriptionAr}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-600">
                    {product.price} جنيه
                  </span>
                  <Button
                    size="sm"
                    onClick={() => addItem(product)}
                    disabled={!product.inStock}
                    className="bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300"
                  >
                    {product.inStock ? "أضف للسلة" : "غير متوفر"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              لم نجد منتجات مطابقة
            </h3>
            <p className="text-gray-500">
              جربي تغيير معايير البحث أو الفئة المختارة
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
