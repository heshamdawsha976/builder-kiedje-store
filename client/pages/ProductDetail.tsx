import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-100 text-brand-600 rounded-full mb-6">
              <Package className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              تفاصيل الم��تج
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              هذه الصفحة ستعرض تفاصيل المنتج المختار مع إمكانية الإضافة للسلة
            </p>
          </div>

          {/* Preview Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ما ستجدينه هنا
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-right">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  معلومات المنتج
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• صور عالية الجودة</li>
                  <li>• وصف مفصل باللغة العربية</li>
                  <li>• السعر بالجنيه المصري</li>
                  <li>• معلومات التوفر</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  خيارات الشراء
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• اختيار الكمية</li>
                  <li>• إضافة للسلة</li>
                  <li>• إضافة للمفضلة</li>
                  <li>• مشاركة المنتج</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link to="/products">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة للمنتجات
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto"
              size="lg"
            >
              <Link to="/">العودة للرئيسية</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
