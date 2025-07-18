"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Globe,
  HelpCircle,
  MoreVertical,
  LogOut,
  UserCog,
  Shield,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  TrendingUp,
  Zap,
  Calendar,
  MessageSquare,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useManagerAuth, getRoleDisplayName } from "@/lib/manager-auth";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  action?: {
    label: string;
    href: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "طلبات معلقة",
    message: "يوجد 12 طلب جديد يحتاج للمراجعة",
    time: "منذ 5 دقائق",
    read: false,
    icon: ShoppingCart,
    action: { label: "عرض الطلبات", href: "/manager/orders" },
  },
  {
    id: "2",
    type: "info",
    title: "تحديث المخزون",
    message: "تم إضافة 25 منتج جديد للمخزون",
    time: "منذ 15 دقيقة",
    read: false,
    icon: Package,
  },
  {
    id: "3",
    type: "success",
    title: "زيادة في المبيعات",
    message: "المبيعات اليوم أعلى بـ 18% من الأمس",
    time: "منذ ساعة",
    read: true,
    icon: TrendingUp,
  },
  {
    id: "4",
    type: "error",
    title: "مشكلة في النظام",
    message: "خطأ في معالجة الدفع للطلب #12345",
    time: "منذ ساعتين",
    read: false,
    icon: AlertCircle,
    action: { label: "إصلاح المشكلة", href: "/manager/orders/12345" },
  },
  {
    id: "5",
    type: "info",
    title: "رسالة عميل",
    message: "استفسار جديد من العميلة فاطمة أحمد",
    time: "منذ 3 ساعات",
    read: true,
    icon: MessageSquare,
    action: { label: "عرض الرسالة", href: "/manager/messages" },
  },
];

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  const colors = {
    info: "text-blue-500",
    warning: "text-orange-500",
    success: "text-green-500",
    error: "text-red-500",
  };

  const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
    error: AlertCircle,
  };

  const Icon = icons[type];
  return <Icon className={`h-4 w-4 ${colors[type]}`} />;
};

export function ManagerHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useManagerAuth();

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    window.location.href = "/manager/login";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // TODO: تنفيذ البحث
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="بحث في النظام... (منتجات، طلبات، عملاء)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-4 py-2 w-full border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              dir="rtl"
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* System Status */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg"
          >
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">النظام يعمل بشكل طبيعي</span>
          </motion.div>

          {/* Current Time */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              {new Date().toLocaleString("ar-EG", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Notifications */}
          <Popover
            open={isNotificationsOpen}
            onOpenChange={setIsNotificationsOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gray-100 rounded-xl"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 ml-4" align="end" side="bottom">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">الإشعارات</h3>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800"
                  >
                    {unreadCount} جديد
                  </Badge>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          notification.type === "info"
                            ? "bg-blue-100"
                            : notification.type === "warning"
                              ? "bg-orange-100"
                              : notification.type === "success"
                                ? "bg-green-100"
                                : "bg-red-100"
                        }`}
                      >
                        <notification.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </h4>
                          <NotificationIcon type={notification.type} />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {notification.action && (
                            <Button
                              size="sm"
                              variant="link"
                              className="h-auto p-0 text-brand-600 hover:text-brand-700"
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-gray-600 hover:text-gray-900"
                >
                  عرض جميع الإشعارات
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <Zap className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>إجراءات سريعة</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Package className="h-4 w-4 ml-2" />
                إضافة منتج جديد
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart className="h-4 w-4 ml-2" />
                إنشاء طلب جديد
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 ml-2" />
                جدولة مهمة
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 ml-2" />
                إرسال رسالة
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-xl"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-xl"
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl"
              >
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.fullName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.role && getRoleDisplayName(user.role)}
                  </div>
                </div>
                <Avatar className="w-8 h-8 border-2 border-brand-200">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-white text-sm">
                    {user?.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-brand-200">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {user?.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">
                      {user?.fullName}
                    </div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                    <Badge className="bg-gradient-accent text-white text-xs px-2 py-1 mt-1">
                      {user?.role && getRoleDisplayName(user.role)}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 ml-2" />
                الملف الشخصي
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCog className="h-4 w-4 ml-2" />
                إعدادات الحساب
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="h-4 w-4 ml-2" />
                الأمان والخصوصية
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Moon className="h-4 w-4 ml-2" />
                الوضع الليلي
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe className="h-4 w-4 ml-2" />
                تغيير اللغة
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
