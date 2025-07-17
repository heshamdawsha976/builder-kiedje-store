import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Checkout() {
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
              <CreditCard className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              إتمام الطلب
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              صفحة الدفع الآمنة مع خيار الدفع عند الاستلام
            </p>
          </div>

          {/* Checkout Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              عملية دفع بسيطة وآمنة
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Payment Method */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                  <CreditCard className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  الدفع عند الاستلام
                </h3>
                <p className="text-gray-600">
                  ادفعي قيمة طلبك نقداً عند وصوله إليك بأمان تام
                </p>
              </div>

              {/* Delivery */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">توصيل سريع</h3>
                <p className="text-gray-600">
                  توصيل مجاني داخل القاهرة والجيزة خلال 24-48 ساعة
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                ما ستجدينه في صفحة الدفع:
              </h3>
              <div className="text-right text-gray-600">
                <p>• نموذج بيانات التوصيل (الاسم، الهاتف، العنوان)</p>
                <p>• ملخص الطلب والأسعار</p>
                <p>• تأكيد الطلب مع الدفع عند الاستلام</p>
                <p>• إرسال تفاصيل الطلب عبر الواتساب أو الإيميل</p>
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
