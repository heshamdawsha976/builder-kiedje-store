"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  Award,
  Crown,
  Zap,
  ShoppingBag,
  Play,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-gradient-kledje rounded-full opacity-40"
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 200 - 100, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Product Showcase Component
const ProductShowcase = () => {
  const [currentProduct, setCurrentProduct] = useState(0);

  const products = [
    {
      name: "كريم مخمرية للوجه",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7a885a24c7e54403b735ab61519a4b3d?format=webp&width=800",
      badge: "الأكثر مبيعاً",
      color: "from-coral-400 to-coral-600",
    },
    {
      name: "كريم مزيل العرق",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2Fa035da9c93824b8eb95dfaab87d9f08a?format=webp&width=800",
      badge: "جديد",
      color: "from-teal-400 to-teal-600",
    },
    {
      name: "كريم الشعر بالجوجوبا",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fec4ae7314ee64f3081bd38c6ef00b7df%2F7b3b23bf7f46460b889ed51a6eb0283f?format=webp&width=800",
      badge: "مميز",
      color: "from-kledje-400 to-kledje-600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Main Product Display */}
      <motion.div
        key={currentProduct}
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="relative z-10"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white/50 bg-white">
          <OptimizedImage
            src={products[currentProduct].image}
            alt={products[currentProduct].name}
            width={500}
            height={500}
            className="w-full aspect-square object-cover"
            priority
            animationType="fade"
          />

          {/* Product Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-6 right-6"
          >
            <Badge
              className={`bg-gradient-to-r ${products[currentProduct].color} text-white px-4 py-2 rounded-full font-bold shadow-lg`}
            >
              <Star className="w-4 h-4 ml-1" />
              {products[currentProduct].badge}
            </Badge>
          </motion.div>

          {/* Play Button for Interactive Demo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-6 left-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-white transition-colors"
          >
            <Play className="w-6 h-6 text-kledje-600 mr-1" />
          </motion.div>
        </div>
      </motion.div>

      {/* Product Indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentProduct(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentProduct
                ? "bg-kledje-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Background Decorations */}
      <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-coral rounded-3xl opacity-10 -z-10 transform rotate-3" />
      <div className="absolute top-8 left-8 w-full h-full bg-gradient-teal rounded-3xl opacity-10 -z-20 transform -rotate-2" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-kledje rounded-full opacity-20 blur-xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-coral rounded-full opacity-15 blur-xl"
      />
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = end / (duration * 60);
      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / 60);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return (
    <span className="text-gradient-kledje font-bold">
      {count}
      {suffix}
    </span>
  );
};

// Stats Component
const HeroStats = () => {
  const stats = [
    { value: 100, suffix: "%", label: "طبيعي" },
    { value: 24, suffix: "h", label: "توصيل" },
    { value: 1000, suffix: "+", label: "عميلة سعيدة" },
    { value: 30, suffix: "", label: "يوم ضمان" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="grid grid-cols-4 gap-6 mt-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
          className="text-center group cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            <AnimatedCounter
              end={stat.value}
              suffix={stat.suffix}
              delay={1500 + index * 200}
            />
          </motion.div>
          <div className="text-gray-600 font-medium text-sm md:text-base">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main Hero Component
export const ModernHero = () => {
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const opacity = useTransform(springProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(springProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(springProgress, [0, 0.3], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-kledje-50/50 via-white to-coral-50/30">
      <FloatingParticles />

      {/* Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-kledje rounded-full opacity-5 blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-coral rounded-full opacity-5 blur-3xl"
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div style={{ opacity, scale, y }} className="relative">
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
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Badge className="bg-gradient-to-r from-coral-500 to-teal-500 text-white px-8 py-3 text-lg border-0 rounded-full shadow-lg hover-glow">
                  <Sparkles className="w-5 h-5 ml-2" />
                  منتجات طبيعية 100%
                  <Crown className="w-5 h-5 mr-2" />
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-6xl lg:text-8xl font-display leading-tight"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    className="block text-gray-900 mb-2"
                  >
                    بشرتك تستحق
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    className="block text-gradient-kledje text-7xl lg:text-9xl font-black relative"
                  >
                    كليدج
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-coral rounded-full opacity-60"
                    />
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-modern"
                >
                  تجربة عناية فاخرة مع منتجات طبيعية 100% مصممة خصيصاً للمرأة
                  العربية مع ضمان الجودة والنتائج المذهلة
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-kledje-500 to-kledje-600 hover:from-kledje-600 hover:to-kledje-700 text-white px-12 py-4 text-xl rounded-2xl border-0 shadow-xl relative overflow-hidden"
                    asChild
                  >
                    <Link href="/products">
                      <Zap className="ml-2 h-6 w-6" />
                      اكتشفي منتجاتنا
                      <ArrowLeft className="mr-2 h-6 w-6" />
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-coral-400 text-coral-600 hover:bg-coral-50 hover:border-coral-500 px-12 py-4 text-xl rounded-2xl hover-lift backdrop-blur-sm"
                    asChild
                  >
                    <Link href="/bride-box">
                      <Heart className="ml-2 h-6 w-6" />
                      بوكس العروسة
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Hero Stats */}
              <HeroStats />

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-6 pt-8"
              >
                {[
                  { icon: Award, text: "جودة مضمونة" },
                  { icon: ShoppingBag, text: "توصيل مجاني" },
                  { icon: Star, text: "تقييم 5 نجوم" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 text-gray-600 cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-kledje-500" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative lg:block hidden"
            >
              <ProductShowcase />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">اكتشف المزيد</span>
          <div className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gradient-kledje rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ModernHero;
