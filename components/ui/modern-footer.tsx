"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Star,
  Crown,
  Sparkles,
  ArrowUp,
  Send,
  Shield,
  Truck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ModernFooter = () => {
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Footer sections data
  const footerSections = [
    {
      title: "المنتجات",
      links: [
        { name: "العناية بالوجه", href: "/products?category=face-care" },
        { name: "العناية بالجسم", href: "/products?category=body-care" },
        { name: "العناية بالشعر", href: "/products?category=hair-care" },
        { name: "بوكس العروسة", href: "/bride-box" },
        { name: "العروض الخاصة", href: "/offers" },
      ],
    },
    {
      title: "خدمة العملاء",
      links: [
        { name: "تواصل معنا", href: "/contact" },
        { name: "الأسئلة الشائعة", href: "/faq" },
        { name: "سياسة الإرجاع", href: "/returns" },
        { name: "طرق الدفع", href: "/payment" },
        { name: "تتبع الطلب", href: "/track-order" },
      ],
    },
    {
      title: "معلومات الشركة",
      links: [
        { name: "من نحن", href: "/about" },
        { name: "مدونة الجمال", href: "/blog" },
        { name: "الوظائف", href: "/careers" },
        { name: "الشراكات", href: "/partnerships" },
        { name: "الأخبار", href: "/news" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "#",
      name: "Instagram",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: Facebook,
      href: "#",
      name: "Facebook",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Twitter,
      href: "#",
      name: "Twitter",
      color: "from-blue-400 to-blue-500",
    },
    {
      icon: Youtube,
      href: "#",
      name: "Youtube",
      color: "from-red-500 to-red-600",
    },
  ];

  const features = [
    { icon: Shield, text: "منتجات آمنة ومعتمدة" },
    { icon: Truck, text: "توصيل مجاني لجميع المحافظات" },
    { icon: Award, text: "ضمان الجودة 30 يوم" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-kledje rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-coral rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="text-center lg:text-right">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block mb-6"
              >
                <Badge className="bg-gradient-coral text-white px-6 py-3 text-lg rounded-full border-0">
                  <Sparkles className="w-5 h-5 ml-2" />
                  اشتركي معنا
                </Badge>
              </motion.div>

              <h3 className="text-4xl lg:text-5xl font-display mb-4">
                كوني أول من يعرف
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                احصلي على آخر الأخبار والعروض الحصرية ونصائح العناية مجاناً
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl text-lg py-3"
                  dir="rtl"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-kledje hover:shadow-xl px-8 py-3 text-lg rounded-xl">
                    <Send className="ml-2 h-5 w-5" />
                    اشتراك
                  </Button>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  خصومات حصرية
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-400" />
                  عروض VIP
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  نصائح جمال مجانية
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="flex items-center gap-4 group mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-kledje rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-white font-bold text-2xl">ك</span>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-coral rounded-full opacity-80"
                    />
                  </div>
                  <div>
                    <div className="text-4xl font-display text-gradient-kledje group-hover:scale-105 transition-transform">
                      كليدج
                    </div>
                    <div className="text-sm text-gray-400 -mt-1">
                      منتجات طبيعية 100%
                    </div>
                  </div>
                </Link>

                <p className="text-gray-300 leading-relaxed text-lg max-w-md">
                  نحن نؤمن بقوة الطبيعة في العناية بجمالك. منتجاتنا مصنوعة بحب
                  من أجود المكونات الطبيعية لتمنحك تجربة عناية استثنائية.
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-8 h-8 bg-gradient-teal rounded-lg flex items-center justify-center">
                        <feature.icon className="h-4 w-4 text-white" />
                      </div>
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="space-y-6"
              >
                <h4 className="text-xl font-bold text-white">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: sectionIndex * 0.1 + linkIndex * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Social Section */}
      <div className="relative z-10 border-t border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-2xl font-bold mb-6">تواصلي معنا</h4>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Phone,
                    title: "اتصلي بنا",
                    info: "+20 100 123 4567",
                    subinfo: "متاح 24/7",
                  },
                  {
                    icon: Mail,
                    title: "راسلينا",
                    info: "info@kledje.com",
                    subinfo: "رد خلال 2 ساعة",
                  },
                  {
                    icon: MapPin,
                    title: "العنوان",
                    info: "القاهرة، مصر",
                    subinfo: "مكتبنا الرئيسي",
                  },
                  {
                    icon: Clock,
                    title: "ساعات العمل",
                    info: "9:00 ص - 10:00 م",
                    subinfo: "السبت - الخميس",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-gradient-coral rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {contact.title}
                      </div>
                      <div className="text-gray-300">{contact.info}</div>
                      <div className="text-xs text-gray-400">
                        {contact.subinfo}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h4 className="text-2xl font-bold mb-6">تابعينا</h4>
              <p className="text-gray-300 mb-8">
                انضمي لمجتمعنا على وسائل التواصل الاجتماعي
              </p>

              <div className="flex justify-center lg:justify-start gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <social.icon className="h-6 w-6 text-white" />
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
                <span>+50K متابع على Instagram</span>
                <span>•</span>
                <span>+30K على Facebook</span>
                <span>•</span>
                <span>+15K على TikTok</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-right text-gray-400">
              <p>&copy; 2024 كليدج. جميع الحقوق محفوظة.</p>
              <p className="text-sm mt-1">
                صنع بـ <Heart className="inline h-4 w-4 text-red-400" /> في مصر
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                شروط الاستخدام
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                سياسة الكوكيز
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white/10 text-white border-0">
                <Shield className="w-4 h-4 ml-1" />
                SSL آمن
              </Badge>
              <Badge className="bg-white/10 text-white border-0">
                <Award className="w-4 h-4 ml-1" />
                معتمد
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 w-14 h-14 bg-gradient-kledje text-white rounded-full shadow-xl z-50 flex items-center justify-center hover:shadow-2xl transition-all duration-300"
      >
        <ArrowUp className="h-6 w-6" />
      </motion.button>
    </footer>
  );
};

export default ModernFooter;
