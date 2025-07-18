"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useResponsive,
  useDeviceCapabilities,
} from "@/lib/hooks/use-responsive";
import { cn } from "@/lib/utils";

// Mobile Navigation Component
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function MobileNav({
  isOpen,
  onClose,
  children,
  className = "",
}: MobileNavProps) {
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Navigation Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className={cn(
              "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl z-50 shadow-2xl",
              className,
            )}
          >
            <div className="p-6 pt-20 h-full overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Mobile-First Container
interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export function ResponsiveContainer({
  children,
  maxWidth = "lg",
  padding = "md",
  className = "",
}: ResponsiveContainerProps) {
  const { isMobile, isTablet } = useResponsive();

  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: isMobile ? "px-4 py-2" : "px-6 py-4",
    md: isMobile ? "px-4 py-4" : "px-8 py-6",
    lg: isMobile ? "px-6 py-6" : "px-12 py-8",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

// Touch-Optimized Button
interface TouchButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TouchButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
}: TouchButtonProps) {
  const { hasTouch } = useDeviceCapabilities();
  const { isMobile } = useResponsive();

  const baseClasses = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    hasTouch ? "active:scale-95" : "hover:scale-105",
  );

  const variantClasses = {
    primary:
      "bg-gradient-primary text-white hover:shadow-lg focus:ring-brand-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: isMobile ? "px-4 py-3 text-sm min-h-[44px]" : "px-3 py-2 text-sm",
    md: isMobile ? "px-6 py-4 text-base min-h-[48px]" : "px-4 py-2 text-base",
    lg: isMobile ? "px-8 py-5 text-lg min-h-[52px]" : "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isMobile ? "rounded-2xl" : "rounded-xl",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: hasTouch ? 0.95 : 1 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  );
}

// Mobile-Optimized Input
interface TouchInputProps {
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  dir?: "rtl" | "ltr";
  className?: string;
}

export function TouchInput({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  dir = "rtl",
  className = "",
}: TouchInputProps) {
  const { isMobile } = useResponsive();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      required={required}
      dir={dir}
      className={cn(
        "w-full px-4 py-3 border border-gray-300 rounded-xl",
        "bg-white text-gray-900 placeholder-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
        "transition-all duration-200",
        isMobile ? "text-base min-h-[48px]" : "text-sm",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className,
      )}
    />
  );
}

// Mobile Bottom Sheet
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: "auto" | "half" | "full";
  className?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  height = "auto",
  className = "",
}: BottomSheetProps) {
  const { isMobile } = useResponsive();

  if (!isMobile) return null;

  const heightClasses = {
    auto: "max-h-[80vh]",
    half: "h-[50vh]",
    full: "h-[90vh]",
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
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className={cn(
              "fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 shadow-2xl",
              heightClasses[height],
              className,
            )}
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Title */}
            {title && (
              <div className="px-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Performance-optimized component
export function OptimizedMobileComponent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isMobile } = useResponsive();
  const { connectionSpeed, prefersReducedMotion } = useDeviceCapabilities();

  // تحسين الأداء للأجهزة البطيئة
  const optimizationProps = {
    animate: prefersReducedMotion ? false : true,
    transition: {
      duration: connectionSpeed === "slow" ? 0.2 : 0.4,
    },
  };

  return (
    <motion.div
      className={cn(
        "will-change-transform",
        isMobile ? "transform-gpu" : "",
        className,
      )}
      {...(optimizationProps.animate && optimizationProps)}
    >
      {children}
    </motion.div>
  );
}
