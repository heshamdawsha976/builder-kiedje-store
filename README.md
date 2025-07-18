# 🛍️ **كليدج - Kledje Store**

> متجر العناية بالبشرة الطبيعية الأول في مصر  
> Natural Skincare E-commerce Store

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://typescript.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Strapi](https://img.shields.io/badge/Strapi-4.0-4945FF?logo=strapi)](https://strapi.io/)

## 📋 **نظرة عامة**

**كليدج** هو متجر إلكتروني متطور للعناية بالبشرة الطبيعية مصمم خصيصاً للمرأة العربية. يتميز المشروع بتصميم عصري يدعم اللغة العربية با��كامل مع RTL layout وتجربة مستخدم استثنائية.

### 🎯 **المميزات الرئيسية**

- 🌍 **دعم كامل للعربية** مع RTL layout
- 🎨 **تصميم Glass Morphism** عصري ومتطور
- ⚡ **أداء عالي** مع Next.js 15 و React 19
- 📱 **تجاوب كامل** لجميع الأجهزة
- 🔐 **نظام مصادقة متقدم** مع أدوار متعددة
- 📊 **لوحات تحكم متعددة** للإدارة والمديرين
- 🛒 **نظام تسوق متكامل** مع سلة المشتريات
- 💳 **دعم الدفع المحلي** (COD + Fawry)
- 📈 **تحليلات متقدمة** وتقارير مفصلة

---

## 🏗️ **البنية التقنية**

### **Frontend**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **UI Components**: ShadCN/UI + Radix UI
- **Animations**: Framer Motion 12.6
- **State Management**: Zustand 5.0
- **Forms**: React Hook Form
- **Icons**: Lucide React

### **Backend**

- **CMS**: Strapi 4.x (Headless CMS)
- **Database**: PostgreSQL
- **File Storage**: Cloudinary
- **API**: RESTful + GraphQL support
- **Authentication**: NextAuth.js

### **Developer Experience**

- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Type Safety**: Strict TypeScript
- **Testing**: Jest + Testing Library
- **Performance**: Bundle Analyzer
- **Deployment**: Vercel Ready

---

## 🚀 **التثبيت والإعداد**

### **متطلبات النظام**

- Node.js 18.17.0+
- npm 9.0.0+
- PostgreSQL 13+ (للبيانات)

### **الخطوات**

1. **استنساخ المشروع**

```bash
git clone https://github.com/your-username/kledje-store.git
cd kledje-store
```

2. **تثبيت التبعيات**

```bash
npm install
```

3. **إعداد متغيرات البيئة**

```bash
cp .env.example .env.local
```

4. **إعداد Strapi Backend**

```bash
# في terminal منفصل
npx create-strapi-app@latest kledje-backend --typescript
cd kledje-backend
npm run develop
```

5. **تشغيل التطبيق**

```bash
npm run dev
```

6. **الوصول للتطبيق**

- Frontend: `http://localhost:3000`
- Strapi Admin: `http://localhost:1337/admin`

---

## 📁 **هيكل المشروع**

```
kledje-store/
├── app/                     # Next.js App Router
│   ├── (store)/            # المتجر العام
│   │   ├── page.tsx        # الصفحة الرئيسية
│   │   ├── products/       # صفحات المنتجات
│   │   └── checkout/       # صفحة الدفع
│   ├── admin/              # لوحة إدارة الأدمن
│   ├── manager/            # لوحة إدارة المدير
│   ├── api/                # API Routes
│   ├── globals.css         # CSS رئيسي
│   └── layout.tsx          # Layout عام
├── components/             # مكونات React
│   ├── ui/                # مكونات أساسية
│   ├── features/          # مكونات المميزات
│   ├── forms/             # نماذج
│   └── layout/            # مكونات التخطيط
├── lib/                   # مكتبات مساعدة
│   ├── api/              # API clients
│   ├── auth/             # نظام المصادقة
│   ├── types/            # أنواع TypeScript
│   └── utils/            # وظائف مساعدة
├── hooks/                # React Hooks مخصصة
├── store/               # Zustand stores
└── kledje-backend/      # Strapi Backend
```

---

## 🔐 **نظام المصادقة والأدوار**

### **الأدوار المتاحة**

| الدور           | الصلاحيات      | الوصول             |
| --------------- | -------------- | ------------------ |
| **Super Admin** | جميع الصلاحيات | `/manager/*`       |
| **Manager**     | إدارة شاملة    | `/manager/*`       |
| **Admin**       | إدارة محدودة   | `/admin/*`         |
| **Staff**       | عرض فقط        | `/admin/*` (محدود) |
| **Customer**    | تسوق عادي      | `/profile/*`       |

### **حسابات تجريبية**

```javascript
// Super Admin
Email: admin@kledje.com
Password: admin123

// Manager
Email: manager@kledje.com
Password: manager123

// Admin
Email: support@kledje.com
Password: support123

// Customer
Email: customer@example.com
Password: customer123
```

---

## 🎨 **نظام التصميم**

### **الألوان الأساسية**

```css
/* Primary Brand Colors */
--brand-500: hsl(315 70% 62%) /* وردي فاخر */ --brand-600: hsl(315 65% 52%)
  /* Secondary Colors */ --secondary-500: hsl(270 70% 58%) /* بنفسجي أنيق */
  /* Accent Colors */ --accent-500: hsl(45 80% 58%) /* ذهبي لامع */;
```

