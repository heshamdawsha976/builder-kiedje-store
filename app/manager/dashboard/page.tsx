"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  Calendar,
  BarChart3,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Award,
  Zap,
  ArrowUp,
  ArrowDown,
  Eye,
  MessageSquare,
  Star,
  Heart,
  Truck,
  ShoppingBag,
  UserCheck,
  Settings,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useManagerAuth, getRoleDisplayName } from "@/lib/manager-auth";

// إحصائيات متقدمة
interface DashboardStats {
  revenue: {
    total: number;
    growth: number;
    target: number;
    previousMonth: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    growth: number;
    avgValue: number;
  };
  customers: {
    total: number;
    new: number;
    active: number;
    retention: number;
    growth: number;
  };
  products: {
    total: number;
    lowStock: number;
    outOfStock: number;
    topSelling: number;
  };
  performance: {
    conversionRate: number;
    bounceRate: number;
    avgSessionTime: number;
    pageViews: number;
  };
}

const mockStats: DashboardStats = {
  revenue: {
    total: 285000,
    growth: 18.5,
    target: 300000,
    previousMonth: 241000,
  },
  orders: {
    total: 1247,
    pending: 23,
    completed: 1180,
    growth: 15.2,
    avgValue: 228,
  },
  customers: {
    total: 3856,
    new: 145,
    active: 2341,
    retention: 73.5,
    growth: 12.8,
  },
  products: {
    total: 245,
    lowStock: 12,
    outOfStock: 3,
    topSelling: 18,
  },
  performance: {
    conversionRate: 3.24,
    bounceRate: 42.1,
    avgSessionTime: 4.32,
    pageViews: 15420,
  },
};

