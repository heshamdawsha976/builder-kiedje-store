import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Products() {
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
              مجموعة منتجات كليديج
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              نحن نعمل بجد لإضافة أفضل مستحضرات التجميل لك. ستكون متاحة قريباً!
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              قريباً جداً
            </h2>
            <p className="text-gray-600 mb-6">
              سنقوم بإضافة مجموعة واسعة من مستحضرات التجميل عالية الجودة المصممة
              خصيصاً للمرأة العربية. تابعينا للحصول على آخر التحديثات.
            </p>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="ادخلي بريدك للحصول على إشعار"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-gray-900 text-right"
                dir="rtl"
              />
              <Button className="bg-brand-600 hover:bg-brand-700 px-6">
                إشعار
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              ستحصلين على خصم خاص عند إطلاق المتجر
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link to="/">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة للرئيسية
              </Link>
            </Button>

            <div className="text-sm text-gray-500">
              <p>أو تواصلي معنا للاستفسارات الخاصة</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
