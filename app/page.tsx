"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Leaf,
  Shield,
  Truck,
  Mail,
  Phone,
  Droplets,
  Sun,
  Star,
  Heart,
  Zap,
  Flower,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 bg-gradient-primary rounded-full opacity-30"
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
  );
};

// Interactive Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  gradient,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={`text-center p-8 glass rounded-3xl hover-lift interactive border-gradient ${gradient}`}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary text-white rounded-2xl mb-6 shadow-lg"
        >
          <Icon className="h-10 w-10" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-gradient">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-0 -z-10"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Product Category Card
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

// Stats Counter Component
const StatsCounter = ({ end, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = end / 100;
      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 20);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.6, ease: "backOut" }}
      className="text-center group hover-lift"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-4xl font-bold text-gradient mb-2"
      >
        {count}
        {suffix}
      </motion.div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const opacity = useTransform(springProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(springProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
        <FloatingParticles />

        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-primary rounded-full opacity-10 blur-3xl float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-accent rounded-full opacity-10 blur-3xl float-delayed" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              style={{ opacity, scale }}
              className="text-center lg:text-right space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <Badge className="bg-gradient-secondary text-white px-6 py-2 text-lg border-0 hover-glow">
                    <Sparkles className="w-4 h-4 ml-2" />
                    منتجات طبيعية 100%
                  </Badge>
                </motion.div>

                <h1 className="text-6xl lg:text-8xl font-display leading-tight">
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="block text-gray-900"
                  >
                    بشرتك تستحق
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="block text-gradient text-8xl lg:text-9xl font-black"
                  >
                    كليدج
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-modern"
                >
                  متجر العناية بالبشرة الطبيعية الأول في مصر. منتجات آمنة
                  وفعّالة لجميع أنواع البشرة العربية مع تقنيات متطورة وأسعار
                  منافسة
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:shadow-2xl text-white px-10 py-4 text-xl rounded-2xl border-0 hover-glow"
                    asChild
                  >
                    <Link href="/products">
                      <Zap className="ml-2 h-6 w-6" />
                      اكتشفي منتجاتنا
                      <ArrowLeft className="mr-2 h-6 w-6" />
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
                    className="border-2 border-brand-300 text-brand-700 hover:bg-gradient-secondary hover:text-white px-10 py-4 text-xl rounded-2xl hover-lift"
                  >
                    <Heart className="ml-2 h-6 w-6" />
                    اختبار نوع البشرة
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                <StatsCounter end={100} label="طبيعي" suffix="%" delay={0} />
                <StatsCounter
                  end={24}
                  label="ساعة توصيل"
                  suffix="h"
                  delay={200}
                />
                <StatsCounter end={30} label="يوم ضمان" delay={400} />
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
              className="relative lg:block hidden"
            >
              <div className="relative z-10 hover-lift">
                <motion.img
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  src="/placeholder.svg"
                  alt="Kledje Skincare Products"
                  className="w-full h-[600px] object-cover rounded-3xl shadow-2xl border-4 border-white/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-600/30 via-transparent to-accent-300/20 rounded-3xl" />

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 right-8 glass-strong rounded-2xl p-4 text-center"
                >
                  <Award className="h-8 w-8 text-accent-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-800">
                    منتج العام
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute bottom-8 left-8 glass-strong rounded-2xl p-4 text-center"
                >
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-800">
                    تقييم 5 نجوم
                  </div>
                </motion.div>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-accent rounded-3xl opacity-20 -z-10" />
              <div className="absolute top-8 left-8 w-full h-full bg-gradient-secondary rounded-3xl opacity-15 -z-20" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Skincare Categories */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-secondary-50/30" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-display text-gradient mb-6">
              منتجات مصممة لبشرتك
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-modern">
              اكتشفي مجموعتنا المختارة بعناية من منتجات العن��ية بالبشرة
              الطبيعية المصممة خصيصاً للمرأة العربية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <CategoryCard
              icon={Droplets}
              title="ترطيب عميق"
              description="منتجات ترطيب غنية بالمكونات الطبيعية لبشرة ناعمة ونضرة طوال اليوم"
              color="bg-gradient-to-br from-blue-400 to-blue-600"
              delay={0}
            />
            <CategoryCard
              icon={Leaf}
              title="تنظيف لطيف"
              description="منظفات طبيعية تزيل الشوائب بلطف مع الحفاظ على توازن البشرة الطبيعي"
              color="bg-gradient-to-br from-green-400 to-green-600"
              delay={0.2}
            />
            <CategoryCard
              icon={Sun}
              title="حماية من الشمس"
              description="واقيات شمس طبيعية توفر حماية فائقة مع تغذية البشرة بالفيتامينات"
              color="bg-gradient-to-br from-orange-400 to-orange-600"
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
            <h2 className="text-5xl lg:text-6xl font-display text-gradient mb-6">
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
              gradient="from-brand-50 to-secondary-50"
            />
            <FeatureCard
              icon={Truck}
              title="توصيل سريع"
              description="توصيل مجاني داخل القاهرة والجيزة خ��ال 24 ساعة مع تبريد خاص للمنتجات الحساسة"
              delay={0.2}
              gradient="from-secondary-50 to-accent-50"
            />
            <FeatureCard
              icon={Shield}
              title="ضمان الجودة"
              description="ضمان استرداد كامل خلال 30 يوم مع استشارة مجانية من خبراء البشرة المعتمدين"
              delay={0.4}
              gradient="from-accent-50 to-brand-50"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <FloatingParticles />

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
                <Button className="bg-white text-brand-600 hover:bg-gray-100 px-8 py-4 text-xl rounded-2xl font-bold hover-lift">
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
                className="flex items-center justify-center w-16 h-16 bg-gradient-primary text-white rounded-2xl shadow-lg"
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
                className="flex items-center justify-center w-16 h-16 bg-gradient-secondary text-white rounded-2xl shadow-lg"
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
