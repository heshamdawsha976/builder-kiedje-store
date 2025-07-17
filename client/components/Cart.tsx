import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "../store/cart";

export function Cart() {
  const { items, isOpen, toggleCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50"
            onClick={toggleCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">سلة التسوق</h2>
              <Button variant="ghost" size="sm" onClick={toggleCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Empty Cart Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-6" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  سلة التسوق فارغة
                </h3>
                <p className="text-gray-500 mb-6">
                  ابدئي التسوق لإضافة منتجات إلى سلتك
                </p>
                <Button
                  className="bg-brand-600 hover:bg-brand-700"
                  onClick={toggleCart}
                  asChild
                >
                  <Link to="/products">تصفح المنتجات</Link>
                </Button>
              </div>
            </div>

            {/* Footer Info */}
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="text-center text-sm text-gray-600">
                <p className="font-medium mb-1">الدفع عند الاستلام متاح</p>
                <p>توصيل مجاني للطلبات فوق 500 جنيه</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
