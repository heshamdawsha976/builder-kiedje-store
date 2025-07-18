"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  Crown,
  Gift,
  Shield,
  Truck,
  Award,
  Users,
  TrendingUp,
  Leaf,
  Droplets,
  Sun,
  Flower,
  Zap,
  Eye,
  Play,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Floating Elements Component
const FloatingElements = () => {
  const elements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-kledje opacity-5 blur-sm"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Hero Section
const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const slides = [
    {
      title: "بشرتك تستحق الأفضل",
      subtitle: "منتجات طبيعية 100% من كليدج",
      description:
        "اكتشفي عالم العناية الطبيعية مع مجموعة كليدج المتميزة من المنتجات الآمنة والفعّالة",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F580656f7a98a49358ec03cb194b43bf9?format=webp&width=800",
      cta: "اكتشفي المجموعة",
      ctaSecondary: "بوكس العروسة",
    },
    {
      title: "جمالك الطبيعي",
      subtitle: "يبدأ من هنا",
      description:
        "منتجات مصممة خصيصاً للمرأة العربية مع أحدث التقنيات الطبيعية وأفضل المكونات",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7a885a24c7e54403b735ab61519a4b3d?format=webp&width=800",
      cta: "تسوقي الآن",
      ctaSecondary: "تعرفي علينا",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingElements />

      {/* Background Gradient */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-kledje-100/30 via-coral-50/20 to-teal-100/30"
      />

      {/* Decorative Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-kledje rounded-full opacity-10 blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-coral rounded-full opacity-8 blur-3xl"
      />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <Badge className="bg-gradient-to-r from-kledje-500 to-coral-500 text-white px-8 py-3 text-lg rounded-full shadow-xl">
                <Sparkles className="w-5 h-5 ml-2" />
                منتجات طبيعية معتمدة
                <Crown className="w-5 h-5 mr-2" />
              </Badge>
            </motion.div>

            {/* Title */}
            <div className="space-y-4">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl lg:text-8xl font-display leading-tight"
              >
                <span className="block text-gray-900 mb-2">
                  {slides[currentSlide].title}
                </span>
                <span className="block text-gradient-kledje text-7xl lg:text-9xl font-black">
                  {slides[currentSlide].subtitle}
                </span>
              </motion.h1>

              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-kledje-500 to-kledje-600 hover:from-kledje-600 hover:to-kledje-700 text-white px-12 py-4 text-xl rounded-2xl shadow-xl relative overflow-hidden group"
                >
                  <Link href="/products">
                    <Zap className="ml-2 h-6 w-6" />
                    {slides[currentSlide].cta}
                    <ArrowLeft className="mr-2 h-6 w-6" />
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 border-coral-400 text-coral-600 hover:bg-coral-50 hover:border-coral-500 px-12 py-4 text-xl rounded-2xl"
                >
                  <Link href="/bride-box">
                    <Heart className="ml-2 h-6 w-6" />
                    {slides[currentSlide].ctaSecondary}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { value: "100%", label: "طبيعي" },
                { value: "24h", label: "توصيل" },
                { value: "30", label: "يوم ضمان" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gradient-kledje mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <img
                  src={slides[currentSlide].image}
                  alt="منتجات كليدج الطبيعية"
                  className="w-full aspect-square object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-kledje-600/20 via-transparent to-coral-300/10 rounded-3xl" />

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 right-8 glass-kledje rounded-2xl p-4 text-center"
                >
                  <Award className="h-8 w-8 text-kledje-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-800">
                    منتج العام
                  </div>
                  <Badge className="mt-2 bg-kledje-500 text-white text-xs">
                    2024
                  </Badge>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="absolute bottom-8 left-8 glass-coral rounded-2xl p-4 text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    تقييم ممتاز
                  </div>
                  <Badge className="mt-2 bg-yellow-500 text-white text-xs">
                    +2000 تقييم
                  </Badge>
                </motion.div>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-teal rounded-3xl opacity-20 -z-10 transform rotate-3" />
            <div className="absolute top-8 left-8 w-full h-full bg-gradient-coral rounded-3xl opacity-15 -z-20 transform -rotate-2" />
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-kledje-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 cursor-pointer lg:bottom-16"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">اكتشف المزيد</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </motion.div>
    </section>
  );
};

// Product Categories Section
const ProductCategories = () => {
  const categoriesRef = useRef(null);
  const isInView = useInView(categoriesRef, { once: true });

  const categories = [
    {
      icon: Droplets,
      title: "العناية بالوجه",
      description: "كريمات ومرطبات طبيعية للعناية اليومية بالوجه",
      color: "from-teal-400 to-teal-600",
      count: "15+ منتج",
    },
    {
      icon: Leaf,
      title: "العناية بالجسم",
      description: "منتجات ��بيعية للعناية الشاملة بالجسم",
      color: "from-kledje-400 to-kledje-600",
      count: "12+ منتج",
    },
    {
      icon: Sun,
      title: "العناية بالشعر",
      description: "زيوت وكريمات طبيعية لشعر صحي ولامع",
      color: "from-coral-400 to-coral-600",
      count: "8+ منتج",
    },
    {
      icon: Flower,
      title: "مجموعات مميزة",
      description: "بوكس العروسة ومجموعات الهدايا الفاخرة",
      color: "from-pink-400 to-pink-600",
      count: "5+ مجموعة",
    },
  ];

  return (
    <section ref={categoriesRef} className="py-24 bg-white/50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-kledje-50/30 via-transparent to-coral-50/20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-coral text-white px-6 py-2 text-lg rounded-full mb-6">
            <Gift className="w-5 h-5 ml-2" />
            فئات المنتجات
          </Badge>
          <h2 className="text-5xl lg:text-6xl font-display text-gradient-kledje mb-6">
            عالم من الجمال الطبيعي
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشفي مجموعتنا المتنوعة من منتجات العناية الطبيعية المصممة لتلبية
            جميع احتياجاتك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden hover-lift border-0 shadow-lg h-full">
                <div
                  className={`p-8 bg-gradient-to-br ${category.color} text-white relative overflow-hidden`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
                  >
                    <category.icon className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <Badge className="bg-white/20 text-white border-0">
                    {category.count}
                  </Badge>

                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <category.icon className="w-full h-full" />
                    </motion.div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Button className="w-full bg-gradient-kledje text-white hover:shadow-lg">
                    <Eye className="h-4 w-4 ml-2" />
                    استكشف المنتجات
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products Section
const FeaturedProducts = () => {
  const productsRef = useRef(null);
  const isInView = useInView(productsRef, { once: true });

  const products = [
    {
      id: 1,
      name: "كريم مخمرية للوجه",
      price: 150,
      originalPrice: 200,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7a885a24c7e54403b735ab61519a4b3d?format=webp&width=800",
      rating: 4.8,
      reviews: 245,
      badge: "الأكثر مبيعاً",
    },
    {
      id: 2,
      name: "كريم مزيل العرق",
      price: 80,
      originalPrice: 100,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2Fa035da9c93824b8eb95dfaab87d9f08a?format=webp&width=800",
      rating: 4.6,
      reviews: 189,
      badge: "جديد",
    },
    {
      id: 3,
      name: "كريم الشعر بزيت الجوجوبا",
      price: 120,
      originalPrice: 160,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7b3b23bf7f46460b889ed51a6eb0283f?format=webp&width=800",
      rating: 4.9,
      reviews: 312,
      badge: "مميز",
    },
  ];

  return (
    <section
      ref={productsRef}
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-teal text-white px-6 py-2 text-lg rounded-full mb-6">
            <Star className="w-5 h-5 ml-2" />
            المنتجات المميزة
          </Badge>
          <h2 className="text-5xl lg:text-6xl font-display text-gradient-coral mb-6">
            الأكثر حباً من عملائنا
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشفي أكثر منتجاتنا مبيعاً والتي نالت إعجاب آلاف العملاء
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Card className="overflow-hidden hover-lift border-0 shadow-lg">
                <div className="relative overflow-hidden bg-gradient-to-br from-kledje-50 to-coral-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badge */}
                  <Badge className="absolute top-4 right-4 bg-gradient-coral text-white">
                    {product.badge}
                  </Badge>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-white/90 text-gray-700"
                      >
                        <Eye className="h-4 w-4 ml-2" />
                        معاينة
                      </Button>
                      <Button size="sm" className="bg-white/90 text-gray-700">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {product.name}
                  </h3>

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
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price} ج.م
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice} ج.م
                    </span>
                  </div>

                  <Button className="w-full bg-gradient-kledje text-white hover:shadow-lg">
                    <ShoppingBag className="h-5 w-5 ml-2" />
                    إضافة للسلة
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-coral-500 to-coral-600 text-white px-12 py-4 text-xl rounded-2xl"
          >
            <Link href="/products">
              عرض جميع المنتجات
              <ArrowLeft className="mr-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const features = [
    {
      icon: Leaf,
      title: "100% طبيعي",
      description: "جميع منتجاتنا مصنوعة من مكونات طبيعية معتمدة وآمنة",
    },
    {
      icon: Shield,
      title: "ضمان الجودة",
      description: "ضمان استرداد كامل خلال 30 يوم مع استشارة مجانية",
    },
    {
      icon: Truck,
      title: "توصيل سريع",
      description: "توصيل مجاني خلال 24 ساعة في جميع أنحاء مصر",
    },
    {
      icon: Users,
      title: "خدمة العملاء",
      description: "فريق متخصص لخدمتك على مدار الساعة",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-kledje-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-display text-gradient-kledje mb-6">
            لماذا تختارين كليدج؟
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن ملتزمون بتقديم أفضل تجربة عناية طبيعية لك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 glass rounded-3xl hover-lift"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-kledje text-white rounded-2xl mb-6 shadow-lg"
              >
                <feature.icon className="h-10 w-10" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 bg-gradient-kledje relative overflow-hidden">
      <FloatingElements />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-4xl mx-auto"
        >
          <Badge className="bg-white/20 text-white px-6 py-2 text-lg rounded-full mb-6 border-0">
            <Mail className="w-5 h-5 ml-2" />
            انضمي لعائلة كليدج
          </Badge>

          <h2 className="text-5xl lg:text-6xl font-display mb-6">
            احصلي على العروض الحصرية
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            اشتركي في نشرتنا البريدية واحصلي على خصم 20% على أول طلب
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8"
          >
            <Input
              type="email"
              placeholder="ادخلي بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl text-gray-900 text-right bg-white/95 backdrop-blur-sm border-0 text-xl"
              dir="rtl"
            />
            <Button className="bg-white text-kledje-600 hover:bg-gray-100 px-8 py-4 text-xl rounded-2xl font-bold">
              اشتراك مجاني
            </Button>
          </motion.div>

          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>خصم 20% على أول طلب</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>نصائح عناية مجانية</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>عروض حصرية</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Phone,
              title: "اتصل�� بنا",
              description: "خدمة العملاء 24/7",
              contact: "+20 100 123 4567",
            },
            {
              icon: Mail,
              title: "راسلينا",
              description: "استشارة مجانية",
              contact: "info@kledje.com",
            },
            {
              icon: MapPin,
              title: "زورينا",
              description: "العنوان الرئيسي",
              contact: "القاهرة، مصر",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-8 glass rounded-3xl hover-lift group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-coral text-white rounded-2xl mb-6 shadow-lg"
              >
                <item.icon className="h-8 w-8" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="text-lg font-medium text-kledje-600">
                {item.contact}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <EnhancedHero />
      <ProductCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <NewsletterSection />
      <ContactSection />
    </div>
  );
}
