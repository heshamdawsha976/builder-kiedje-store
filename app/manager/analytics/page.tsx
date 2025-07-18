"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Filter,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  Target,
  Eye,
  MousePointer,
  RefreshCw,
  Share2,
  Heart,
  Star,
  MessageCircle,
  Zap,
  Activity,
  Award,
  Briefcase,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// بيانات وهمية للتحليلات المتقدمة
const salesData = [
  { month: "يناير", revenue: 45000, orders: 120, customers: 85 },
  { month: "فبراير", revenue: 52000, orders: 140, customers: 95 },
  { month: "مارس", revenue: 48000, orders: 130, customers: 88 },
  { month: "أبريل", revenue: 58000, orders: 155, customers: 110 },
  { month: "مايو", revenue: 62000, orders: 170, customers: 125 },
  { month: "يونيو", revenue: 71000, orders: 190, customers: 140 },
  { month: "يوليو", revenue: 68000, orders: 185, customers: 135 },
  { month: "أغسطس", revenue: 75000, orders: 200, customers: 150 },
];

const topProducts = [
  {
    name: "سيروم فيتامين سي",
    sales: 345,
    revenue: 17250,
    growth: 23,
    category: "سيرومات",
  },
  {
    name: "كريم الترطيب اليومي",
    sales: 289,
    revenue: 14450,
    growth: 18,
    category: "مرطبات",
  },
  {
    name: "منظف الوجه اللطيف",
    sales: 256,
    revenue: 7680,
    growth: 12,
    category: "منظف��ت",
  },
  {
    name: "ماسك الطين المنقي",
    sales: 234,
    revenue: 11700,
    growth: 28,
    category: "ماسكات",
  },
  {
    name: "زيت الأرغان الطبيعي",
    sales: 198,
    revenue: 15840,
    growth: 15,
    category: "زيوت",
  },
];

const deviceStats = [
  { device: "الهاتف المحمول", percentage: 68, icon: Smartphone, color: "blue" },
  { device: "سطح المكتب", percentage: 25, icon: Monitor, color: "green" },
  { device: "الجهاز اللوحي", percentage: 7, icon: Tablet, color: "purple" },
];

const customerSegments = [
  {
    segment: "عملاء مميزون",
    count: 145,
    percentage: 12,
    avgSpent: 850,
    color: "from-purple-500 to-pink-500",
  },
  {
    segment: "عملاء منتظمون",
    count: 432,
    percentage: 35,
    avgSpent: 380,
    color: "from-blue-500 to-cyan-500",
  },
  {
    segment: "عملاء جدد",
    count: 289,
    percentage: 23,
    avgSpent: 180,
    color: "from-green-500 to-emerald-500",
  },
  {
    segment: "عملاء غير نشطين",
    count: 367,
    percentage: 30,
    avgSpent: 120,
    color: "from-gray-400 to-gray-500",
  },
];

const geographicData = [
  { city: "القاهرة", orders: 456, percentage: 38 },
  { city: "الجيزة", orders: 234, percentage: 19 },
  { city: "الإسكندرية", orders: 189, percentage: 16 },
  { city: "الشرقية", orders: 123, percentage: 10 },
  { city: "القليوبية", orders: 98, percentage: 8 },
  { city: "أخرى", orders: 110, percentage: 9 },
];

