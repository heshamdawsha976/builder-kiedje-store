import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Shield,
  Truck,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Index() {
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
                  قريباً - متجر جديد
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  جمالك يبدأ من
                  <span className="text-gradient block">كليدج</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                  متجر مستحضرات التجميل الأول المصمم خصيصاً للمرأة العربية بجودة
                  عالمية وأسعار منافسة
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-brand-600 hover:bg-brand-700 px-8"
                  asChild
                >
                  <Link to="/products">
                    ابدئي التسوق
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  تعرفي على كليديج
                </Button>
              </div>

              <div className="flex items-center gap-8 justify-center lg:justify-start pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">500+</div>
                  <div className="text-sm text-gray-600">منتج قريباً</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">100%</div>
                  <div className="text-sm text-gray-600">جودة أصلية</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">24h</div>
                  <div className="text-sm text-gray-600">توصيل سريع</div>
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
                  alt="Kledje Beauty Products"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              لماذا كليدج؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نحن ملتزمون بتقديم أفضل تجربة تسوق لمستحضرات التجميل
            </p>
          </motion.div>

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
              كوني أول من يعرف
            </h2>
            <p className="text-xl text-brand-100 mb-8">
              سجلي في نشرتنا الإخبارية وكوني أول من يعلم بافتتاح المتجر والعروض
              الحصرية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="ادخلي بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-right bg-white"
                dir="rtl"
              />
              <Button className="bg-white text-brand-600 hover:bg-gray-100 px-6">
                اشتراك
              </Button>
            </div>
            <p className="text-sm text-brand-200 mt-4">
              ستحصلين على خصم 20% على أول طلب لك
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-brand-100 text-brand-600 rounded-lg">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">تواصلي معنا</div>
                <div className="text-gray-600">info@klydij.com</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-brand-100 text-brand-600 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">خدمة العملاء</div>
                <div className="text-gray-600 ltr">+20 100 123 4567</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
