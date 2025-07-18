"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Maximize,
  Menu,
  ExternalLink,
  Crown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "@/lib/admin-auth";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAdminAuth();

  const notifications = [
    { id: 1, message: "طلب جديد من سارة محمد", time: "منذ 5 دقائق" },
    { id: 2, message: "تم إضافة منتج جديد", time: "منذ 10 دقائق" },
    { id: 3, message: "مراجعة عميل جديدة", time: "منذ 15 دقيقة" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-20"
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Title & Breadcrumb */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="lg:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {title || "لوحة التحكم"}
            </h1>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <motion.div
              animate={{ width: isSearchOpen ? 300 : 40 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="البحث في لوحة التحكم..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 focus:border-brand-400 text-right"
                    autoFocus
                    dir="rtl"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-10 h-10 rounded-xl hover:bg-gray-100"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-xl hover:bg-gray-100"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-xl hover:bg-gray-100"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Notifications */}
          <div className="relative">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-xl hover:bg-gray-100 relative"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -left-1 w-5 h-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {notifications.length}
                </Badge>
              </Button>
            </motion.div>

            {/* Notification Dropdown (يمكن تطويره لاحقاً) */}
          </div>

          {/* View Store Link */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-brand-200 text-brand-600 hover:bg-brand-50"
            >
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 ml-1" />
                عرض المتجر
              </a>
            </Button>
          </motion.div>

          {/* User Profile */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user?.username}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.role === "super_admin" ? "مدير عام" : "مدير"}
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center relative">
                <span className="text-white font-bold">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
                {user?.role === "super_admin" && (
                  <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 flex items-center gap-6 text-sm text-gray-600"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>النظام يعمل بشكل طبيعي</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-500" />
          <span>آخر تحديث: منذ دقيقتين</span>
        </div>
        <div className="mr-auto text-brand-600 font-medium">
          مرحباً بك في لوحة تحكم كليدج
        </div>
      </motion.div>
    </motion.header>
  );
}
