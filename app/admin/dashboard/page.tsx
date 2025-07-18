"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  Activity,
  Eye,
  Heart,
  Star,
  Clock,
  Truck,
  AlertCircle,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, change, isPositive, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp
              className={`h-4 w-4 ${isPositive ? "text-green-500" : "text-red-500"}`}
            />
            <span
              className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-500">من الشهر الماضي</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

// Recent Activity Item
const ActivityItem = ({ icon: Icon, title, description, time, status }) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
    >
      <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="text-left">
        <Badge
          className={`mb-1 ${status === "success" ? "bg-green-100 text-green-700" : status === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}
        >
          {status === "success"
            ? "مكتمل"
            : status === "warning"
              ? "في الانتظار"
              : "جديد"}
        </Badge>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </motion.div>
  );
};

export default function AdminDashboardPage() {
  const stats = [
    {
      icon: DollarSign,
      title: "إجمالي المبيعات",
      value: "42,580 ج.م",
      change: "+12.5%",
      isPositive: true,
    },
    {
      icon: ShoppingCart,
      title: "الطلبات",
      value: "156",
      change: "+8.2%",
      isPositive: true,
    },
    {
      icon: Users,
      title: "العملاء",
      value: "1,247",
      change: "+15.3%",
      isPositive: true,
    },
    {
      icon: Package,
      title: "المنتجات",
      value: "89",
      change: "+5.1%",
      isPositive: true,
    },
  ];

  const recentActivities = [
    {
      icon: ShoppingCart,
      title: "طلب جديد #1234",
      description: "طلب من سارة محمد بقيمة 1,250 ج.م",
      time: "منذ 5 دقائق",
      status: "new",
    },
    {
      icon: Package,
      title: "تم شحن الطلب #1230",
      description: "تم شحن الطلب لأحمد علي",
      time: "منذ 15 دقيقة",
      status: "success",
    },
    {
      icon: Star,
      title: "مراجعة جديدة",
      description: "تقييم 5 نجوم لمنتج كريم الترطيب",
      time: "منذ 30 دقيقة",
      status: "success",
    },
    {
      icon: AlertCircle,
      title: "مخزون منخفض",
      description: "منتج سيروم فيتامين C - متبقي 5 قطع",
      time: "منذ ساعة",
      status: "warning",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 mr-80">
        <AdminHeader title="لوحة التحكم" subtitle="نظرة عامة على متجر كليدج" />

        <main className="p-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-primary rounded-2xl p-8 text-white mb-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">
                مرحباً بك في لوحة تحكم كليدج
              </h1>
              <p className="text-lg text-pink-100 mb-6">
                إدارة متجرك بسهولة ومتابعة جميع العمليات من مكان واحد
              </p>
              <Button className="bg-white text-brand-600 hover:bg-gray-100">
                عرض التقارير التفصيلية
              </Button>
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-24 translate-y-24" />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.title}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                isPositive={stat.isPositive}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="xl:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    النشاطات الأخيرة
                  </h2>
                  <Button variant="outline" size="sm">
                    عرض الكل
                  </Button>
                </div>

                <div className="space-y-2">
                  {recentActivities.map((activity, index) => (
                    <ActivityItem
                      key={index}
                      icon={activity.icon}
                      title={activity.title}
                      description={activity.description}
                      time={activity.time}
                      status={activity.status}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Actions & Summary */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  إجراءات سريعة
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-secondary text-white">
                    <Package className="h-4 w-4 ml-2" />
                    إضافة منتج جديد
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-brand-200 text-brand-600 hover:bg-brand-50"
                  >
                    <Users className="h-4 w-4 ml-2" />
                    إدارة العملاء
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-200"
                  >
                    <Activity className="h-4 w-4 ml-2" />
                    عرض التقارير
                  </Button>
                </div>
              </motion.div>

              {/* Today's Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  ملخص اليوم
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-600">الزيارات</span>
                    </div>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-600">طلبات جديدة</span>
                    </div>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-gray-600">المفضلات</span>
                    </div>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-orange-500" />
                      <span className="text-sm text-gray-600">قيد الشحن</span>
                    </div>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