// مكون بطاقة المتريك
const MetricCard = ({ title, value, change, icon: Icon, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="hover-lift">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          {change && (
            <div className="mt-4 flex items-center">
              {change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 ml-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {change > 0 ? "+" : ""}
                {change}% من الشهر الماضي
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// مكون رسم بياني بسيط
const SimpleChart = ({ data, title, color }) => {
  const maxValue = Math.max(...data.map((item) => item.revenue));

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(-6).map((item, index) => (
            <div key={item.month} className="flex items-center gap-3">
              <div className="w-16 text-sm text-gray-600">{item.month}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="h-2 bg-gray-200 rounded-full flex-1 mr-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(item.revenue / maxValue) * 100}%`,
                      }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className={`h-2 bg-gradient-to-r ${color} rounded-full`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ManagerAnalytics() {
  const [timeRange, setTimeRange] = useState("last6months");
  const [activeTab, setActiveTab] = useState("overview");

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = salesData.reduce(
    (sum, item) => sum + item.customers,
    0,
  );
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            التحليلات المتقدمة
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            رؤى شاملة ومفصلة عن أداء المتجر والعمليات
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">آخر 7 أيام</SelectItem>
              <SelectItem value="last30days">آخر 30 يوم</SelectItem>
              <SelectItem value="last3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="last6months">آخر 6 أشهر</SelectItem>
              <SelectItem value="lastyear">السنة الماضية</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-primary hover:shadow-xl">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </motion.div>

      {/* المقاييس الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="إجمالي الإيرادات"
          value={`${totalRevenue.toLocaleString()} ج.م`}
          change={18.5}
          icon={DollarSign}
          color="from-green-500 to-emerald-500"
          delay={0.1}
        />
        <MetricCard
          title="إجمالي الطلبات"
          value={totalOrders.toLocaleString()}
          change={12.3}
          icon={ShoppingCart}
          color="from-blue-500 to-cyan-500"
          delay={0.2}
        />
        <MetricCard
          title="العملاء النشطين"
          value={totalCustomers.toLocaleString()}
          change={8.7}
          icon={Users}
          color="from-purple-500 to-pink-500"
          delay={0.3}
        />
        <MetricCard
          title="متوسط قيمة الطلب"
          value={`${avgOrderValue} ج.م`}
          change={5.2}
          icon={Target}
          color="from-orange-500 to-red-500"
          delay={0.4}
        />
      </div>

      {/* التبويبات */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              المبيعات
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              العملاء
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="behavior" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              سلوك المستخدمين
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 mt-8">
            {/* نظرة عامة */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SimpleChart
                data={salesData}
                title="نمو الإيرادات الشهرية"
                color="from-green-500 to-emerald-500"
              />

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    توزيع الأجهزة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceStats.map((device, index) => (
                      <motion.div
                        key={device.device}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <device.icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{device.device}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${device.percentage}%` }}
                              transition={{ delay: index * 0.1, duration: 0.8 }}
                              className={`h-2 bg-${device.color}-500 rounded-full`}
                            />
                          </div>
                          <span className="font-bold text-gray-900 w-10">
                            {device.percentage}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* الموقع الجغرافي */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  التوزيع الجغرافي للطلبات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {geographicData.map((location, index) => (
                    <motion.div
                      key={location.city}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {location.city}
                        </h4>
                        <Badge variant="outline">{location.orders} طلب</Badge>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${location.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {location.percentage}% من إجمالي الطلبات
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-8 mt-8">
            {/* تحليل المبيعات */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    أفضل المنتجات مبيعاً
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {product.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">
                              {product.revenue.toLocaleString()} ج.م
                            </span>
                            <Badge
                              className="bg-green-100 text-green-800"
                              variant="outline"
                            >
                              +{product.growth}%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {product.sales} مبيعة
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    أداء المبيعات الزمني
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          68%
                        </div>
                        <div className="text-sm text-blue-800">ذروة المساء</div>
                        <div className="text-xs text-blue-600 mt-1">
                          6-9 مساءً
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          الجمعة
                        </div>
                        <div className="text-sm text-green-800">أفضل يوم</div>
                        <div className="text-xs text-green-600 mt-1">
                          +32% من المتوسط
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        توزيع المبيعات الأسبوعية
                      </h4>
                      {[
                        { day: "السبت", percentage: 85 },
                        { day: "الأحد", percentage: 72 },
                        { day: "الاثنين", percentage: 68 },
                        { day: "الثلاثاء", percentage: 75 },
                        { day: "الأربعاء", percentage: 82 },
                        { day: "الخميس", percentage: 90 },
                        { day: "الجمعة", percentage: 100 },
                      ].map((day, index) => (
                        <div key={day.day} className="flex items-center gap-3">
                          <div className="w-16 text-sm text-gray-600">
                            {day.day}
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${day.percentage}%` }}
                              transition={{
                                delay: index * 0.1,
                                duration: 0.8,
                              }}
                              className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            />
                          </div>
                          <div className="text-sm font-medium text-gray-900 w-12">
                            {day.percentage}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-8 mt-8">
            {/* تحليل العملاء */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    شرائح العملاء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSegments.map((segment, index) => (
                      <motion.div
                        key={segment.segment}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">
                            {segment.segment}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`bg-gradient-to-r ${segment.color} text-white`}
                            >
                              {segment.count}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {segment.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${segment.percentage}%` }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className={`h-2 bg-gradient-to-r ${segment.color} rounded-full`}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          متوسط الإنفاق: {segment.avgSpent} ج.م
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    مؤشرات رضا العملاء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="text-2xl font-bold text-yellow-600">
                            4.8
                          </span>
                        </div>
                        <div className="text-sm text-yellow-800">
                          متوسط التقييمات
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          92%
                        </div>
                        <div className="text-sm text-green-800">
                          معدل الرضا العام
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        توزيع التقييمات
                      </h4>
                      {[
                        { stars: "5 نجوم", count: 289, percentage: 67 },
                        { stars: "4 نجوم", count: 95, percentage: 22 },
                        { stars: "3 نجوم", count: 32, percentage: 7 },
                        { stars: "2 نجوم", count: 12, percentage: 3 },
                        { stars: "1 نجمة", count: 4, percentage: 1 },
                      ].map((rating, index) => (
                        <div
                          key={rating.stars}
                          className="flex items-center gap-3"
                        >
                          <div className="w-16 text-sm text-gray-600">
                            {rating.stars}
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${rating.percentage}%` }}
                              transition={{
                                delay: index * 0.1,
                                duration: 0.8,
                              }}
                              className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                            />
                          </div>
                          <div className="text-sm text-gray-600 w-16">
                            {rating.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-8 mt-8">
            {/* تحليل المنتجات */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-center">
                    المنتجات الرائجة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      18
                    </div>
                    <div className="text-sm text-gray-600">
                      منتج يحقق أرباح عالية
                    </div>
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      +12% هذا الشهر
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-center">مخزون منخفض</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      12
                    </div>
                    <div className="text-sm text-gray-600">
                      منتج يحتاج إعادة تموين
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 mt-2">
                      تحذير
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-center">نفد المخزون</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">
                      3
                    </div>
                    <div className="text-sm text-gray-600">
                      منتج غير متوفر حالياً
                    </div>
                    <Badge className="bg-red-100 text-red-800 mt-2">عاجل</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-8 mt-8">
            {/* سلوك المستخدمين */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <Eye className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">15,420</div>
                  <div className="text-sm text-gray-600">مشاهدات الصفحة</div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <MousePointer className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">3.24%</div>
                  <div className="text-sm text-gray-600">معدل التحويل</div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <RefreshCw className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">42.1%</div>
                  <div className="text-sm text-gray-600">معدل الارتداد</div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">4:32</div>
                  <div className="text-sm text-gray-600">متوسط وقت الجلسة</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
