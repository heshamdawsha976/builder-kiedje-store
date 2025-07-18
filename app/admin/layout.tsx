"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/lib/admin-auth";
import { PageLoader } from "@/components/LoadingSpinner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // السماح بصفحة تسجيل الدخول دون تحقق
    if (pathname === "/admin/login") {
      return;
    }

    // التحقق من المصادقة للصفحات الأخرى
    if (!checkAuth()) {
      router.push("/admin/login");
    }
  }, [pathname, checkAuth, router]);

  // إظهار صفحة التحميل أثناء التحقق من المصادقة
  if (pathname !== "/admin/login" && !isAuthenticated) {
    return <PageLoader />;
  }

  return (
    <div className="admin-layout bg-gray-50 min-h-screen" dir="rtl">
      {children}
    </div>
  );
}
