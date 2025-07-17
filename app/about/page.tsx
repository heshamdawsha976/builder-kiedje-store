import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <Construction className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">من نحن</h1>
          <p className="text-gray-600">
            هذه الصفحة قيد التطوير. سيتم إضافة المحتوى قريباً.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">العودة للرئيسية</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          تواصل معنا لطلب المساعدة في إنشاء محتوى هذه الصفحة
        </p>
      </div>
    </div>
  );
}
