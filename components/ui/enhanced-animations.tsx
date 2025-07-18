"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star, Heart, ShoppingCart, Eye, Sparkles } from "lucide-react";

// Animated Product Card with advanced interactions
export const AnimatedProductCard = ({
  product,
  onAddToCart,
  onQuickView,
  onWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [addToCartClicked, setAddToCartClicked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAddToCart = () => {
    setAddToCartClicked(true);
    onAddToCart(product);
    setTimeout(() => setAddToCartClicked(false), 1000);
  };

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    onWishlist(product);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group perspective-1000"
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -10,
          rotateY: isHovered ? 5 : 0,
          transition: { duration: 0.3 },
        }}
        className="bg-white rounded-3xl shadow-lg overflow-hidden transform-gpu preserve-3d"
      >
        {/* Image Container */}
        <motion.div
          variants={contentVariants}
          className="relative overflow-hidden bg-gradient-to-br from-kledje-50 to-coral-50"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="aspect-square relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Shimmer Effect */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={isHovered ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12"
            />
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 right-4"
          >
            {product.featured && (
              <div className="bg-gradient-coral text-white px-3 py-1 rounded-full text-sm font-bold">
                <Sparkles className="w-3 h-3 inline ml-1" />
                مميز
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuickView(product)}
              className="flex-1 bg-white/90 backdrop-blur-sm text-gray-700 py-2 px-3 rounded-xl text-sm font-medium hover:bg-white transition-colors"
            >
              <Eye className="w-4 h-4 inline ml-1" />
              معاينة
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`p-2 rounded-xl backdrop-blur-sm transition-all ${
                isInWishlist
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              }`}
            >
              <motion.div
                animate={{ scale: isInWishlist ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`}
                />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div variants={contentVariants} className="p-6">
          <motion.h3
            whileHover={{ scale: 1.02 }}
            className="font-bold text-gray-900 mb-2 text-lg cursor-pointer"
          >
            {product.name}
          </motion.h3>

          <motion.p
            variants={contentVariants}
            className="text-gray-600 text-sm mb-3 line-clamp-2"
          >
            {product.description}
          </motion.p>

          {/* Rating */}
          <motion.div
            variants={contentVariants}
            className="flex items-center gap-2 mb-4"
          >
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: star * 0.1 }}
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </motion.div>

          {/* Price */}
          <motion.div
            variants={contentVariants}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-2xl font-bold text-gray-900">
              {product.price} ج.م
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {product.originalPrice} ج.م
              </span>
            )}
          </motion.div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={addToCartClicked}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              addToCartClicked
                ? "bg-green-500"
                : "bg-gradient-kledje hover:shadow-lg"
            }`}
          >
            <motion.div
              animate={addToCartClicked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {addToCartClicked ? "تم الإضافة!" : "إضافة للسلة"}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-kledje rounded-3xl -z-10 blur-xl scale-105"
        />
      </motion.div>
    </motion.div>
  );
};

// Page Transition Animation
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Staggered List Animation
export const StaggeredList = ({ children, className = "" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Parallax Scroll Effect
export const ParallaxSection = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
    setClientHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -speed;
      if (ref.current) {
        ref.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Interactive Background Elements
export const FloatingShapes = () => {
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-gradient-kledje opacity-5"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
};

// Loading Animation
export const LoadingSpinner = ({ size = "md", text = "جاري التحميل..." }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`border-4 border-kledje-200 border-t-kledje-600 rounded-full ${sizeClasses[size]}`}
      />
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-gray-600 font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
};

// Success Animation
export const SuccessAnimation = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onAnimationComplete={onComplete}
      className="flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};
