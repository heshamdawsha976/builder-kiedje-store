"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Star,
  Heart,
  ShoppingCart,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { OptimizedImage } from "./optimized-image";
import { useLazyLoading } from "@/lib/hooks/use-lazy-loading";

interface Product {
  id: string;
  name: string;
  arabicName: string;
  price: number;
  originalPrice?: number;
  images: string[];
  video?: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
  salePercentage?: number;
}

interface InteractiveProductShowcaseProps {
  products: Product[];
  autoplay?: boolean;
  showControls?: boolean;
  className?: string;
}

export function InteractiveProductShowcase({
  products,
  autoplay = false,
  showControls = true,
  className = "",
}: InteractiveProductShowcaseProps) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { elementRef, isVisible } = useLazyLoading<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: "100px",
  });

  const currentProduct = products[currentProductIndex];

  useEffect(() => {
    if (isVisible && isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVisible, isPlaying]);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, products.length]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex(
      (prev) => (prev - 1 + products.length) % products.length,
    );
  };

  const selectProduct = (index: number) => {
    setCurrentProductIndex(index);
  };

  if (!products.length) return null;

  return (
    <div
      ref={elementRef}
      className={`relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl glass shadow-2xl ${className}`}
    >
      {/* Main showcase area */}
      <div className="relative aspect-video bg-gradient-to-br from-brand-50 to-secondary-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProductIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {currentProduct.video ? (
              <video
                ref={videoRef}
                src={currentProduct.video}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                onLoadStart={() => setIsPlaying(autoplay)}
              />
            ) : (
              <OptimizedImage
                src={currentProduct.images[0]}
                alt={currentProduct.arabicName}
                fill
                className="object-cover"
                animationType="fade"
                animationDuration={0.8}
                priority={currentProductIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {currentProduct.isNew && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Badge className="bg-green-500 text-white px-3 py-2 shadow-lg">
                <Sparkles className="w-4 h-4 ml-1" />
                جديد
              </Badge>
            </motion.div>
          )}
          {currentProduct.isOnSale && currentProduct.salePercentage && (
            <motion.div
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <Badge className="bg-red-500 text-white px-3 py-2 shadow-lg">
                خصم {currentProduct.salePercentage}%
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevProduct}
            className="w-12 h-12 glass-strong rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextProduct}
            className="w-12 h-12 glass-strong rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Video/Media controls */}
        {showControls && currentProduct.video && (
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className="w-12 h-12 glass-strong rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 mr-1" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMuteToggle}
              className="w-12 h-12 glass-strong rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        )}

        {/* Product info toggle */}
        <div className="absolute bottom-6 right-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProductInfo(!showProductInfo)}
            className="w-12 h-12 glass-strong rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <Info className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Product info panel */}
      <AnimatePresence>
        {showProductInfo && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 glass-strong backdrop-blur-xl p-6 border-t border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentProduct.arabicName}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(currentProduct.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                    <span className="text-white/80 text-sm mr-2">
                      ({currentProduct.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">
                      {currentProduct.price.toLocaleString()} ج.م
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-lg text-white/60 line-through">
                        {currentProduct.originalPrice.toLocaleString()} ج.م
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-12 h-12 glass-strong text-white hover:bg-white/20 rounded-full p-0"
                  >
                    <Heart className="w-6 h-6" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:shadow-xl text-white px-8 py-3 rounded-2xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 ml-2" />
                    أضف للسلة
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product thumbnails */}
      <div className="p-6 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => selectProduct(index)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                index === currentProductIndex
                  ? "ring-4 ring-brand-500 shadow-lg"
                  : "hover:ring-2 hover:ring-brand-300"
              }`}
            >
              <OptimizedImage
                src={product.images[0]}
                alt={product.arabicName}
                fill
                className="object-cover"
                animationType="fade"
                animationDuration={0.3}
              />

              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredProduct === product.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-medium text-center px-1">
                      {product.arabicName}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {index === currentProductIndex && (
                <motion.div
                  layoutId="activeProduct"
                  className="absolute inset-0 border-4 border-brand-500 rounded-2xl"
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => selectProduct(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentProductIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
