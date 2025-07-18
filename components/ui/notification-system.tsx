"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X,
  Gift,
  Star,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationCard = ({
  notification,
  onRemove,
}: {
  notification: Notification;
  onRemove: (id: string) => void;
}) => {
  const [progress, setProgress] = useState(100);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "from-green-500 to-emerald-600",
    error: "from-red-500 to-rose-600",
    warning: "from-orange-500 to-amber-600",
    info: "from-kledje-500 to-kledje-600",
  };

  const bgColors = {
    success: "from-green-50 to-emerald-50",
    error: "from-red-50 to-rose-50",
    warning: "from-orange-50 to-amber-50",
    info: "from-kledje-50 to-kledje-100",
  };

  const Icon = icons[notification.type];
  const duration = notification.duration || 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / duration) * 100;
        if (newProgress <= 0) {
          onRemove(notification.id);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [notification.id, duration, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      layout
      className={`relative overflow-hidden rounded-2xl shadow-lg backdrop-blur-sm border border-white/20 max-w-md w-full`}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${bgColors[notification.type]} opacity-90`}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`w-12 h-12 bg-gradient-to-r ${colors[notification.type]} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 mb-1 text-lg">
              {notification.title}
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {notification.message}
            </p>

            {/* Action Button */}
            {notification.action && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Button
                  size="sm"
                  onClick={notification.action.onClick}
                  className={`bg-gradient-to-r ${colors[notification.type]} text-white hover:shadow-lg`}
                >
                  {notification.action.label}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(notification.id)}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-gray-600 hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
        <motion.div
          className={`h-full bg-gradient-to-r ${colors[notification.type]}`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full blur-sm" />
      <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full blur-sm" />
    </motion.div>
  );
};

export const NotificationSystem = ({
  notifications,
  onRemove,
}: NotificationSystemProps) => {
  return (
    <div className="fixed top-20 right-4 z-[100] space-y-4">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Special Kledje Notifications
export const KledjeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2);
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  // Pre-defined Kledje notifications
  const showWelcomeNotification = () => {
    addNotification({
      type: "info",
      title: "أهلا�� بك في كليدج! 💜",
      message: "اكتشفي عالم العناية الطبيعية مع منتجاتنا المميزة",
      duration: 6000,
      action: {
        label: "تسوقي الآن",
        onClick: () => {
          window.location.href = "/products";
        },
      },
    });
  };

  const showOfferNotification = () => {
    addNotification({
      type: "success",
      title: "عرض خاص! 🎁",
      message: "خصم 25% على بوكس العروسة + توصيل مجاني",
      duration: 8000,
      action: {
        label: "احصلي على العرض",
        onClick: () => {
          window.location.href = "/bride-box";
        },
      },
    });
  };

  const showCartNotification = () => {
    addNotification({
      type: "success",
      title: "تم إضافة المنتج! ✨",
      message: "تم إضافة المنتج إلى سلة التسوق بنجاح",
      duration: 4000,
      action: {
        label: "عرض السلة",
        onClick: () => {
          console.log("View cart");
        },
      },
    });
  };

  const showNewProductNotification = () => {
    addNotification({
      type: "info",
      title: "منتج جديد! 🌟",
      message: "تم إضافة كريم جديد لمجموعة العناية بالوجه",
      duration: 6000,
      action: {
        label: "اكتشفيه الآن",
        onClick: () => {
          window.location.href = "/products";
        },
      },
    });
  };

  // Auto-show welcome notification on mount
  useEffect(() => {
    const timer = setTimeout(showWelcomeNotification, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Demo Buttons - Remove in production */}
      <div className="fixed bottom-4 left-4 space-y-2 z-50">
        <Button
          size="sm"
          onClick={showOfferNotification}
          className="bg-gradient-coral text-white"
        >
          <Gift className="h-4 w-4 ml-2" />
          عرض خاص
        </Button>
        <Button
          size="sm"
          onClick={showCartNotification}
          className="bg-gradient-teal text-white"
        >
          <ShoppingBag className="h-4 w-4 ml-2" />
          إضافة للسلة
        </Button>
        <Button
          size="sm"
          onClick={showNewProductNotification}
          className="bg-gradient-kledje text-white"
        >
          <Star className="h-4 w-4 ml-2" />
          منتج جديد
        </Button>
      </div>
    </>
  );
};

export default NotificationSystem;
