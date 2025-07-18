"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Crown,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  Building,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useManagerAuth } from "@/lib/manager-auth";

// مكون الجزيئات الطائرة
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i);

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

export default function ManagerLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const { login } = useManagerAuth();
  const router = useRouter();

  // حسابات المديرين المتاحة للعرض
  const availableAccounts = [
    {
      username: "super_manager",
      password: "super123",
      role: "مدير عام",
      department: "الإدارة العليا",
      permissions: "جميع الصلاحيات",
      color: "from-purple-500 to-pink-500",
    },
    {
      username: "store_manager",
      password: "store123",
      role: "مدير المتجر",
      department: "إدارة المتجر",
      permissions: "المنتجات، الطلبات، العملاء",
      color: "from-blue-500 to-cyan-500",
    },
    {
      username: "marketing_manager",
      password: "marketing123",
      role: "مدير التسويق",
      department: "التسويق والمحتوى",
      permissions: "التسويق، المحتوى، التحليلات",
      color: "from-green-500 to-teal-500",
    },
    {
      username: "operations_manager",
      password: "ops123",
      role: "مدير العمليات",
      department: "العمليات والشحن",
      permissions: "الطلبات، الشحن، المخزون",
      color: "from-orange-500 to-red-500",
    },
    {
      username: "finance_manager",
      password: "finance123",
      role: "مدير المالية",
      department: "المالية والمحاسبة",
      permissions: "التقارير المالية، التحليلا��",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(username, password);
      if (success) {
        router.push("/manager/dashboard");
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch (error) {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (account: any) => {
    setUsername(account.username);
    setPassword(account.password);
    setSelectedRole(account.role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-primary rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-accent rounded-full opacity-5 blur-3xl" />

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass border-0 shadow-2xl">
              <CardHeader className="text-center pb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Crown className="h-10 w-10 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h1 className="text-4xl font-display text-gradient mb-2">
                    لوحة إدارة كليدج
                  </h1>
                  <p className="text-gray-600 text-lg">
                    دخول خاص للمديرين والمشرفين
                  </p>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="username"
                      className="text-gray-700 font-medium"
                    >
                      اسم المستخدم
                    </Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ادخل اسم المستخدم"
                        className="pr-10 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        required
                        dir="rtl"
                      />
                    </div>
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium"
                    >
                      كلمة المرور
                    </Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="ادخل كلمة المرور"
                        className="pr-10 pl-10 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        required
                        dir="rtl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Selected Role Display */}
                  {selectedRole && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-xl"
                    >
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          تم اختيار: {selectedRole}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Login Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-primary hover:shadow-2xl text-white py-3 text-lg rounded-xl font-medium"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          جاري تسجيل الدخول...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          دخول إلى لوحة الإدارة
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Security Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center p-4 bg-amber-50 border border-amber-200 rounded-xl"
                >
                  <div className="flex items-center justify-center gap-2 text-amber-700 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">تنبيه أمني</span>
                  </div>
                  <p className="text-xs text-amber-600">
                    هذه المنطقة مخصصة للمديرين والمشرفين فقط. جميع عمليات الدخول
                    يتم تسجيلها ومراقبتها لأغراض الأ��ان.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demo Accounts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Badge className="bg-gradient-accent text-white px-4 py-2 text-lg mb-4">
                  <Sparkles className="w-4 h-4 ml-2" />
                  حسابات تجريبية
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  اختر نوع المدير
                </h2>
                <p className="text-gray-600 text-lg">
                  انقر على أي بطاقة لملء البيانات تلقائياً
                </p>
              </motion.div>
            </div>

            <div className="grid gap-4">
              {availableAccounts.map((account, index) => (
                <motion.div
                  key={account.username}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickLogin(account)}
                  className={`p-4 glass border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedRole === account.role
                      ? "ring-2 ring-brand-500 bg-brand-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${account.color} rounded-xl flex items-center justify-center`}
                    >
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {account.role}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {account.department}
                      </p>
                      <p className="text-xs text-gray-500">
                        {account.permissions}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-mono text-gray-600">
                        {account.username}
                      </p>
                      <p className="text-xs text-gray-500">
                        {account.password}
                      </p>
                    </div>
                    {selectedRole === account.role && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
                <h3 className="font-bold text-blue-900">مميزات النظام</h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  لوحة تحكم متقدمة مع تحليلات مفصلة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  نظام صلاحيات متطور حسب الدور
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  تقارير مالية وتجارية شاملة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  إدارة متكاملة للمنتجات والطلبات
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