// مكونات التحليلات
const StatsCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  subtitle,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <Card className="relative overflow-hidden hover-lift">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`}
        />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">
              {title}
            </CardTitle>
            <div
              className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">{value}</div>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                changeType === "positive"
                  ? "bg-green-100 text-green-700"
                  : changeType === "negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {changeType === "positive" ? (
                <ArrowUp className="h-3 w-3" />
              ) : changeType === "negative" ? (
                <ArrowDown className="h-3 w-3" />
              ) : null}
              {change}%
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// بطاقة التقدم
const ProgressCard = ({ title, current, target, icon: Icon, color }) => {
  const percentage = Math.round((current / target) * 100);

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              {current.toLocaleString()} / {target.toLocaleString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Progress value={percentage} className="h-3" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">التقدم</span>
            <span className="font-semibold">{percentage}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// جدول الأنشطة الحديثة
const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "order",
      message: "طلب جديد #12849 من العميلة سارة أحمد",
      time: "منذ 5 دقائق",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "product",
      message: "تم إضافة منتج جديد: سيروم فيتامين C المتطور",
      time: "منذ 15 دقيقة",
      icon: Package,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "customer",
      message: "عميل جديد انضم: فاطمة محمد النور",
      time: "منذ 30 دقيقة",
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "review",
      message: "تقييم 5 نجوم جديد لكريم الترطيب اليومي",
      time: "منذ 45 دقيقة",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      id: 5,
      type: "shipping",
      message: "تم شحن الطلب #12847 - وقت التسليم المتوقع: غداً",
      time: "منذ ساعة",
      icon: Truck,
      color: "text-orange-600",
    },
  ];

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          الأنشطة الحديثة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// أفضل المنتجات
const TopProducts = () => {
  const products = [
    {
      id: 1,
      name: "سيروم فيتامين سي المتطور",
      sales: 145,
      revenue: 7250,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "كريم الترطيب اليومي",
      sales: 128,
      revenue: 6400,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "منظف الوجه اللطيف",
      sales: 98,
      revenue: 2940,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "ماسك الطين المنقي",
      sales: 76,
      revenue: 3800,
      image: "/placeholder.svg",
    },
  ];

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          أفضل المنتجات مبيعاً
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500">{product.sales} مبيعة</p>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">
                  {product.revenue.toLocaleString()} ج.م
                </div>
                <div className="text-xs text-gray-500">إيرادات</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ManagerDashboard() {
  const { user } = useManagerAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
            مرحباً، {user?.fullName}
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            {user?.role && getRoleDisplayName(user.role)} - لوحة التحكم الرئيسية
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge className="bg-gradient-primary text-white px-4 py-2">
              <Calendar className="w-4 h-4 ml-2" />
              {currentTime.toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Clock className="w-4 h-4 ml-2" />
              {currentTime.toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-primary hover:shadow-xl">
            <Zap className="w-4 h-4 ml-2" />
            تقرير سريع
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 ml-2" />
            إعدادات
          </Button>
        </div>
      </motion.div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الإيرادات"
          value={`${mockStats.revenue.total.toLocaleString()} ج.م`}
          change={mockStats.revenue.growth}
          changeType="positive"
          icon={DollarSign}
          color="from-green-500 to-emerald-500"
          subtitle="الشهر الحالي"
          delay={0.1}
        />
        <StatsCard
          title="إجمالي الطلبات"
          value={mockStats.orders.total.toLocaleString()}
          change={mockStats.orders.growth}
          changeType="positive"
          icon={ShoppingCart}
          color="from-blue-500 to-cyan-500"
          subtitle={`${mockStats.orders.pending} في الانتظار`}
          delay={0.2}
        />
        <StatsCard
          title="إجمالي العملاء"
          value={mockStats.customers.total.toLocaleString()}
          change={mockStats.customers.growth}
          changeType="positive"
          icon={Users}
          color="from-purple-500 to-pink-500"
          subtitle={`${mockStats.customers.new} جديد هذا الشهر`}
          delay={0.3}
        />
        <StatsCard
          title="إجمالي المنتجات"
          value={mockStats.products.total}
          change={2.4}
          changeType="positive"
          icon={Package}
          color="from-orange-500 to-red-500"
          subtitle={`${mockStats.products.lowStock} مخزون منخفض`}
          delay={0.4}
        />
      </div>

      {/* التقدم نحو الأهداف */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          التق��م نحو الأهداف الشهرية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressCard
            title="هدف الإيرادات"
            current={mockStats.revenue.total}
            target={mockStats.revenue.target}
            icon={Target}
            color="from-green-500 to-emerald-500"
          />
          <ProgressCard
            title="هدف العملاء الجدد"
            current={mockStats.customers.new}
            target={200}
            icon={UserCheck}
            color="from-blue-500 to-cyan-500"
          />
          <ProgressCard
            title="معدل الاحتفاظ"
            current={mockStats.customers.retention}
            target={80}
            icon={Heart}
            color="from-purple-500 to-pink-500"
          />
        </div>
      </motion.div>

      {/* مقاييس الأداء */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          مقاييس الأداء الرقمية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                معدل التحويل
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {mockStats.performance.conversionRate}%
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">+0.3% من الأمس</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                معدل الارتداد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {mockStats.performance.bounceRate}%
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">-1.2% من الأمس</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                متوسط وقت الجلسة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {mockStats.performance.avgSessionTime} د
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">+0.8 د من الأمس</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                مشاهدات الصفحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {mockStats.performance.pageViews.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">+5.2% من الأمس</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* الأنشطة والمنتجات */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <RecentActivity />
        <TopProducts />
      </motion.div>

      {/* تنبيهات النظام */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">تنبيهات مهمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-orange-200 bg-orange-50 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">مخزون منخفض</h3>
                  <p className="text-sm text-orange-700">
                    {mockStats.products.lowStock} منتج يحتاج إعادة تموين
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">أداء ممتاز</h3>
                  <p className="text-sm text-green-700">
                    تم تحقيق 95% من هدف الشهر
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">رسائل جديدة</h3>
                  <p className="text-sm text-blue-700">
                    8 استفسارات من العملاء ��انتظار الرد
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
