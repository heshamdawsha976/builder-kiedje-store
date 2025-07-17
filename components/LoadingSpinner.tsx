"use client";

import { motion } from "framer-motion";
import { Flower, Sparkles, Heart } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function LoadingSpinner({
  size = "md",
  text = "جاري التحميل...",
  variant = "primary",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  const gradients = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary",
    accent: "bg-gradient-accent",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Main spinner */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`${sizeClasses[size]} ${gradients[variant]} rounded-full relative`}
        >
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flower
                className={`${size === "sm" ? "h-3 w-3" : size === "md" ? "h-6 w-6" : "h-8 w-8"} text-brand-600`}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-accent rounded-full"
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 30, 0],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 30, 0],
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
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-6 ${textSizes[size]} font-medium text-gray-700 text-center`}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.div>
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-brand-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Page Loading Component
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -360, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-white text-6xl font-display"
            >
              ك
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-display text-gradient mb-4"
        >
          كليدج
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 mb-8"
        >
          نحضر لك تجربة تسوق استثنائية
        </motion.p>

        <LoadingSpinner size="sm" text="جاري التحضير..." />
      </motion.div>
    </div>
  );
}
