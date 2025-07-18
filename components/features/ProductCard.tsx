"use client";

import { memo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  Package,
  Percent,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

// ===============================
// INTERFACES
// ===============================

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
  isInCart?: boolean;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  showQuickView?: boolean;
  className?: string;
}

interface ProductImageProps {
  product: Product;
  priority?: boolean;
  size: "sm" | "md" | "lg";
}

interface ProductInfoProps {
  product: Product;
  size: "sm" | "md" | "lg";
}

interface ProductActionsProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
  isInCart?: boolean;
  showQuickView?: boolean;
}

// ===============================
// SIZE CONFIGURATIONS
// ===============================

const sizeConfig = {
  sm: {
    container: "w-full max-w-xs",
    image: { width: 240, height: 240 },
    title: "text-sm",
    price: "text-base",
    button: "text-xs py-2",
  },
  md: {
    container: "w-full max-w-sm",
    image: { width: 320, height: 320 },
    title: "text-base",
    price: "text-lg",
    button: "text-sm py-3",
  },
  lg: {
    container: "w-full max-w-md",
    image: { width: 400, height: 400 },
    title: "text-lg",
    price: "text-xl",
    button: "text-base py-4",
  },
};

// ===============================
// PRODUCT IMAGE COMPONENT
// ===============================

