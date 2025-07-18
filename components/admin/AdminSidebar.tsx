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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "@/lib/admin-auth";

interface SidebarItemProps {
  icon: any;
  label: string;
  href: string;
  badge?: string | number;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  badge,
  isActive,
  onClick,
}: SidebarItemProps) => {
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
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "لوحة التحكم",
      href: "/admin/dashboard",
    },
    {
      icon: Package,
      label: "المنتجات",
      href: "/admin/products",
      badge: "12",
    },
    {
      icon: ShoppingCart,
      label: "الطلبات",
      href: "/admin/orders",
      badge: "5",
    },
    {
      icon: Users,
      label: "العملاء",
      href: "/admin/customers",
    },
    {
      icon: Tag,
      label: "الفئات",
      href: "/admin/categories",
    },
    {
      icon: Truck,
      label: "الشحن",
      href: "/admin/shipping",
    },
    {
      icon: MessageSquare,
      label: "الرسائل",
      href: "/admin/messages",
      badge: "3",
    },
    {
      icon: BarChart3,
      label: "التقارير",
      href: "/admin/analytics",
    },
    {
      icon: Settings,
      label: "الإعدادات",
      href: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/admin/login";
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
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
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-display text-gradient">
                      كليدج
                    </h1>
                    <p className="text-xs text-gray-500">لوحة التحكم</p>
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
              className="p-4 bg-gradient-to-l from-brand-50 to-secondary-50 mx-4 my-4 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <Badge className="bg-gradient-accent text-white text-xs px-2 py-1 mt-1">
                    {user.role === "super_admin" ? "مدير عام" : "مدير"}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              badge={item.badge}
              isActive={pathname === item.href}
            />
          ))}
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
                  إشعارات هامة
                </span>
              </div>
              <p className="text-xs text-blue-700">
                لديك 3 طلبات جديدة في انتظار المراجعة
              </p>
              <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2">
                عرض الطلبات
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