### **الخطوط العربية**

- **العرض**: Cairo, Tajawal
- **النص**: IBM Plex Sans Arabic
- **الزخرفة**: Amiri

### **التأثيرات البصرية**

- **Glass Morphism**: تأثيرات زجاجية شفافة
- **Gradients**: تدرجات لونية ��تطورة
- **Animations**: رسوم متحركة ناعمة
- **Micro-interactions**: تفاعلات دقيقة

---

## 📊 **الميزات المتقدمة**

### **1. لوحة التحكم الرئيسية**

- إحصائيات مباشرة للإيرادات والطلبات
- رسوم بيانية تفاعلية
- تنبيهات ذكية
- أنشطة حديثة

### **2. إدارة المنتجات**

- CRUD كامل للمنتجات
- رفع صور متعددة
- إدارة المخزون
- فئات وعلامات
- SEO optimization

### **3. إدارة الطلبات**

- تتبع حالة الطلبات
- إدارة الشحن
- معالجة المدفوعات
- إرسال إشعارات

### **4. إدارة العملاء**

- ملفات شخصية مفصلة
- سجل المشتريات
- نظام الولاء
- تقسيم العملاء

### **5. التحليلات المتقدمة**

- تقارير مالية
- تحليل سلوك العملاء
- أداء المنتجات
- مقاييس التحويل

---

## 🛒 **نظام التسوق**

### **سلة المشتريات**

- إضافة/حذف منتجات
- تحديث الكميات
- حساب الإجمالي
- حفظ للجلسات القادمة

### **عملية الدفع**

- نماذج متدرجة
- اختيار العنوان
- طرق دفع متعددة
- تأكيد الطلب

### **طرق الدفع المدعومة**

- 💵 **الدفع عند التسليم** (COD)
- 🏦 **التحويل البنكي**
- 📱 **Fawry** (قادم قريباً)
- 💳 **البطاقات الائتمانية** (قادم قريباً)

---

## 📱 **الاستجابة والأداء**

### **نقاط التوقف**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1440px

### **تحسينات الأداء**

- **Image Optimization**: Next.js Image
- **Code Splitting**: Route-based
- **Bundle Analysis**: Webpack Bundle Analyzer
- **Caching**: API Response caching
- **Lazy Loading**: Components & Images

### **SEO والوصولية**

- **Meta Tags**: Dynamic per page
- **Open Graph**: Social sharing
- **Schema Markup**: Rich snippets
- **ARIA Labels**: Accessibility
- **RTL Support**: Full Arabic support

---

## 🧪 **الاختبار والجودة**

### **اختبارات مضمنة**

```bash
# تشغيل الاختبارات
npm test

# اختبارات مع المراقبة
npm run test:watch

# تحليل التغطية
npm run test:coverage
```

### **فحص الكود**

```bash
# ESLint
npm run lint
npm run lint:fix

# Prettier
npm run format
npm run format:fix

# TypeScript
npm run type-check
```

---

## 🚀 **النشر والإنتاج**

### **البناء للإنتاج**

```bash
# بناء المشروع
npm run build

# تشغيل الإنتاج محلياً
npm start

# تحليل Bundle
npm run analyze
```

### **النشر على Vercel**

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel --prod
```

### **متغيرات البيئة للإنتاج**

```env
NODE_ENV=production
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-backend.com
NEXT_PUBLIC_STRAPI_API_TOKEN=your_production_token
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com
```

---

## 🔧 **النصائح والاستكشاف**

### **مشاكل شائعة**

1. **خطأ في الخطوط العربية**

```css
/* إضافة إلى globals.css */
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap");
```

2. **مشكلة في RTL Layout**

```tsx
// إضافة dir="rtl" للعنصر الجذر
<html lang="ar" dir="rtl">
```

3. **تعارض في التصميم**

```bash
# مسح cache
rm -rf .next
npm run dev
```

### **تحسين الأداء**

```bash
# تحليل Bundle
npm run analyze

# فحص lighthouse
npx lighthouse http://localhost:3000 --view

# قياس Core Web Vitals
npm run measure-performance
```

---

## 🤝 **المساهمة**

### **إرشادات المساهمة**

1. Fork المشروع
2. إنشاء branch للميزة الجديدة
3. Commit التغييرات
4. Push للـ branch
5. إنشاء Pull Request

### **معايير الكود**

- اتباع ESLint rules
- كتابة TypeScript صحيح
- إضافة اختبارات للميزات الجديدة
- توثيق التغييرات الكبيرة

---

## 📞 **الدعم والتواصل**

- **البريد الإلكتروني**: support@kledje.com
- **الموقع**: [kledje.com](https://kledje.com)
- **التوثيق**: [docs.kledje.com](https://docs.kledje.com)

---

## 📄 **الرخصة**

هذا المشروع محمي بموجب رخصة MIT. راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

## 🙏 **شكر وتقدير**

- **Next.js Team** لإطار العمل الرائع
- **Vercel** لخدمة الاستضافة
- **Tailwind CSS** لنظام التصميم
- **Strapi** لنظام إدارة المحتوى
- **المجتمع العربي** للدعم والمساهمات

---

<div align="center">

**صُنع بـ ❤️ في مصر**

[⬆ العودة للأعلى](#️-كليدج---kledje-store)

</div>
