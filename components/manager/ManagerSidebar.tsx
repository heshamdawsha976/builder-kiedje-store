"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles,
  Bell,
  Heart,
  Tag,
  Truck,
  MessageSquare,
  DollarSign,
  UserCheck,
  FileText,
  Shield,
  Monitor,
  Zap,
  TrendingUp,
  Building,
  Calendar,
  Megaphone,
  Palette,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useManagerAuth, Permission } from "@/lib/manager-auth";

interface SidebarItemProps {
  icon: any;
  label: string;
  href: string;
  badge?: string | number;
  isActive?: boolean;
  requiredPermission?: Permission;
  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  badge,
  isActive,
  requiredPermission,
  onClick,
}: SidebarItemProps) => {
  const { hasPermission } = useManagerAuth();

  // إذا كانت هناك صلاحية مطلوبة ولا يملكها ��لمستخدم
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
          ${
            isActive
              ? "bg-gradient-primary text-white shadow-lg"
              : "text-gray-600 hover:bg-gray-100 hover:text-brand-600"
          }
        `}
      >
        <motion.div
          animate={{ rotate: isActive ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <span className="font-medium">{label}</span>

        {badge && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mr-auto"
          >
            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="managerActiveIndicator"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
};

export function ManagerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useManagerAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/manager/login";
  };

  const mainMenuItems = [
    {
      icon: LayoutDashboard,
      label: "لوحة التحكم",
      href: "/manager/dashboard",
      requiredPermission: "read_dashboard" as Permission,
    },
    {
      icon: BarChart3,
      label: "التحليلات المتقدمة",
      href: "/manager/analytics",
      requiredPermission: "view_analytics" as Permission,
    },
    {
      icon: TrendingUp,
      label: "التقارير المالية",
      href: "/manager/reports",
      requiredPermission: "manage_finances" as Permission,
    },
  ];

  const operationsItems = [
    {
      icon: Package,
      label: "إدارة المنتجات",
      href: "/manager/products",
      badge: "245",
      requiredPermission: "manage_products" as Permission,
    },
    {
      icon: ShoppingCart,
      label: "إدارة الطلبات",
      href: "/manager/orders",
      badge: "12",
      requiredPermission: "manage_orders" as Permission,
    },
    {
      icon: Users,
      label: "إدارة العملاء",
      href: "/manager/customers",
      requiredPermission: "manage_customers" as Permission,
    },
    {
      icon: Truck,
      label: "الشحن والتوصيل",
      href: "/manager/shipping",
      requiredPermission: "manage_orders" as Permission,
    },
    {
      icon: Tag,
      label: "الفئات والتصنيفات",
      href: "/manager/categories",
      requiredPermission: "manage_products" as Permission,
    },
  ];

  const marketingItems = [
    {
      icon: Megaphone,
      label: "الحملات التسويقية",
      href: "/manager/campaigns",
      requiredPermission: "manage_marketing" as Permission,
    },
    {
      icon: Palette,
      label: "إدارة المحتوى",
      href: "/manager/content",
      requiredPermission: "manage_content" as Permission,
    },
    {
      icon: MessageSquare,
      label: "الرسائل والتواصل",
      href: "/manager/messages",
      badge: "8",
      requiredPermission: "manage_customers" as Permission,
    },
    {
      icon: Globe,
      label: "المنصات الاجتماعية",
      href: "/manager/social",
      requiredPermission: "manage_marketing" as Permission,
    },
  ];

  const managementItems = [
    {
      icon: UserCheck,
      label: "إدارة الموظفين",
      href: "/manager/staff",
      requiredPermission: "manage_staff" as Permission,
    },
    {
      icon: DollarSign,
      label: "المالية والمحاسبة",
      href: "/manager/finance",
      requiredPermission: "manage_finances" as Permission,
    },
    {
      icon: Building,
      label: "الفروع والمواقع",
      href: "/manager/branches",
      requiredPermission: "system_settings" as Permission,
    },
    {
      icon: Calendar,
      label: "الجدولة والمواعيد",
      href: "/manager/schedule",
      requiredPermission: "manage_staff" as Permission,
    },
  ];

  const systemItems = [
    {
      icon: Settings,
      label: "إعدادات النظام",
      href: "/manager/settings",
      requiredPermission: "system_settings" as Permission,
    },
    {
      icon: Shield,
      label: "الأمان والصلاحيات",
      href: "/manager/security",
      requiredPermission: "user_management" as Permission,
    },
    {
      icon: Monitor,
      label: "مراقبة النظام",
      href: "/manager/monitoring",
      requiredPermission: "system_settings" as Permission,
    },
    {
      icon: FileText,
      label: "السجلات والتقارير",
      href: "/manager/logs",
      requiredPermission: "export_data" as Permission,
    },
  ];

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 288 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white shadow-xl border-l border-gray-200 h-screen fixed right-0 top-0 z-30 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Crown className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-display text-gradient font-bold">
                      كليدج
                    </h1>
                    <p className="text-xs text-gray-500">لوحة إدارة المدير</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-8 h-8 p-0 hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* User Info */}
        <AnimatePresence mode="wait">
          {!isCollapsed && user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-gradient-to-l from-brand-50 to-secondary-50 mx-4 my-4 rounded-xl border border-brand-200"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-white font-bold">
                    {user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {user.department}
                  </p>
                  <Badge className="bg-gradient-accent text-white text-xs px-2 py-1 mt-1">
                    <Sparkles className="w-3 h-3 ml-1" />
                    {user.role === "super_manager" ? "مدير عام" : "مدير"}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto">
          <SidebarSection title="القائمة الرئيسية">
            {mainMenuItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                requiredPermission={item.requiredPermission}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="العمليات">
            {operationsItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                badge={item.badge}
                isActive={pathname === item.href}
                requiredPermission={item.requiredPermission}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="التسويق والمحتوى">
            {marketingItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                badge={item.badge}
                isActive={pathname === item.href}
                requiredPermission={item.requiredPermission}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="الإدارة">
            {managementItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                requiredPermission={item.requiredPermission}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="النظام">
            {systemItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                requiredPermission={item.requiredPermission}
              />
            ))}
          </SidebarSection>
        </nav>

        {/* Notifications */}
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 mx-4 mb-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800 text-sm">
                  تحديثات مهمة
                </span>
              </div>
              <p className="text-xs text-blue-700 mb-3">
                هناك 15 طلب جديد يحتاج للمراجعة والموافقة
              </p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2">
                <Zap className="w-3 h-3 ml-1" />
                مراجعة الطلبات
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="font-medium">تسجيل خروج</span>}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
