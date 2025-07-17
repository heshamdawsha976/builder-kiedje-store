import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  ChevronLeft,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "../data/products";
import { useCartStore } from "../store/cart";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            المن��ج غير موجود
          </h1>
          <Link to="/products">
            <Button>العودة للمنتجات</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-brand-600">
              الرئيسية
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <Link to="/products" className="hover:text-brand-600">
              المنتجات
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-gray-900">{product.nameAr}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-[600px] object-cover rounded-2xl shadow-lg"
            />
            {!product.inStock && (
              <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                نفد المخزون
              </Badge>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 mr-2">(4.8)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.nameAr}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.descriptionAr}
              </p>
            </div>

            <div className="border-t border-b border-gray-100 py-6">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                {product.price} جنيه
              </div>
              <p className="text-gray-600">شامل ضريبة القيمة المضافة</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">الكمية:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-brand-600 hover:bg-brand-700"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "أضف للسلة" : "غير متوفر"}
                </Button>
                <Button variant="outline" size="lg" className="px-4">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="px-4">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-brand-600" />
                <span>توصيل مجاني داخل القاهرة والجيزة</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-brand-600" />
                <span>ضمان استرداد خلال 30 يوم</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              منتجات مشابهة
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <Link to={`/products/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.nameAr}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 hover:text-brand-600 transition-colors">
                        {relatedProduct.nameAr}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-600">
                        {relatedProduct.price} جنيه
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addItem(relatedProduct)}
                        className="bg-brand-600 hover:bg-brand-700"
                      >
                        أضف للسلة
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
