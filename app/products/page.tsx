"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  Gift,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagneticButton, GlowButton } from "@/components/InteractiveButtons";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Floating Elements Component
const FloatingElements = () => {
  const elements = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element}
          className="absolute"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {element % 3 === 0 ? (
            <Sparkles className="w-4 h-4 text-brand-400" />
          ) : element % 3 === 1 ? (
            <Heart className="w-3 h-3 text-secondary-400" />
          ) : (
            <Star className="w-3 h-3 text-accent-400" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "backOut" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass p-6 rounded-3xl hover-lift group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary text-white rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
      >
        <Icon className="h-8 w-8" />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gradient transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <FloatingElements />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-primary rounded-full shadow-2xl relative">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Package className="h-16 w-16 text-white" />
              </motion.div>

              {/* Floating crown */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6"
              >
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <Badge className="bg-gradient-secondary text-white px-6 py-2 text-lg border-0 mb-6">
              <Sparkles className="w-4 h-4 ml-2" />
              قريباً - مجموعة استثنائية
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-display leading-tight">
              <span className="text-gray-900 block">مجموعة منتجات</span>
              <span className="text-gradient block text-6xl lg:text-8xl font-black">
                كليدج الفاخرة
              </span>
            </h1>

            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-modern">
              نحن نعمل بجد لإنشاء مجموعة استثنائية من أفضل منتجات العناية
              بالبشرة الطبيعية في العالم، مصممة خصيصاً للمرأة العربية بجودة
              عالمية ولمسة من الفخامة
            </p>
          </motion.div>

          {/* Notification Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-strong p-8 rounded-3xl max-w-2xl mx-auto mt-12 border border-white/30"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <Gift className="h-16 w-16 text-gradient mx-auto" />
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 استعدي للإطلاق الكبير
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              ستحصلين على أفضل منتجات العناية بالبشرة مع تقنيات متطورة وأسعار لا
              تقاوم. كوني أول من يعلم!
            </p>

            {/* Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6"
            >
              <input
                type="email"
                placeholder="ادخ��ي بريدك للحصول على إشعار فوري"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-900 text-right text-lg focus:border-brand-400 focus:outline-none transition-colors duration-300"
                dir="rtl"
              />
              <GlowButton className="px-8 py-4 whitespace-nowrap">
                <Sparkles className="w-5 h-5 ml-2" />
                إشعار فوري
              </GlowButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg text-gray-600"
            >
              💝 ستحصلين على خصم 30% حصري عند الإطلاق + هدية مجانية
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-display text-center text-gradient mb-12">
            ما ينتظرك في مجموعة كليدج
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Sparkles}
              title="تقنيات متطورة"
              description="أحدث تقنيات العناية بالبشرة مع مكونات طبيعية 100% ونتائج مثبتة علمياً"
              delay={0}
            />
            <FeatureCard
              icon={Crown}
              title="جودة فاخرة"
              description="منتجات بمعايير عالمية وتصميم أنيق يليق بجمالك الطبيعي"
              delay={0.2}
            />
            <FeatureCard
              icon={Heart}
              title="مصمم خصيصاً"
              description="مطور خصيصاً للبشرة العربية مع مراعاة احتياجاتها الخاصة"
              delay={0.4}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MagneticButton
              variant="primary"
              size="lg"
              icon={ArrowLeft}
              onClick={() => {}}
            >
              <Link href="/">العودة للرئيسية</Link>
            </MagneticButton>

            <MagneticButton
              variant="outline"
              size="lg"
              icon={Heart}
              onClick={() => {}}
            >
              تابعي صفحتنا
            </MagneticButton>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600"
          >
            <p>💬 أو تواصلي معنا للاستفسارات الخاصة والاستشارات المجانية</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-primary rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-accent rounded-full opacity-5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-secondary rounded-full opacity-3 blur-3xl" />
    </div>
  );
}
