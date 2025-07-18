"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  Calendar,
  Download,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  growth: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
}

interface CustomerMetrics {
  newCustomers: number;
  returningCustomers: number;
  customerRetention: number;
  averageOrderValue: number;
}

const mockSalesData: SalesData[] = [
  {
    period: "يناير 2024",
    revenue: 45000,
    orders: 120,
    customers: 85,
    growth: 12,
  },
  {
    period: "فبراير 2024",
    revenue: 52000,
    orders: 140,
    customers: 95,
    growth: 15,
  },
  {
    period: "مارس 2024",
    revenue: 48000,
    orders: 130,
    customers: 88,
    growth: -7,
  },
  {
    period: "أبريل 2024",
    revenue: 58000,
    orders: 155,
    customers: 110,
    growth: 20,
  },
  {
    period: "مايو 2024",
    revenue: 62000,
    orders: 170,
    customers: 125,
    growth: 7,
  },
  {
    period: "يونيو 2024",
    revenue: 71000,
    orders: 190,
    customers: 140,
    growth: 14,
  },
];

const mockProductPerformance: ProductPerformance[] = [
  {
    id: "1",
    name: "سيروم فيتامين سي",
    category: "سيروم",
    sales: 245,
    revenue: 12250,
    growth: 18,
  },
  {
    id: "2",
    name: "كريم مرطب للوجه",
    category: "مرطبات",
    sales: 189,
    revenue: 9450,
    growth: 12,
  },
  {
    id: "3",
    name: "منظف الوجه اللطيف",
    category: "منظفات",
    sales: 156,
    revenue: 4680,
    growth: -5,
  },
  {
    id: "4",
    name: "ماسك الطين المنقي",
    category: "ماسكات",
    sales: 134,
    revenue: 6700,
    growth: 25,
  },
  {
    id: "5",
    name: "زيت الأرغان الطبيعي",
    category: "زيوت",
    sales: 98,
    revenue: 7840,
    growth: 8,
  },
];

const mockCustomerMetrics: CustomerMetrics = {
  newCustomers: 45,
  returningCustomers: 128,
  customerRetention: 74,
  averageOrderValue: 385,
};

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState("last6months");

  const currentRevenue = mockSalesData[mockSalesData.length - 1].revenue;
  const previousRevenue = mockSalesData[mockSalesData.length - 2].revenue;
  const revenueGrowth = (
    ((currentRevenue - previousRevenue) / previousRevenue) *
    100
  ).toFixed(1);

  const totalOrders = mockSalesData.reduce((sum, data) => sum + data.orders, 0);
  const totalCustomers = Math.max(
    ...mockSalesData.map((data) => data.customers),
  );
  const totalRevenue = mockSalesData.reduce(
    (sum, data) => sum + data.revenue,
    0,
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            التحليلات والتقارير
          </h1>
          <p className="text-gray-600 mt-1">رؤى شاملة عن أداء المتجر</p>
        </div>
        <div className="flex gap-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">آخر 7 أيام</SelectItem>
              <SelectItem value="last30days">آخر 30 يوم</SelectItem>
              <SelectItem value="last3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="last6months">آخر 6 أشهر</SelectItem>
              <SelectItem value="lastyear">العام الماضي</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                إجمالي الإيرادات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {totalRevenue.toLocaleString()} ج.م
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 ml-1" />+{revenueGrowth}%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">مقارنة بالشهر الماضي</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                إجمالي الطلبات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {totalOrders}
                </div>
                <div className="flex items-center text-blue-600 text-sm">
                  <TrendingUp className="h-4 w-4 ml-1" />
                  +12%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">آخر 6 أشهر</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                إجمالي العملاء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {totalCustomers}
                </div>
                <div className="flex items-center text-purple-600 text-sm">
                  <TrendingUp className="h-4 w-4 ml-1" />
                  +18%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">عملاء نشطين</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                متوسط قيمة الطلب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  {mockCustomerMetrics.averageOrderValue} ج.م
                </div>
                <div className="flex items-center text-orange-600 text-sm">
                  <TrendingUp className="h-4 w-4 ml-1" />
                  +8%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">آخر 30 يوم</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                نمو الإيرادات الشهرية
              </CardTitle>
              <CardDescription>
                تطور الإيرادات على مدار ا��ـ 6 أشهر الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSalesData.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-900 min-w-[100px]">
                        {data.period}
                      </div>
                      <div className="text-sm text-gray-500">
                        {data.orders} طلب
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-gray-900">
                        {data.revenue.toLocaleString()} ج.م
                      </div>
                      <Badge
                        variant={data.growth >= 0 ? "default" : "destructive"}
                        className={
                          data.growth >= 0 ? "bg-green-100 text-green-800" : ""
                        }
                      >
                        {data.growth >= 0 ? "+" : ""}
                        {data.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                مقاييس العملاء
              </CardTitle>
              <CardDescription>
                إحصائيات مفصلة حول قاعدة العملاء
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    العملاء الجدد
                  </span>
                  <span className="text-sm text-gray-900">
                    {mockCustomerMetrics.newCustomers}
                  </span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    العملاء العائدين
                  </span>
                  <span className="text-sm text-gray-900">
                    {mockCustomerMetrics.returningCustomers}
                  </span>
                </div>
                <Progress value={84} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    معدل الاحتفاظ
                  </span>
                  <span className="text-sm text-gray-900">
                    {mockCustomerMetrics.customerRetention}%
                  </span>
                </div>
                <Progress
                  value={mockCustomerMetrics.customerRetention}
                  className="h-2"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {mockCustomerMetrics.newCustomers}
                    </div>
                    <div className="text-xs text-gray-500">
                      عملاء جدد هذا الشهر
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {mockCustomerMetrics.returningCustomers}
                    </div>
                    <div className="text-xs text-gray-500">عملاء عائدين</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Product Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              أداء المنتجات الأفضل
            </CardTitle>
            <CardDescription>أفضل المنتجات مبيعاً وإيراداً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProductPerformance.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {product.sales}
                      </div>
                      <div className="text-xs text-gray-500">مبيعات</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {product.revenue.toLocaleString()} ج.م
                      </div>
                      <div className="text-xs text-gray-500">إيرادات</div>
                    </div>
                    <Badge
                      variant={product.growth >= 0 ? "default" : "destructive"}
                      className={
                        product.growth >= 0 ? "bg-green-100 text-green-800" : ""
                      }
                    >
                      {product.growth >= 0 ? "+" : ""}
                      {product.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
