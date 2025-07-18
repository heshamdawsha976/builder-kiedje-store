"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  Star,
  DollarSign,
  Image as ImageIcon,
  Save,
  X,
  Upload,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Mock Products Data
const mockProducts = [
  {
    id: "1",
    name: "كريم ترطيب الوجه",
    nameEn: "Face Moisturizer Cream",
    price: 299,
    oldPrice: 350,
    category: "العناية بالوجه",
    image: "/placeholder.svg",
    stock: 25,
    status: "active",
    rating: 4.8,
    sales: 156,
    description:
      "كريم ترطيب طبيعي للوجه مناسب لجميع أنواع البشرة مع خلاصة الألوة فيرا",
  },
  {
    id: "2",
    name: "سيروم فيتامين C",
    nameEn: "Vitamin C Serum",
    price: 450,
    oldPrice: null,
    category: "السيروم",
    image: "/placeholder.svg",
    stock: 12,
    status: "active",
    rating: 4.9,
    sales: 89,
    description:
      "سيروم فيتامين C المضاد للأكسدة لإشراق البشرة ومحاربة التجاعيد",
  },
  {
    id: "3",
    name: "غسول الوجه المنظف",
    nameEn: "Gentle Face Cleanser",
    price: 189,
    oldPrice: 220,
    category: "العناية بالوجه",
    image: "/placeholder.svg",
    stock: 0,
    status: "out_of_stock",
    rating: 4.6,
    sales: 234,
    description: "غسول لطيف للوجه ينظف البشرة بعمق دون ترك جفاف",
  },
];

// Product Card Component
const ProductCard = ({ product, onEdit, onDelete, onView }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge
            className={`${
              product.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.status === "active" ? "متاح" : "نفد المخزون"}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.nameEn}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-brand-600">
            {product.price} ج.م
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice} ج.م
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>المخزون: {product.stock}</span>
          <span>المبيعات: {product.sales}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(product)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 ml-1" />
            عرض
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 ml-1" />
            تعديل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Add/Edit Product Modal
const ProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      nameEn: "",
      price: "",
      oldPrice: "",
      category: "",
      stock: "",
      description: "",
      image: "",
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {product ? "تعديل المنتج" : "إضافة منتج جديد"}
                </h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">اسم المنتج (عربي)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="mt-2 text-right"
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nameEn">اسم المنتج (انجليزي)</Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={(e) => handleChange("nameEn", e.target.value)}
                    className="mt-2"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price">السعر الحالي</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="oldPrice">السعر القديم (اختياري)</Label>
                  <Input
                    id="oldPrice"
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => handleChange("oldPrice", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="mt-2 text-right"
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">المخزون</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="mt-2 text-right"
                  dir="rtl"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">صورة المنتج</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    اضغط لرفع صورة أو اسحب الصورة هنا
                  </p>
                  <Input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary text-white"
                >
                  <Save className="h-4 w-4 ml-2" />
                  {product ? "حفظ التغييرات" : "إضافة المنتج"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = ["all", "العناية بالوجه", "السيروم", "منتجات التنظيف"];

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (term, category) => {
    let filtered = products;

    if (term) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.nameEn.toLowerCase().includes(term.toLowerCase()),
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setFilteredProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Edit existing product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p,
        ),
      );
      setFilteredProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p,
        ),
      );
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        status: "active",
        rating: 0,
        sales: 0,
        image: "/placeholder.svg",
      };
      setProducts((prev) => [...prev, newProduct]);
      setFilteredProducts((prev) => [...prev, newProduct]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 mr-80">
        <AdminHeader title="إدارة المنتجات" subtitle="إضافة وتعديل المنتجات" />

        <main className="p-6">
          {/* Header Actions */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="البحث عن المنتجات..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-4 pr-12 py-3 rounded-xl text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleCategoryFilter(category)}
                    className={
                      selectedCategory === category
                        ? "bg-brand-600 hover:bg-brand-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }
                  >
                    {category === "all" ? "الكل" : category}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleAddProduct}
                className="bg-gradient-primary text-white hover:shadow-lg"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">إجمالي المنتجات</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-brand-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">متاح في المخزون</p>
                  <p className="text-2xl font-bold text-green-600">
                    {products.filter((p) => p.status === "active").length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">نفد المخزون</p>
                  <p className="text-2xl font-bold text-red-600">
                    {products.filter((p) => p.status === "out_of_stock").length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">متوسط السعر</p>
                  <p className="text-2xl font-bold text-brand-600">
                    {Math.round(
                      products.reduce((sum, p) => sum + p.price, 0) /
                        products.length,
                    )}{" "}
                    ج.م
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-brand-500" />
              </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onView={(product) => console.log("View product:", product)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                لا توجد منتجات
              </h3>
              <p className="text-gray-600 mb-6">
                لم يتم العثور على منتجات تطابق معايير البحث
              </p>
              <Button
                onClick={handleAddProduct}
                className="bg-gradient-primary"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج جديد
              </Button>
            </motion.div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
