"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Droplets,
  Leaf,
  Sun,
  Flower,
  Truck,
  Shield,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModernHero } from "@/components/ui/modern-hero";

// Category Card Component
const CategoryCard = ({ icon: Icon, title, description, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
      className="group cursor-pointer"
    >
      <div
        className={`relative p-8 rounded-3xl overflow-hidden glass hover-lift interactive ${color}`}
      >
        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30"
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-white/90 leading-relaxed">{description}</p>
        </div>

        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <Icon className="w-full h-full" />
          </motion.div>
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  gradient,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="relative group"
    >
      <div
        className={`text-center p-8 glass rounded-3xl hover-lift interactive border-gradient ${gradient}`}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-kledje text-white rounded-2xl mb-6 shadow-lg"
        >
          <Icon className="h-10 w-10" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-gradient-kledje">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Modern Hero Section */}
      <ModernHero />

      {/* Skincare Categories */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kledje-50/50 via-transparent to-coral-50/30" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-display text-gradient-kledje mb-6">
              منتجات مصممة لبشرتك
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-modern">
              اكتشفي مجموعتنا المختارة بعناية من منتجات العناية بالبشرة الطبيعية
              المصممة خصيصاً للمرأة العربية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <CategoryCard
              icon={Droplets}
              title="ترطيب عميق"
              description="منتجات ترطيب غنية بالمكونات الطبيعية لبشرة ناعمة ونضرة طوال اليوم"
              color="bg-gradient-to-br from-teal-400 to-teal-600"
              delay={0}
            />
            <CategoryCard
              icon={Leaf}
              title="ت��ظيف لطيف"
              description="منظفات طبيعية تزيل الشوائب بلطف مع الحفاظ على توازن البشرة الطبيعي"
              color="bg-gradient-to-br from-kledje-400 to-kledje-600"
              delay={0.2}
            />
            <CategoryCard
              icon={Sun}
              title="حماية من الشمس"
              description="واقيات شمس طبيعية توفر حماية فائقة مع تغذية البشرة بالفيتامينات"
              color="bg-gradient-to-br from-coral-400 to-coral-600"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-display text-gradient-coral mb-6">
              لماذا كليدج؟
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-modern">
              نحن ملتزمون بتقديم أفضل منتجات العناية الطبيعية مع تجربة تسوق
              استثنائية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Flower}
              title="مكونات طبيعية"
              description="منتجات مصنوعة من أفضل المكونات الطبيعية والآمنة على البشرة العربية مع شهادات جودة عالمية"
              delay={0}
              gradient="from-kledje-50 to-coral-50"
            />
            <FeatureCard
              icon={Truck}
              title="توصيل سريع"
              description="توصيل مجاني داخل القاهرة والجيزة خلال 24 ساعة مع تبريد خاص للمنتجات الحساسة"
              delay={0.2}
              gradient="from-coral-50 to-teal-50"
            />
            <FeatureCard
              icon={Shield}
              title="ضمان الجودة"
              description="ضمان استرداد كامل خلال 30 يوم مع استشارة مجانية من خبراء البشرة المعتمدين"
              delay={0.4}
              gradient="from-teal-50 to-kledje-50"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-kledje relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-5xl lg:text-6xl font-display mb-6"
            >
              انضمي لعائلة كليدج
            </motion.h2>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed font-modern">
              سجلي واحصلي على نصائح العناية بالبشرة وأحدث العروض والمنتجات
              الجديدة مع خصومات حصرية وهدايا مجانية
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
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 text-right bg-white/95 backdrop-blur-sm border-0 text-xl"
                dir="rtl"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-kledje-600 hover:bg-gray-100 px-8 py-4 text-xl rounded-2xl font-bold hover-lift">
                  <Mail className="ml-2 h-6 w-6" />
                  اشتراك مجاني
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-white/80"
            >
              🎁 ستحصلين على خصم 20% على أول طلب + دليل العناية بالبشرة مجاناً
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-6 group hover-lift"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex items-center justify-center w-16 h-16 bg-gradient-coral text-white rounded-2xl shadow-lg"
              >
                <Mail className="h-8 w-8" />
              </motion.div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  استشارة مجانية
                </div>
                <div className="text-xl text-gray-600">info@kledje.com</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-6 group hover-lift"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="flex items-center justify-center w-16 h-16 bg-gradient-teal text-white rounded-2xl shadow-lg"
              >
                <Phone className="h-8 w-8" />
              </motion.div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  خدمة العملاء
                </div>
                <div className="text-xl text-gray-600 ltr">
                  +20 100 123 4567
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
