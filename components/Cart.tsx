"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingBag, Sparkles, Gift, Truck } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/lib/cart";

export function Cart() {
  const { items, isOpen, toggleCart } = useCartStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={toggleCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              opacity: { duration: 0.3 },
            }}
            className="fixed left-0 top-0 h-full w-full max-w-md glass-strong z-50 shadow-2xl flex flex-col border-r border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-display text-gradient flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShoppingBag className="h-6 w-6" />
                </motion.div>
                سلة التسوق
              </motion.h2>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCart}
                  className="h-10 w-10 rounded-full hover:bg-gradient-primary hover:text-white transition-all duration-300"
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>

            {/* Empty Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center justify-center h-full text-center space-y-6"
              >
                <motion.div variants={itemVariants} className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-lg"
                  >
                    <ShoppingBag className="h-12 w-12 text-white" />
                  </motion.div>

                  {/* Floating sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-accent rounded-full"
                      animate={{
                        x: [0, Math.cos((i * 60 * Math.PI) / 180) * 40, 0],
                        y: [0, Math.sin((i * 60 * Math.PI) / 180) * 40, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    سلة التسوق فارغة
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
                    ابدئي التسوق لإضافة منتجات رائعة إلى سلتك واكتشفي عالم كليدج
                    الساحر
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="space-y-4 w-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-gradient-primary hover:shadow-xl text-white py-4 text-lg rounded-2xl border-0 hover-glow"
                      onClick={toggleCart}
                      asChild
                    >
                      <Link href="/products">
                        <Sparkles className="ml-2 h-5 w-5" />
                        تصفح المنتجات
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-200 hover:border-brand-300 hover:bg-gradient-secondary hover:text-white py-4 text-lg rounded-2xl transition-all duration-300"
                      onClick={toggleCart}
                      asChild
                    >
                      <Link href="/">
                        <Gift className="ml-2 h-5 w-5" />
                        العودة للرئيسية
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-t border-white/20 p-6 glass"
            >
              <div className="space-y-4">
                {/* Delivery Info */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center"
                  >
                    <Truck className="h-5 w-5 text-white" />
                  </motion.div>
                  <div className="text-right">
                    <div className="font-bold text-green-800 text-sm">
                      الدفع عند الاستلام
                    </div>
                    <div className="text-green-600 text-xs">
                      توصيل مجاني للطلبات فوق 500 جنيه
                    </div>
                  </div>
                </motion.div>

                {/* Guarantee Info */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center"
                  >
                    <Gift className="h-5 w-5 text-white" />
                  </motion.div>
                  <div className="text-right">
                    <div className="font-bold text-blue-800 text-sm">
                      ضمان 30 يوم
                    </div>
                    <div className="text-blue-600 text-xs">
                      استرداد كامل + استشارة مجانية
                    </div>
                  </div>
                </motion.div>

                {/* Support Info */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-3 glass rounded-2xl"
                >
                  <div className="text-sm text-gray-600">
                    💬 خدمة العملاء متاحة 24/7
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    للمساعد�� والاستفسارات
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
