"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Crown, Heart } from "lucide-react";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "جاري تحضير منتجاتك الطبيعية...",
    "نختار لك أفضل المكونات...",
    "نحضر تجربة جمال استثنائية...",
    "تقريباً انتهينا...",
  ];

  useEffect(() => {
    if (isLoading) {
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      const textTimer = setInterval(() => {
        setCurrentText((prev) => (prev + 1) % loadingTexts.length);
      }, 2000);

      return () => {
        clearInterval(progressTimer);
        clearInterval(textTimer);
      };
    }
  }, [isLoading, loadingTexts.length]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-gradient-to-br from-kledje-50 via-white to-coral-50 flex items-center justify-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-kledje rounded-full opacity-20"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.2, 0.5, 0.2],
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

          <div className="relative z-10 text-center max-w-md mx-auto px-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="mb-12"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-kledje rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-4xl">ك</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-coral rounded-full opacity-80"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-teal rounded-full opacity-60"
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl font-display text-gradient-kledje mb-2">
                كليدج
              </h1>
              <p className="text-lg text-gray-600">منتجات طبيعية 100%</p>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8"
            >
              {/* Floating Icons */}
              <div className="relative h-16 mb-6">
                {[Sparkles, Crown, Heart].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                      x: [0, 30 * Math.cos((index * 120 * Math.PI) / 180), 0],
                      y: [0, 30 * Math.sin((index * 120 * Math.PI) / 180), 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-coral rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-kledje rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Progress Text */}
              <div className="text-sm text-gray-500 mb-2">{progress}%</div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-700 font-medium"
            >
              {loadingTexts[currentText]}
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 w-16 h-16 bg-gradient-teal rounded-full opacity-20 blur-sm"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-coral rounded-full opacity-15 blur-sm"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
