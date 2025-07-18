"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Store,
  Globe,
  Mail,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Users,
  Package,
  Palette,
  Database,
  Monitor,
  Smartphone,
  Lock,
  Key,
  Download,
  Upload,
  RefreshCw,
  Save,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Camera,
  FileText,
  Calculator,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  Percent,
  Target,
  ToggleLeft,
  ToggleRight,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// مكون إعداد مع مفتاح تشغيل
const SettingToggle = ({
  title,
  description,
  enabled,
  onToggle,
  icon: Icon,
}) => {
  return (
    <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
};

// مكون إعداد نصي
const SettingField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  description,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
        dir="rtl"
      />
    </div>
  );
};

export default function ManagerSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // إعدادات عامة
    storeName: "كليدج للعناية بالبشرة",
    storeDescription: "متجر العناية بالبشرة الطبيعية الأول في مصر",
    storeEmail: "info@kledje.com",
    storePhone: "+20 100 123 4567",
    storeAddress: "القاهرة، مصر",
    currency: "EGP",
    timezone: "Africa/Cairo",
    language: "ar",

    // إعدادات التنبيهات
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockAlerts: true,
    customerRegistration: true,
    reviewNotifications: true,

    // إعدادات الأمان
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordRequirements: true,

    // إعدادات الدفع
    cashOnDelivery: true,
    onlinePayment: false,
    bankTransfer: true,
    minimumOrder: 50,
    shippingFee: 25,
    freeShippingThreshold: 300,

    // إعدادات الشحن
    deliveryDays: "1-3",
    expressDelivery: true,
    trackingEnabled: true,

    // إعدادات التصميم
    primaryColor: "#e91e63",
    secondaryColor: "#9c27b0",
    logoUrl: "",
    faviconUrl: "",

    // إعدادات النظام
    maintenanceMode: false,
    cachingEnabled: true,
    analyticsEnabled: true,
    backupFrequency: "daily",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // محاكاة حفظ الإعدادات
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
    // عرض رسالة نجاح
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900">إعدادات النظام</h1>
          <p className="text-xl text-gray-600 mt-2">
            إدارة وتخصيص إعدادات المتجر والنظام
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-primary hover:shadow-xl"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* التبويبات */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 lg:w-fit">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              عام
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              التنبيهات
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              الأمان
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              الدفع
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              الشحن
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              النظام
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* معلومات المتجر الأساسية */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    معلومات المتجر
                  </CardTitle>
                  <CardDescription>
                    الإعدادات الأساسية للمتجر وبيانات الاتصال
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingField
                    label="اسم المتجر"
                    value={settings.storeName}
                    onChange={(value) => updateSetting("storeName", value)}
                    placeholder="ادخل اسم المتجر"
                  />

                  <div className="space-y-2">
                    <Label>وصف المتجر</Label>
                    <Textarea
                      value={settings.storeDescription}
                      onChange={(e) =>
                        updateSetting("storeDescription", e.target.value)
                      }
                      placeholder="ادخل وصف مختصر للمتجر"
                      className="min-h-20"
                      dir="rtl"
                    />
                  </div>

                  <SettingField
                    label="بريد إلكتروني"
                    value={settings.storeEmail}
                    onChange={(value) => updateSetting("storeEmail", value)}
                    placeholder="info@store.com"
                    type="email"
                  />

                  <SettingField
                    label="رقم الهاتف"
                    value={settings.storePhone}
                    onChange={(value) => updateSetting("storePhone", value)}
                    placeholder="+20 100 123 4567"
                    type="tel"
                  />

                  <SettingField
                    label="العنوان"
                    value={settings.storeAddress}
                    onChange={(value) => updateSetting("storeAddress", value)}
                    placeholder="ادخل عنوان المتجر"
                  />
                </CardContent>
              </Card>

              {/* الإعدادات الإقليمية */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    الإعدادات الإقليمية
                  </CardTitle>
                  <CardDescription>
                    اللغة والعملة والمنطقة الزمنية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>العملة</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) =>
                        updateSetting("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EGP">جنيه مصري (ج.م)</SelectItem>
                        <SelectItem value="USD">دولار أمريكي ($)</SelectItem>
                        <SelectItem value="EUR">يورو (€)</SelectItem>
                        <SelectItem value="SAR">ريال سعودي (ر.س)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>المنطقة الزمنية</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) =>
                        updateSetting("timezone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Cairo">
                          القاهرة (GMT+2)
                        </SelectItem>
                        <SelectItem value="Asia/Riyadh">
                          الرياض (GMT+3)
                        </SelectItem>
                        <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                        <SelectItem value="UTC">
                          التوقيت العالمي (UTC)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>اللغة الافتراضية</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        updateSetting("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">الإنجليزية</SelectItem>
                        <SelectItem value="fr">الفرنسية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* رفع الشعار */}
                  <div className="space-y-2">
                    <Label>شعار المتجر</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 rounded-lg">
                        <AvatarImage src={settings.logoUrl} />
                        <AvatarFallback className="bg-gradient-primary text-white rounded-lg">
                          <Camera className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 ml-2" />
                          رفع شعار ��ديد
                        </Button>
                        <p className="text-xs text-gray-500">
                          PNG, JPG حتى 2MB - الحجم المثالي 200x200 بكسل
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  إعدادات التنبيهات
                </CardTitle>
                <CardDescription>
                  تخصيص أنواع التنبيهات وطرق الإرسال
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <SettingToggle
                    title="التنبيهات عبر البريد الإلكتروني"
                    description="استقبال التنبيهات المهمة عبر البريد الإلكتروني"
                    enabled={settings.emailNotifications}
                    onToggle={(value) =>
                      updateSetting("emailNotifications", value)
                    }
                    icon={Mail}
                  />

                  <SettingToggle
                    title="التنبيهات عبر الرسائل النصية"
                    description="استقبال التنبيهات العاجلة عبر SMS"
                    enabled={settings.smsNotifications}
                    onToggle={(value) =>
                      updateSetting("smsNotifications", value)
                    }
                    icon={Smartphone}
                  />

                  <SettingToggle
                    title="تنبيهات الطلبات الجديدة"
                    description="إشعار فوري عند وصول طلبات جديدة"
                    enabled={settings.orderNotifications}
                    onToggle={(value) =>
                      updateSetting("orderNotifications", value)
                    }
                    icon={Package}
                  />

                  <SettingToggle
                    title="تنبيهات المخزون المنخفض"
                    description="إشعار عندما ينخفض مخزون المنتجات"
                    enabled={settings.lowStockAlerts}
                    onToggle={(value) => updateSetting("lowStockAlerts", value)}
                    icon={AlertCircle}
                  />

                  <SettingToggle
                    title="تنبيهات تسجيل العملاء"
                    description="إشعار عند انضمام عملاء جدد"
                    enabled={settings.customerRegistration}
                    onToggle={(value) =>
                      updateSetting("customerRegistration", value)
                    }
                    icon={Users}
                  />

                  <SettingToggle
                    title="تنبيهات التقييمات"
                    description="إشعار عند استلام تقييمات جديدة"
                    enabled={settings.reviewNotifications}
                    onToggle={(value) =>
                      updateSetting("reviewNotifications", value)
                    }
                    icon={CheckCircle}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    إعدادات الأمان
                  </CardTitle>
                  <CardDescription>
                    تأمين الحسابات والوصول إلى النظام
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingToggle
                    title="المصادقة الثنائية"
                    description="طبقة حماية إضافية لحسابات المديرين"
                    enabled={settings.twoFactorAuth}
                    onToggle={(value) => updateSetting("twoFactorAuth", value)}
                    icon={Key}
                  />

                  <SettingToggle
                    title="تنبيهات تسجيل الدخول"
                    description="إشعار عند تسجيل دخول من جهاز جديد"
                    enabled={settings.loginAlerts}
                    onToggle={(value) => updateSetting("loginAlerts", value)}
                    icon={Lock}
                  />

                  <SettingToggle
                    title="متطلبات كلمة المرور القوية"
                    description="فرض استخدام كلمات مرور معقدة"
                    enabled={settings.passwordRequirements}
                    onToggle={(value) =>
                      updateSetting("passwordRequirements", value)
                    }
                    icon={Shield}
                  />

                  <SettingField
                    label="مهلة انتهاء الجلسة (دقيقة)"
                    value={settings.sessionTimeout.toString()}
                    onChange={(value) =>
                      updateSetting("sessionTimeout", parseInt(value) || 30)
                    }
                    placeholder="30"
                    type="number"
                    description="تسجيل خروج تلقائي بعد فترة عدم النشاط"
                  />
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    النسخ الاحتياطي
                  </CardTitle>
                  <CardDescription>
                    إعدادات النسخ الاحتياطي للبيانات
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>تكرار النسخ الاحتياطي</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) =>
                        updateSetting("backupFrequency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">كل ساعة</SelectItem>
                        <SelectItem value="daily">يومياً</SelectItem>
                        <SelectItem value="weekly">أسبوعياً</SelectItem>
                        <SelectItem value="monthly">شهرياً</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">
                      إجراءات النسخ الاحتياطي
                    </h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Download className="w-4 h-4 ml-2" />
                        تحميل نسخة احتياطية فورية
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Upload className="w-4 h-4 ml-2" />
                        استعادة من نسخة احتياطية
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium">آخر نسخة احتياطية</p>
                        <p>اليوم في 3:00 صباحاً</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    طرق الدفع
                  </CardTitle>
                  <CardDescription>
                    إعداد وتفعيل طرق الدفع المختلفة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingToggle
                    title="الدفع عند التسليم"
                    description="السماح بالدفع النقدي عند استلام الطلب"
                    enabled={settings.cashOnDelivery}
                    onToggle={(value) => updateSetting("cashOnDelivery", value)}
                    icon={DollarSign}
                  />

                  <SettingToggle
                    title="الدفع الإلكتروني"
                    description="الدفع بالبطاقات الائتمانية والمحافظ الرقمية"
                    enabled={settings.onlinePayment}
                    onToggle={(value) => updateSetting("onlinePayment", value)}
                    icon={CreditCard}
                  />

                  <SettingToggle
                    title="التحويل البنكي"
                    description="السماح بالدفع عبر التحويل البنكي"
                    enabled={settings.bankTransfer}
                    onToggle={(value) => updateSetting("bankTransfer", value)}
                    icon={FileText}
                  />
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    إعدادات الأسعار
                  </CardTitle>
                  <CardDescription>
                    الحد الأدنى للطلب ورسوم الشحن
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingField
                    label="الحد الأدنى للطلب (ج.م)"
                    value={settings.minimumOrder.toString()}
                    onChange={(value) =>
                      updateSetting("minimumOrder", parseInt(value) || 0)
                    }
                    placeholder="50"
                    type="number"
                  />

                  <SettingField
                    label="رسوم الشحن (ج.م)"
                    value={settings.shippingFee.toString()}
                    onChange={(value) =>
                      updateSetting("shippingFee", parseInt(value) || 0)
                    }
                    placeholder="25"
                    type="number"
                  />

                  <SettingField
                    label="قيمة الشحن المجاني (ج.م)"
                    value={settings.freeShippingThreshold.toString()}
                    onChange={(value) =>
                      updateSetting(
                        "freeShippingThreshold",
                        parseInt(value) || 0,
                      )
                    }
                    placeholder="300"
                    type="number"
                    description="الحد الأدنى للحصول على شحن مجاني"
                  />

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div className="text-sm text-green-800">
                        <p className="font-medium">ملخص إعدادات الأسعار</p>
                        <p>
                          حد أدنى: {settings.minimumOrder} ج.م | شحن:{" "}
                          {settings.shippingFee} ج.م | شحن مجاني:{" "}
                          {settings.freeShippingThreshold} ج.م
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6 mt-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  إعدادات الشحن والتوصيل
                </CardTitle>
                <CardDescription>
                  تخصيص خيارات الشحن وأوقات التسليم
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SettingField
                    label="مدة التوص��ل (أيام)"
                    value={settings.deliveryDays}
                    onChange={(value) => updateSetting("deliveryDays", value)}
                    placeholder="1-3"
                    description="المدة المتوقعة للتوصيل"
                  />

                  <div className="space-y-4">
                    <SettingToggle
                      title="التوصيل السريع"
                      description="إتاحة خيار التوصيل خلال 24 ساعة"
                      enabled={settings.expressDelivery}
                      onToggle={(value) =>
                        updateSetting("expressDelivery", value)
                      }
                      icon={Clock}
                    />

                    <SettingToggle
                      title="تتبع الشحنات"
                      description="تمكين نظام تتبع الطلبات للعملاء"
                      enabled={settings.trackingEnabled}
                      onToggle={(value) =>
                        updateSetting("trackingEnabled", value)
                      }
                      icon={MapPin}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    المناطق المشمولة بالتوصيل
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { area: "القاهرة الكبرى", fee: 25, time: "1-2 أيام" },
                      { area: "الإسكندرية", fee: 35, time: "2-3 أيام" },
                      { area: "المحافظات", fee: 45, time: "3-5 أيام" },
                      { area: "الصعيد", fee: 55, time: "4-6 أيام" },
                    ].map((zone, index) => (
                      <div
                        key={zone.area}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">
                            {zone.area}
                          </h5>
                          <Badge variant="outline">{zone.fee} ج.م</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{zone.time}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 ml-1" />
                            تعديل
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3 ml-1" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="dashed"
                      className="p-4 h-auto border-dashed"
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة منطقة جديدة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    إعدادات النظام
                  </CardTitle>
                  <CardDescription>الصيانة والأداء والتحليلات</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingToggle
                    title="وضع الصيانة"
                    description="إيقاف المتجر مؤقتاً لإجراء الصيانة"
                    enabled={settings.maintenanceMode}
                    onToggle={(value) =>
                      updateSetting("maintenanceMode", value)
                    }
                    icon={AlertCircle}
                  />

                  <SettingToggle
                    title="التخزين المؤقت"
                    description="تسريع الموقع عبر حفظ البيانات مؤقتاً"
                    enabled={settings.cachingEnabled}
                    onToggle={(value) => updateSetting("cachingEnabled", value)}
                    icon={RefreshCw}
                  />

                  <SettingToggle
                    title="تتبع التحليلات"
                    description="جمع إحصائيات الزوار والأداء"
                    enabled={settings.analyticsEnabled}
                    onToggle={(value) =>
                      updateSetting("analyticsEnabled", value)
                    }
                    icon={Target}
                  />
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    معلومات النظام
                  </CardTitle>
                  <CardDescription>تفاصيل النسخة والدعم التقني</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">نسخة النظام</span>
                      <span className="text-sm font-medium">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">آخر تحديث</span>
                      <span className="text-sm font-medium">
                        15 نوفمبر 2024
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        قاعدة البيانات
                      </span>
                      <span className="text-sm font-medium">MySQL 8.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        مساحة التخزين
                      </span>
                      <span className="text-sm font-medium">
                        2.4 GB / 10 GB
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="w-4 h-4 ml-2" />
                      مركز المساعدة
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 ml-2" />
                      التوثيق التقني
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 ml-2" />
                      التواصل مع الدعم
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