const ProductImage = memo<ProductImageProps>(
  ({ product, priority = false, size }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const config = sizeConfig[size];
    const mainImage = product.images?.[0]?.url || "/placeholder.svg";
    const hoverImage = product.images?.[1]?.url;

    return (
      <div className="relative overflow-hidden bg-gray-100 rounded-xl group">
        <div
          className="relative aspect-square"
          style={{
            width: config.image.width,
            height: config.image.height,
          }}
        >
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          )}

          {/* Main product image */}
          <Image
            src={imageError ? "/placeholder.svg" : mainImage}
            alt={product.arabicName || product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              imageLoading ? "opacity-0" : "opacity-100"
            } ${hoverImage ? "group-hover:opacity-0" : ""}`}
            priority={priority}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover image */}
          {hoverImage && !imageError && (
            <Image
              src={hoverImage}
              alt={`${product.arabicName || product.name} - صورة إضافية`}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Sale badge */}
        {product.isOnSale && product.salePercentage && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-3 right-3 z-10"
          >
            <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
              <Percent className="h-3 w-3 ml-1" />
              {product.salePercentage}%
            </Badge>
          </motion.div>
        )}

        {/* Stock status */}
        {product.inventory === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <Badge className="bg-red-600 text-white px-3 py-2">
              <Package className="h-4 w-4 ml-2" />
              نفد المخزون
            </Badge>
          </div>
        )}

        {/* Low stock warning */}
        {product.inventory > 0 && product.inventory <= 5 && (
          <div className="absolute bottom-3 left-3 z-10">
            <Badge variant="outline" className="bg-orange-100 text-orange-800">
              آخر {product.inventory} قطع
            </Badge>
          </div>
        )}
      </div>
    );
  },
);
ProductImage.displayName = "ProductImage";

// ===============================
// PRODUCT INFO COMPONENT
// ===============================

const ProductInfo = memo<ProductInfoProps>(({ product, size }) => {
  const config = sizeConfig[size];

  // Calculate average rating and review count
  const avgRating = product.averageRating || 4.5;
  const reviewCount = product.totalReviews || 0;

  return (
    <div className="space-y-3">
      {/* Category */}
      {product.category && (
        <Badge
          variant="outline"
          className="text-xs text-brand-600 border-brand-200"
        >
          {product.category.arabicName || product.category.name}
        </Badge>
      )}

      {/* Product name */}
      <h3
        className={`font-semibold text-gray-900 line-clamp-2 ${config.title}`}
      >
        {product.arabicName || product.name}
      </h3>

      {/* Rating */}
      {reviewCount > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(avgRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({reviewCount})</span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-center gap-2">
        <span className={`font-bold text-gray-900 ${config.price}`}>
          {formatPrice(product.price)} ج.م
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(product.originalPrice)} ج.م
          </span>
        )}
      </div>

      {/* Benefits/Features */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {product.benefits.slice(0, 2).map((benefit, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-gray-100 text-gray-700"
            >
              {benefit}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
});
ProductInfo.displayName = "ProductInfo";

// ===============================
// PRODUCT ACTIONS COMPONENT
// ===============================

const ProductActions = memo<ProductActionsProps>(
  ({
    product,
    onAddToCart,
    onAddToWishlist,
    isInWishlist = false,
    isInCart = false,
    showQuickView = true,
  }) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
    const { toast } = useToast();

    const handleAddToCart = useCallback(async () => {
      if (!onAddToCart || product.inventory === 0) return;

      setIsAddingToCart(true);
      try {
        await onAddToCart(product);
        toast({
          title: "تم إضافة المنتج",
          description: `تم إضافة ${product.arabicName || product.name} إلى السلة`,
        });
      } catch (error) {
        toast({
          title: "خطأ",
          description: "فشل في إضافة المنتج إلى السلة",
          variant: "destructive",
        });
      } finally {
        setIsAddingToCart(false);
      }
    }, [onAddToCart, product, toast]);

    const handleAddToWishlist = useCallback(async () => {
      if (!onAddToWishlist) return;

      setIsAddingToWishlist(true);
      try {
        await onAddToWishlist(product);
        toast({
          title: isInWishlist ? "تم إزالة المنتج" : "تم إضافة المنتج",
          description: `تم ${isInWishlist ? "إزالة" : "إضافة"} ${
            product.arabicName || product.name
          } ${isInWishlist ? "من" : "إلى"} المفضلة`,
        });
      } catch (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحديث المفضلة",
          variant: "destructive",
        });
      } finally {
        setIsAddingToWishlist(false);
      }
    }, [onAddToWishlist, product, isInWishlist, toast]);

    return (
      <div className="space-y-3">
        {/* Quick actions (visible on hover) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {showQuickView && (
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white/90 backdrop-blur-sm hover:bg-white"
              asChild
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4 ml-2" />
                معاينة
              </Link>
            </Button>
          )}

          {onAddToWishlist && (
            <Button
              size="sm"
              variant="secondary"
              className={`bg-white/90 backdrop-blur-sm hover:bg-white ${
                isInWishlist ? "text-red-500" : ""
              }`}
              onClick={handleAddToWishlist}
              disabled={isAddingToWishlist}
            >
              {isAddingToWishlist ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart
                  className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
                />
              )}
            </Button>
          )}
        </motion.div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.inventory === 0 || isAddingToCart || isInCart}
          className="w-full bg-gradient-primary hover:shadow-lg transition-all duration-300"
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              جاري الإضافة...
            </>
          ) : isInCart ? (
            "موجود في السلة"
          ) : product.inventory === 0 ? (
            "نفد المخزون"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 ml-2" />
              إضافة للسلة
            </>
          )}
        </Button>
      </div>
    );
  },
);
ProductActions.displayName = "ProductActions";

// ===============================
// MAIN PRODUCT CARD COMPONENT
// ===============================

export const ProductCard = memo<ProductCardProps>(
  ({
    product,
    onAddToCart,
    onAddToWishlist,
    isInWishlist = false,
    isInCart = false,
    priority = false,
    size = "md",
    showQuickView = true,
    className = "",
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const config = sizeConfig[size];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group ${config.container} ${className}`}
      >
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-0">
            {/* Product Image */}
            <ProductImage product={product} priority={priority} size={size} />

            {/* Product Content */}
            <div className="p-4 space-y-4">
              <ProductInfo product={product} size={size} />

              <ProductActions
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                isInWishlist={isInWishlist}
                isInCart={isInCart}
                showQuickView={showQuickView}
              />
            </div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 -z-10 pointer-events-none"
              animate={{ opacity: isHovered ? 0.05 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </CardContent>
        </Card>
      </motion.div>
    );
  },
);

ProductCard.displayName = "ProductCard";

// ===============================
// EXPORTS
// ===============================

export default ProductCard;
export type { ProductCardProps };
