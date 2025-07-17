"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled = false,
}: MagneticButtonProps) {
  const variants = {
    primary: "bg-gradient-primary text-white shadow-lg",
    secondary: "bg-gradient-secondary text-white shadow-lg",
    accent: "bg-gradient-accent text-white shadow-lg",
    outline:
      "border-2 border-brand-300 text-brand-600 hover:bg-gradient-primary hover:text-white hover:border-transparent",
  };

  const sizes = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-12 py-6 text-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        relative overflow-hidden rounded-2xl font-semibold transition-all duration-300 
        ${variants[variant]} ${sizes[size]} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover-glow"}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        whileHover={disabled ? {} : { x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {Icon && (
          <motion.div
            whileHover={disabled ? {} : { rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        )}
        {children}
      </motion.div>

      {/* Ripple effect */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileTap={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  pulse?: boolean;
}

export function FloatingActionButton({
  icon: Icon,
  onClick,
  className = "",
  variant = "primary",
  pulse = false,
}: FloatingActionButtonProps) {
  const variants = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary",
    accent: "bg-gradient-accent",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`
        fixed bottom-8 left-8 w-16 h-16 ${variants[variant]} text-white rounded-full 
        shadow-2xl z-40 flex items-center justify-center transition-all duration-300
        ${pulse ? "pulse-glow" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      <motion.div
        animate={pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={pulse ? { duration: 2, repeat: Infinity } : {}}
      >
        <Icon className="h-6 w-6" />
      </motion.div>

      {/* Ripple rings */}
      {pulse && (
        <>
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{
              scale: [1, 2],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{
              scale: [1, 2],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
        </>
      )}
    </motion.button>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  size?: "sm" | "md" | "lg";
}

export function GlowButton({
  children,
  onClick,
  className = "",
  glowColor = "rgba(255, 105, 180, 0.6)",
  size = "md",
}: GlowButtonProps) {
  const sizes = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-12 py-6 text-xl",
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 30px ${glowColor}`,
      }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative bg-gradient-primary text-white rounded-2xl font-semibold 
        transition-all duration-300 overflow-hidden border-0
        ${sizes[size]} ${className}
      `}
      onClick={onClick}
      style={{
        boxShadow: `0 0 20px ${glowColor}`,
      }}
    >
      <span className="relative z-10">{children}</span>

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.button>
  );
}

interface PulseButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  pulseColor?: string;
}

export function PulseButton({
  children,
  onClick,
  className = "",
  pulseColor = "brand-500",
}: PulseButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold 
        border-2 border-gray-200 transition-all duration-300 overflow-hidden
        ${className}
      `}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>

      {/* Pulse effect */}
      <motion.div
        className={`absolute inset-0 bg-${pulseColor} opacity-0`}
        animate={{
          scale: [0, 1],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );
}

interface WaveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function WaveButton({
  children,
  onClick,
  className = "",
}: WaveButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative bg-gradient-primary text-white px-8 py-4 rounded-2xl font-semibold 
        transition-all duration-300 overflow-hidden
        ${className}
      `}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>

      {/* Wave effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white"
        whileHover={{
          height: ["4px", "100%", "4px"],
          opacity: [0.8, 0.2, 0.8],
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
