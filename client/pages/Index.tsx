import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Heart, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "../data/products";
import { useCartStore } from "../store/cart";

export default function Index() {
  const { addItem } = useCartStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-brand-50 via-white to-brand-100">
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
                  مجموعة جديدة متاحة الآن
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  جمالك يبدأ من
                  <span className="text-gradient block">كليديج</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                  اكتشفي أفخر مستحضرات التجميل المصممة خصيصاً للمرأة العربية
                  بجودة عالمية وأسعار منافسة
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-brand-600 hover:bg-brand-700 px-8"
                  asChild
                >
                  <Link to="/products">
                    تسوقي الآن
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  شاهدي المجموعة
                </Button>
              </div>

              <div className="flex items-center gap-8 justify-center lg:justify-start pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">500+</div>
                  <div className="text-sm text-gray-600">منتج مميز</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">10k+</div>
                  <div className="text-sm text-gray-600">عميلة سعيدة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">98%</div>
                  <div className="text-sm text-gray-600">رضا العملاء</div>
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
                  src="/placeholder.svg"
                  alt="Klydij Beauty Products"
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 text-brand-600 rounded-lg mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">جودة عالمية</h3>
              <p className="text-gray-600">
                منتجات مصنوعة من أفضل المكونات الطبيعية والآمنة على البشرة
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 text-brand-600 rounded-lg mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
              <p className="text-gray-600">
                توصيل مجاني داخل القاهرة والجيزة خلال 24 ساعة
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-100 text-brand-600 rounded-lg mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ضمان الجودة</h3>
              <p className="text-gray-600">
                ضمان استرداد كامل خلال 30 يوم في حالة عدم الرضا
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشفي أحدث منتجاتنا المختارة بعناية لتناسب جميع احتياجاتك
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {product.nameAr}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.descriptionAr}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-600">
                      {product.price} جنيه
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addItem(product)}
                      className="bg-brand-600 hover:bg-brand-700"
                    >
                      أضف للسلة
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 border-brand-200 text-brand-700 hover:bg-brand-50"
              asChild
            >
              <Link to="/products">
                عرض جميع المنتجات
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-brand-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              اشتركي في نشرتنا الإخبارية
            </h2>
            <p className="text-xl text-brand-100 mb-8">
              كوني أول من يعلم بالعروض الجديدة والمنتجات الحصرية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ادخلي بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-right"
                dir="rtl"
              />
              <Button className="bg-white text-brand-600 hover:bg-gray-100 px-6">
                اشتراك
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
