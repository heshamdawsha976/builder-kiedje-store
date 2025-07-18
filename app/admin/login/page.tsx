"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Crown,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "@/lib/admin-auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Floating particles for background
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 bg-gradient-primary rounded-full opacity-20"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading, isAuthenticated } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("يرجى إدخال اسم المستخدم وكلمة المرور");
      return;
    }

    const success = await login(username, password);

    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center">
      <FloatingParticles />

      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-primary rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-accent rounded-full opacity-10 blur-3xl" />

      <div className="w-full max-w-md mx-auto p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="glass-strong rounded-3xl p-8 shadow-2xl border border-white/30"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-lg"
            >
              <Shield className="h-10 w-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-display text-gradient mb-2"
            >
              لوحة تحكم كليدج
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mb-6"
            >
              تسجيل دخول المديرين
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Badge className="bg-gradient-secondary text-white px-4 py-2 border-0">
                <Crown className="w-4 h-4 ml-2" />
                منطقة محظورة
              </Badge>
            </motion.div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="username" className="text-gray-700 font-medium">
                اسم المستخدم
              </Label>
              <div className="relative mt-2">
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-400 transition-colors text-right bg-white/70 backdrop-blur-sm"
                  placeholder="admin"
                  dir="ltr"
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Label htmlFor="password" className="text-gray-700 font-medium">
                كلمة المرور
              </Label>
              <div className="relative mt-2">
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-400 transition-colors text-right bg-white/70 backdrop-blur-sm"
                  placeholder="••••••••"
                  dir="ltr"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700"
              >
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:shadow-xl text-white py-3 text-lg rounded-xl border-0 hover-glow transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <LoadingSpinner size="sm" />
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5" />
                    دخول لوحة التحكم
                  </div>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200"
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
              بيانات تجريبية:
            </h3>
            <div className="space-y-2 text-xs text-gray-600 text-center">
              <div className="flex justify-between items-center">
                <span>admin123</span>
                <span>:</span>
                <span>admin</span>
              </div>
              <div className="flex justify-between items-center">
                <span>manager123</span>
                <span>:</span>
                <span>manager</span>
              </div>
            </div>
          </motion.div>

          {/* Back to Store */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-6"
          >
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-brand-600 transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              العودة للمتجر
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
