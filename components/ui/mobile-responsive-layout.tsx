"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResponsive, useDeviceCapabilities } from "@/lib/hooks/use-responsive";
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

// Mobile-Optimized Grid
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function ResponsiveGrid({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = "md",
  className = "",
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  const gridCols = `
    grid-cols-${cols.xs || 1}
    ${cols.sm ? `sm:grid-cols-${cols.sm}` : ""}
    ${cols.md ? `md:grid-cols-${cols.md}` : ""}
    ${cols.lg ? `lg:grid-cols-${cols.lg}` : ""}
    ${cols.xl ? `xl:grid-cols-${cols.xl}` : ""}
  `.trim();

  return (
    <div className={cn("grid", gridCols, gapClasses[gap], className)}>
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
    primary: "bg-gradient-primary text-white hover:shadow-lg focus:ring-brand-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
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
      whileTap={{ scale: hasTouch ? 0.95 : 1 }}\n      transition={{ duration: 0.1 }}\n    >\n      {children}\n    </motion.button>\n  );\n}\n\n// Mobile-Optimized Input\ninterface TouchInputProps {\n  type?: \"text\" | \"email\" | \"password\" | \"number\" | \"tel\";\n  placeholder?: string;\n  value?: string;\n  onChange?: (value: string) => void;\n  disabled?: boolean;\n  required?: boolean;\n  dir?: \"rtl\" | \"ltr\";\n  className?: string;\n}\n\nexport function TouchInput({\n  type = \"text\",\n  placeholder,\n  value,\n  onChange,\n  disabled = false,\n  required = false,\n  dir = \"rtl\",\n  className = \"\",\n}: TouchInputProps) {\n  const { isMobile } = useResponsive();\n\n  return (\n    <input\n      type={type}\n      placeholder={placeholder}\n      value={value}\n      onChange={(e) => onChange?.(e.target.value)}\n      disabled={disabled}\n      required={required}\n      dir={dir}\n      className={cn(\n        \"w-full px-4 py-3 border border-gray-300 rounded-xl\",\n        \"bg-white text-gray-900 placeholder-gray-500\",\n        \"focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent\",\n        \"transition-all duration-200\",\n        isMobile ? \"text-base min-h-[48px]\" : \"text-sm\",\n        disabled ? \"opacity-50 cursor-not-allowed\" : \"\",\n        className,\n      )}\n    />\n  );\n}\n\n// Swipeable Card for Mobile\ninterface SwipeableCardProps {\n  children: React.ReactNode;\n  onSwipeLeft?: () => void;\n  onSwipeRight?: () => void;\n  className?: string;\n}\n\nexport function SwipeableCard({\n  children,\n  onSwipeLeft,\n  onSwipeRight,\n  className = \"\",\n}: SwipeableCardProps) {\n  const { hasTouch, prefersReducedMotion } = useDeviceCapabilities();\n  const [dragDirection, setDragDirection] = useState<\"left\" | \"right\" | null>(null);\n\n  const handleDragEnd = (event: any, info: any) => {\n    const threshold = 100;\n    const velocity = 500;\n\n    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {\n      if (info.offset.x > 0) {\n        onSwipeRight?.();\n        setDragDirection(\"right\");\n      } else {\n        onSwipeLeft?.();\n        setDragDirection(\"left\");\n      }\n    }\n  };\n\n  if (!hasTouch || prefersReducedMotion) {\n    return <div className={className}>{children}</div>;\n  }\n\n  return (\n    <motion.div\n      className={cn(\"cursor-grab active:cursor-grabbing\", className)}\n      drag=\"x\"\n      dragConstraints={{ left: 0, right: 0 }}\n      dragElastic={0.2}\n      onDragEnd={handleDragEnd}\n      whileDrag={{ scale: 1.02 }}\n      animate={{\n        x: dragDirection === \"left\" ? -300 : dragDirection === \"right\" ? 300 : 0,\n        opacity: dragDirection ? 0 : 1,\n      }}\n      transition={{ duration: 0.3 }}\n    >\n      {children}\n      \n      {/* Swipe indicators */}\n      <motion.div\n        className=\"absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 opacity-0\"\n        animate={{ opacity: dragDirection === \"right\" ? 1 : 0 }}\n      >\n        ✓\n      </motion.div>\n      <motion.div\n        className=\"absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 opacity-0\"\n        animate={{ opacity: dragDirection === \"left\" ? 1 : 0 }}\n      >\n        ✕\n      </motion.div>\n    </motion.div>\n  );\n}\n\n// Mobile Bottom Sheet\ninterface BottomSheetProps {\n  isOpen: boolean;\n  onClose: () => void;\n  children: React.ReactNode;\n  title?: string;\n  height?: \"auto\" | \"half\" | \"full\";\n  className?: string;\n}\n\nexport function BottomSheet({\n  isOpen,\n  onClose,\n  children,\n  title,\n  height = \"auto\",\n  className = \"\",\n}: BottomSheetProps) {\n  const { isMobile } = useResponsive();\n\n  if (!isMobile) return null;\n\n  const heightClasses = {\n    auto: \"max-h-[80vh]\",\n    half: \"h-[50vh]\",\n    full: \"h-[90vh]\",\n  };\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <>\n          {/* Backdrop */}\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            onClick={onClose}\n            className=\"fixed inset-0 bg-black/50 backdrop-blur-sm z-40\"\n          />\n\n          {/* Sheet */}\n          <motion.div\n            initial={{ y: \"100%\" }}\n            animate={{ y: 0 }}\n            exit={{ y: \"100%\" }}\n            transition={{\n              type: \"spring\",\n              damping: 25,\n              stiffness: 200,\n            }}\n            className={cn(\n              \"fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 shadow-2xl\",\n              heightClasses[height],\n              className,\n            )}\n          >\n            {/* Handle */}\n            <div className=\"flex justify-center pt-4 pb-2\">\n              <div className=\"w-12 h-1 bg-gray-300 rounded-full\" />\n            </div>\n\n            {/* Title */}\n            {title && (\n              <div className=\"px-6 pb-4 border-b border-gray-200\">\n                <h3 className=\"text-lg font-semibold text-gray-900\">{title}</h3>\n              </div>\n            )}\n\n            {/* Content */}\n            <div className=\"flex-1 overflow-y-auto p-6\">{children}</div>\n          </motion.div>\n        </>\n      )}\n    </AnimatePresence>\n  );\n}\n\n// Mobile-Optimized Image Gallery\ninterface MobileGalleryProps {\n  images: { src: string; alt: string }[];\n  aspectRatio?: \"square\" | \"video\" | \"auto\";\n  showThumbnails?: boolean;\n  className?: string;\n}\n\nexport function MobileGallery({\n  images,\n  aspectRatio = \"square\",\n  showThumbnails = true,\n  className = \"\",\n}: MobileGalleryProps) {\n  const [currentIndex, setCurrentIndex] = useState(0);\n  const { isMobile, hasTouch } = useDeviceCapabilities();\n\n  const aspectRatioClasses = {\n    square: \"aspect-square\",\n    video: \"aspect-video\",\n    auto: \"aspect-auto\",\n  };\n\n  return (\n    <div className={cn(\"space-y-4\", className)}>\n      {/* Main Image */}\n      <div className={cn(\"relative overflow-hidden rounded-2xl\", aspectRatioClasses[aspectRatio])}>\n        <AnimatePresence mode=\"wait\">\n          <motion.img\n            key={currentIndex}\n            src={images[currentIndex]?.src}\n            alt={images[currentIndex]?.alt}\n            className=\"w-full h-full object-cover\"\n            initial={{ opacity: 0, scale: 1.1 }}\n            animate={{ opacity: 1, scale: 1 }}\n            exit={{ opacity: 0, scale: 0.9 }}\n            transition={{ duration: 0.3 }}\n          />\n        </AnimatePresence>\n\n        {/* Navigation arrows for desktop */}\n        {!isMobile && images.length > 1 && (\n          <>\n            <button\n              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}\n              className=\"absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors\"\n            >\n              ←\n            </button>\n            <button\n              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}\n              className=\"absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors\"\n            >\n              →\n            </button>\n          </>\n        )}\n\n        {/* Swipe gesture for mobile */}\n        {hasTouch && (\n          <motion.div\n            className=\"absolute inset-0\"\n            drag=\"x\"\n            dragConstraints={{ left: 0, right: 0 }}\n            dragElastic={0.2}\n            onDragEnd={(_, info) => {\n              if (info.offset.x > 100) {\n                setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);\n              } else if (info.offset.x < -100) {\n                setCurrentIndex((prev) => (prev + 1) % images.length);\n              }\n            }}\n          />\n        )}\n\n        {/* Image counter */}\n        {images.length > 1 && (\n          <div className=\"absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm\">\n            {currentIndex + 1} / {images.length}\n          </div>\n        )}\n      </div>\n\n      {/* Thumbnails */}\n      {showThumbnails && images.length > 1 && (\n        <div className=\"flex gap-2 overflow-x-auto pb-2\">\n          {images.map((image, index) => (\n            <button\n              key={index}\n              onClick={() => setCurrentIndex(index)}\n              className={cn(\n                \"flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200\",\n                index === currentIndex\n                  ? \"border-brand-500 ring-2 ring-brand-200\"\n                  : \"border-gray-200 hover:border-gray-300\",\n              )}\n            >\n              <img\n                src={image.src}\n                alt={image.alt}\n                className=\"w-full h-full object-cover\"\n              />\n            </button>\n          ))}\n        </div>\n      )}\n    </div>\n  );\n}\n