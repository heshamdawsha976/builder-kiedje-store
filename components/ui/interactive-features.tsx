"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Heart,
  Share2,
  MessageCircle,
  Star,
  Sparkles,
  Zap,
  Camera,
  Mic,
  Search,
  Filter,
  SortAsc,
  Eye,
  ThumbsUp,
  Gift,
  ShoppingBag,
  Bookmark,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

// Interactive Product Comparison
interface Product {
  id: string;
  name: string;
  arabicName: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
}

interface ProductComparisonProps {
  products: Product[];
  maxCompare?: number;
}

export function ProductComparison({
  products,
  maxCompare = 3,
}: ProductComparisonProps) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const addToCompare = (productId: string) => {
    if (compareList.length < maxCompare && !compareList.includes(productId)) {
      setCompareList([...compareList, productId]);
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(compareList.filter((id) => id !== productId));
  };

  const compareProducts = products.filter((p) => compareList.includes(p.id));

  return (
    <div className="relative">
      {/* Compare Button */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-40"
          >
            <Button
              onClick={() => setShowComparison(true)}
              className="bg-gradient-primary text-white shadow-lg hover:shadow-xl px-6 py-3 rounded-2xl"
            >
              <Eye className="w-5 h-5 ml-2" />
              مقارنة ({compareList.length})
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Cards with Compare Option */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.arabicName}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() =>
                  compareList.includes(product.id)
                    ? removeFromCompare(product.id)
                    : addToCompare(product.id)
                }
                className={cn(
                  "absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  compareList.includes(product.id)
                    ? "bg-brand-500 text-white"
                    : "bg-white/80 text-gray-700 hover:bg-white",
                )}
              >
                {compareList.includes(product.id) ? "✓" : "+"}
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.arabicName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-brand-600">
                  {product.price} ج.م
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 mr-1">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComparison(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 bg-white rounded-3xl z-50 overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    مقارنة المنتجات
                  </h2>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {compareProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <img
                        src={product.image}
                        alt={product.arabicName}
                        className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4"
                      />
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {product.arabicName}
                      </h3>
                      <p className="text-lg font-bold text-brand-600 mb-4">
                        {product.price} ج.م
                      </p>
                      <div className="space-y-2">
                        {product.features.map((feature, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Interactive Wishlist with Animations
interface WishlistButtonProps {
  productId: string;
  isInWishlist?: boolean;
  onToggle?: (productId: string, isAdded: boolean) => void;
  size?: "sm" | "md" | "lg";
}

export function WishlistButton({
  productId,
  isInWishlist = false,
  onToggle,
  size = "md",
}: WishlistButtonProps) {
  const [isLiked, setIsLiked] = useState(isInWishlist);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    onToggle?.(productId, newIsLiked);

    if (newIsLiked) {
      // Create floating hearts animation
      const rect = e.currentTarget.getBoundingClientRect();
      const newHearts = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
      }));
      setHearts(newHearts);

      setTimeout(() => setHearts([]), 1000);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-300",
          sizeClasses[size],
          isLiked
            ? "bg-red-500 text-white"
            : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-red-500",
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.3, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={cn(iconSizes[size], isLiked ? "fill-current" : "")}
          />
        </motion.div>
      </motion.button>

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              opacity: 1,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: 0,
              scale: 1,
              x: heart.x,
              y: heart.y - 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Interactive Share Button
interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
}

export function ShareButton({
  url,
  title,
  description,
  image,
}: ShareButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: "Facebook",
      icon: "📘",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "WhatsApp",
      icon: "💬",
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      name: "Telegram",
      icon: "✈️",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      setShowOptions(true);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={nativeShare}
        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-brand-500 flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Share2 className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[200px]"
            >
              <div className="space-y-2">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowOptions(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors w-full text-right"
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="font-medium text-gray-900">
                      {option.name}
                    </span>
                  </a>
                ))}
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors w-full text-right"
                >
                  <span className="text-lg">{copied ? "✅" : "🔗"}</span>
                  <span className="font-medium text-gray-900">
                    {copied ? "تم النسخ!" : "نسخ الرابط"}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Interactive Rating System
interface InteractiveRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function InteractiveRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  showValue = true,
}: InteractiveRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const [animatingStars, setAnimatingStars] = useState<number[]>([]);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (rating: number) => {
    if (readonly) return;

    onChange?.(rating);

    // Animate stars
    setAnimatingStars([...Array(rating)].map((_, i) => i));
    setTimeout(() => setAnimatingStars([]), 600);
  };

  const displayValue = hoverValue || value;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHoverValue(star)}
            onMouseLeave={() => !readonly && setHoverValue(0)}
            disabled={readonly}
            className={cn(
              "transition-all duration-200",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default",
            )}
            animate={{
              scale: animatingStars.includes(star - 1) ? [1, 1.3, 1] : 1,
              rotate: animatingStars.includes(star - 1) ? [0, 360, 0] : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors duration-200",
                star <= displayValue
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300",
                !readonly && hoverValue >= star && "text-yellow-500",
              )}
            />
          </motion.button>
        ))}
      </div>

      {showValue && (
        <motion.span
          key={displayValue}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm text-gray-600 font-medium"
        >
          {displayValue.toFixed(1)}
        </motion.span>
      )}
    </div>
  );
}

// Quick Action Fab (Floating Action Button)
interface QuickActionFabProps {
  actions: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }[];
}

export function QuickActionFab({ actions }: QuickActionFabProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="relative">
        {/* Action Buttons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 left-0 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110",
                    action.color || "bg-brand-500",
                  )}
                  title={action.label}
                >
                  {action.icon}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-primary text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
          animate={{ rotate: isOpen ? 45 : 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
