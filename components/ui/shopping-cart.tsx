"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Heart,
  Gift,
  Tag,
  CreditCard,
  Truck,
  Shield,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: string;
  inStock: boolean;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onAddToWishlist: (id: string) => void;
}

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onAddToWishlist,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onAddToWishlist: (id: string) => void;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemoveItem(item.id), 300);
  };

  const discountPercentage = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        x: isRemoving ? 100 : 0,
        scale: isRemoving ? 0.8 : 1,
      }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      {/* Product Image */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-kledje-50 to-coral-50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        {discountPercentage > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-gradient-coral text-white text-xs px-2 py-1 rounded-full">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
          {item.name}
        </h4>
        {item.variant && (
          <p className="text-sm text-gray-500 mb-2">{item.variant}</p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-kledje-600">{item.price} ج.م</span>
          {item.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {item.originalPrice} ج.م
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </motion.button>

            <span className="w-8 text-center font-medium">{item.quantity}</span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={!item.inStock}
              className="w-8 h-8 rounded-lg bg-kledje-100 flex items-center justify-center text-kledje-600 hover:bg-kledje-200 transition-colors disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToWishlist(item.id)}
              className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-100 transition-colors"
            >
              <Heart className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ShoppingCart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddToWishlist,
}: ShoppingCartProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const originalTotal = items.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0,
  );
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 300 ? 0 : 25;
  const promoDiscount = appliedPromo === "KLEDJE20" ? subtotal * 0.2 : 0;
  const total = subtotal + shipping - promoDiscount;

  const applyPromoCode = () => {
    if (promoCode === "KLEDJE20") {
      setAppliedPromo(promoCode);
      setPromoCode("");
    }
  };

  const features = [
    { icon: Shield, text: "دفع آمن 100%" },
    { icon: Truck, text: "توصيل مجاني +300 ج.م" },
    { icon: Gift, text: "تغليف هدايا مجاني" },
  ];

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-50 shadow-2xl z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-kledje rounded-xl flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      سلة التسوق
                    </h2>
                    <p className="text-sm text-gray-500">
                      {items.length} منتج في السلة
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="flex gap-2 overflow-x-auto">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-kledje-50 px-3 py-2 rounded-full whitespace-nowrap"
                  >
                    <feature.icon className="h-4 w-4 text-kledje-600" />
                    <span className="text-xs text-kledje-700">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-kledje-100 to-coral-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-kledje-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    سلة التسوق فارغة
                  </h3>
                  <p className="text-gray-500 mb-6">
                    أضيفي منتجاتك المفضلة لتبدئي التسوق
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-kledje text-white"
                  >
                    تسوقي الآن
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemoveItem={onRemoveItem}
                      onAddToWishlist={onAddToWishlist}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer - Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-200">
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="كود الخصم"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                      dir="rtl"
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      className="px-6"
                    >
                      تطبيق
                    </Button>
                  </div>
                  {appliedPromo && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex items-center gap-2 text-green-600"
                    >
                      <Tag className="h-4 w-4" />
                      <span className="text-sm">
                        تم تطبيق كود {appliedPromo}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal} ج.م</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>وفرت</span>
                      <span>-{savings} ج.م</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>خصم الكود</span>
                      <span>-{promoDiscount.toFixed(0)} ج.م</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>التوصيل</span>
                    <span>{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>الإجمالي</span>
                    <span>{total.toFixed(0)} ج.م</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-gradient-to-r from-kledje-500 to-kledje-600 text-white py-4 text-lg rounded-2xl shadow-lg relative overflow-hidden group">
                    <div className="flex items-center justify-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      <span>إتمام الطلب - {total.toFixed(0)} ج.��</span>
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>دفع آمن</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>ضمان الجودة</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
