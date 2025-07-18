"use client";

import { useState, forwardRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useImageLazyLoading } from "@/lib/hooks/use-lazy-loading";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  blurDataURL?: string;
  placeholder?: "blur" | "empty";
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  // Animation props
  animationType?: "fade" | "slide" | "scale" | "none";
  animationDuration?: number;
  // Lazy loading props
  lazyLoading?: boolean;
  threshold?: number;
  rootMargin?: string;
}

const OptimizedImage = forwardRef<HTMLDivElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill = false,
      className,
      blurDataURL,
      placeholder = "blur",
      priority = false,
      quality = 85,
      sizes,
      onLoad,
      onError,
      animationType = "fade",
      animationDuration = 0.6,
      lazyLoading = true,
      threshold = 0.1,
      rootMargin = "50px",
    },
    ref,
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const {
      elementRef,
      imageSrc,
      isImageLoaded,
      hasError: lazyError,
      isVisible,
    } = useImageLazyLoading(
      src,
      lazyLoading
        ? {
            threshold,
            rootMargin,
            triggerOnce: true,
          }
        : {},
    );

    const shouldShowImage = lazyLoading ? isVisible && imageSrc : true;
    const finalSrc = lazyLoading ? imageSrc || src : src;
    const imageIsLoaded = lazyLoading ? isImageLoaded : isLoaded;
    const imageHasError = lazyLoading ? lazyError : hasError;

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    // Animation variants
    const animationVariants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      slide: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      },
      scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
      },
      none: {
        initial: {},
        animate: {},
        exit: {},
      },
    };

    const currentVariant = animationVariants[animationType];

    // Generate blur placeholder if not provided
    const defaultBlurDataURL =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo=";

    return (
      <div
        ref={ref || elementRef}
        className={cn("relative overflow-hidden", className)}
        style={
          !fill && width && height
            ? { width: `${width}px`, height: `${height}px` }
            : {}
        }
      >
        <AnimatePresence mode="wait">
          {/* Skeleton loader */}
          {!imageIsLoaded && !imageHasError && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </motion.div>
          )}

          {/* Error state */}
          {imageHasError && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gray-100 flex items-center justify-center"
            >
              <div className="text-gray-400 text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs">خطأ في التحميل</span>
              </div>
            </motion.div>
          )}

          {/* Actual image */}
          {shouldShowImage && finalSrc && !imageHasError && (
            <motion.div
              key="image"
              initial={currentVariant.initial}
              animate={currentVariant.animate}
              exit={currentVariant.exit}
              transition={{
                duration: animationDuration,
                ease: "easeOut",
              }}
              className="relative w-full h-full"
            >
              <Image
                src={finalSrc}
                alt={alt}
                fill={fill}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                className={cn(
                  "transition-all duration-300",
                  imageIsLoaded
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-0",
                )}
                placeholder={placeholder}
                blurDataURL={blurDataURL || defaultBlurDataURL}
                priority={priority}
                quality={quality}
                sizes={sizes}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                  objectFit: "cover",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage };
