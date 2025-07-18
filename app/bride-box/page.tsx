"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  ShoppingCart,
  Package,
  Gift,
  Sparkles,
  Award,
  Clock,
  Shield,
  Truck,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Share2,
  BookOpen,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { brideBox } from "@/client/data/products";
import Link from "next/link";

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Product Benefits Component
const BenefitCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="text-center p-6 glass rounded-2xl hover-lift"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-coral text-white rounded-xl mb-4 shadow-lg"
    >
      <Icon className="h-8 w-8" />
    </motion.div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

// Product Content Item
const ContentItem = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start gap-4 p-4 bg-gradient-to-r from-coral-50 to-teal-50 rounded-xl hover-lift"
  >
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="flex items-center justify-center w-8 h-8 bg-gradient-teal text-white rounded-full text-sm font-bold shadow-md flex-shrink-0 mt-1"
    >
      {index + 1}
    </motion.div>
    <div className="flex-1">
      <p className="text-gray-700 leading-relaxed font-medium">{item}</p>
    </div>
  </motion.div>
);

// Stats Component
const StatsSection = () => {
  const stats = [
    { icon: Users, value: "500+", label: "عروسة سعيدة" },
    { icon: Star, value: "4.9", label: "تقييم العملاء" },
    { icon: TrendingUp, value: "95%", label: "معدل الرضا" },
    { icon: Gift, value: "25%", label: "توفير مضمون" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="text-center p-6 glass rounded-2xl hover-lift"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-kledje text-white rounded-xl mb-3 shadow-lg"
          >
            <stat.icon className="h-7 w-7" />
          </motion.div>
          <div className="text-3xl font-bold text-gradient-kledje mb-1">
            {stat.value}
          </div>
          <div className="text-gray-600 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default function BrideBoxPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const discountPercentage = Math.round(
    ((brideBox.originalPrice - brideBox.price) / brideBox.originalPrice) * 100,
  );

  const totalPrice = brideBox.price * quantity;
  const savings = (brideBox.originalPrice - brideBox.price) * quantity;

  const handleAddToCart = () => {
    console.log("Adding bride box to cart:", { ...brideBox, quantity });
  };

  const productImages = [
    brideBox.image,
    // يمكن إضافة صور أخرى هنا
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kledje-50/30 via-white to-coral-50/30">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-gray-600 mb-8"
        >
          <Link href="/" className="hover:text-kledje-600 transition-colors">
            الرئيسية
          </Link>
          <ArrowLeft className="h-4 w-4" />
          <Link
            href="/products"
            className="hover:text-kledje-600 transition-colors"
          >
            المنتجات
          </Link>
          <ArrowLeft className="h-4 w-4" />
          <span className="text-kledje-600 font-medium">بوكس العروسة</span>
        </motion.nav>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coral-100/50 via-transparent to-kledje-100/30" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <FloatingElement delay={0} duration={4}>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
                  <OptimizedImage
                    src={productImages[selectedImageIndex]}
                    alt={brideBox.nameAr}
                    width={600}
                    height={600}
                    className="w-full aspect-square object-cover rounded-2xl"
                    priority
                    animationType="fade"
                  />

                  {/* Special Badges */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-8 right-8"
                  >
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      <Award className="w-5 h-5 ml-2" />
                      عرض محدود
                    </Badge>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-8 left-8"
                  >
                    <Badge className="bg-gradient-coral text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      خصم {discountPercentage}%
                    </Badge>
                  </motion.div>
                </div>
              </FloatingElement>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-kledje rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-teal rounded-full opacity-15 blur-xl" />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Category & Rating */}
              <div className="flex items-center gap-4">
                <Badge className="bg-gradient-coral text-white px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 ml-2" />
                  مجموعة العروسة
                </Badge>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(brideBox.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {brideBox.rating} ({brideBox.reviewCount} تقييم)
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-5xl font-display text-gradient-kledje mb-4">
                  {brideBox.nameAr}
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {brideBox.descriptionAr}
                </p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-coral-50 to-kledje-50 p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {totalPrice} ج.م
                  </span>
                  <span className="text-2xl text-gray-500 line-through">
                    {brideBox.originalPrice * quantity} ج.م
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 px-3 py-1">
                    وفر {savings} ج.م
                  </Badge>
                  <span className="text-green-600 font-medium">
                    ({discountPercentage}% خصم)
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-gray-900">
                  الكمية:
                </span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white py-4 rounded-xl font-bold text-lg hover-glow shadow-lg"
                  size="lg"
                >
                  <ShoppingCart className="h-6 w-6 ml-2" />
                  إضافة للسلة - {totalPrice} ج.م
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsInWishlist(!isInWishlist)}
                    className={`rounded-xl py-3 border-2 transition-all ${
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

                  <Button
                    variant="outline"
                    className="rounded-xl py-3 border-2 border-gray-300 text-gray-700 hover:border-kledje-300"
                  >
                    <Share2 className="h-5 w-5 ml-2" />
                    مشاركة
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "ضمان الجودة" },
                  { icon: Truck, text: "توصيل مجاني" },
                  { icon: Gift, text: "تغليف فاخر" },
                  { icon: Clock, text: "متوفر الآن" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/50 rounded-xl"
                  >
                    <feature.icon className="h-5 w-5 text-kledje-600" />
                    <span className="text-gray-700 font-medium">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display text-gradient-kledje mb-4">
              أرقام تتحدث عن نفسها
            </h2>
            <p className="text-xl text-gray-600">
              ثقة آلاف العرائس في بوكس كليج المميز
            </p>
          </motion.div>
          <StatsSection />
        </div>
      </section>

      {/* Product Contents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display text-gradient-coral mb-4">
              محتويات البوكس المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              مجموعة شاملة ومتكاملة من منتجات العناية الطبيعية المصممة خصيصاً
              لجمال العروسة
            </p>
          </motion.div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {brideBox.contents.map((item, index) => (
              <ContentItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-br from-kledje-50/50 to-coral-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display text-gradient-teal mb-4">
              لماذا بوكس العروسة من كليج؟
            </h2>
            <p className="text-xl text-gray-600">
              فوائد استثنائية تجعل يوم زفافك لا يُنسى
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={Sparkles}
              title="إشراق طبيعي"
              description="تركيبات طبيعية 100% تمنح بشرتك إشراقاً ونعومة استثنائية ليوم زفافك"
              delay={0}
            />
            <BenefitCard
              icon={Award}
              title="جودة مضمونة"
              description="منتجات معتمدة ومجربة من آلاف العرائس مع ضمان الرضا التام"
              delay={0.2}
            />
            <BenefitCard
              icon={Gift}
              title="قيمة استثنائية"
              description="وفر 25% مقارنة بالشراء المنفصل مع تغليف فاخر يليق بمناسبتك الخاصة"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display text-gradient-kledje mb-4">
              تجارب العرائس الحقيقية
            </h2>
            <p className="text-xl text-gray-600">
              كلمات من القلب من عرائس اختارن كليج
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "سارة أحمد",
                review:
                  "بوكس كليج كان الخيار الأمثل لزفافي! المنتجات طبيعية ورائعة والنتائج فاقت توقعاتي",
                rating: 5,
              },
              {
                name: "نور محمد",
                review:
                  "استخدمت البوكس لمدة شهر قبل الزفاف وكانت النتيجة مذهلة. بشرتي أصبحت أكثر نعومة وإشراقاً",
                rating: 5,
              },
              {
                name: "مريم علي",
                review:
                  "أفضل استثمار لجمالي! التغليف فاخر والمنتجات ذات جودة عالية. أنصح كل عروسة بتجربته",
                rating: 5,
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 glass rounded-2xl hover-lift"
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                <div className="text-sm font-medium text-kledje-600">
                  - {review.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-coral relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <FloatingElement duration={5}>
            <Heart className="absolute top-10 right-10 h-20 w-20 text-white" />
          </FloatingElement>
          <FloatingElement delay={2} duration={4}>
            <Sparkles className="absolute bottom-20 left-20 h-16 w-16 text-white" />
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="text-5xl font-display mb-6">جمالك يستحق الأفضل</h2>
            <p className="text-2xl mb-8 leading-relaxed opacity-90">
              لا تفوتي فرصة الحصول على بوكس العروسة المميز بسعر خاص لفترة محدودة
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="bg-white text-coral-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-2xl font-bold hover-lift shadow-xl"
              >
                <Package className="h-6 w-6 ml-2" />
                اطلبي الآن
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-coral-600 px-12 py-4 text-xl rounded-2xl font-bold"
                asChild
              >
                <Link href="/contact">
                  <BookOpen className="h-6 w-6 ml-2" />
                  استشارة مجانية
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
