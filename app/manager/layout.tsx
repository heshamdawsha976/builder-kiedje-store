"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useManagerAuth } from "@/lib/manager-auth";
import { ManagerSidebar } from "@/components/manager/ManagerSidebar";
import { ManagerHeader } from "@/components/manager/ManagerHeader";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useManagerAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/manager/login") {
      router.push("/manager/login");
    }
  }, [isAuthenticated, pathname, router]);

  // إذا كان في صفحة تسجيل الدخول، عرض المحتوى مباشرة
  if (pathname === "/manager/login") {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // إذا لم يكن مسجل دخول، عرض شاشة تحميل
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        {/* Sidebar */}
        <ManagerSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen mr-72">
          {/* Header */}
          <ManagerHeader />

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
