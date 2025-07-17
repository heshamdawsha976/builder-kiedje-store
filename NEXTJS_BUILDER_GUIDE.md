# دليل استخدام Builder.io مع Next.js 15 - متجر كليدج

## التحديث إلى Next.js 15

تم تحديث المشروع بالكامل للعمل مع Next.js 15 و App Router. إليك الميزات الجديدة:

### ✅ التحسينات الجديدة:

- **Next.js 15**: أحدث إصدار مع تحسينات الأداء
- **App Router**: بنية حديثة مع file-based routing
- **Server Components**: تحميل أسرع ومحسن لـ SEO
- **Metadata API**: إدارة محسنة لـ SEO والـ meta tags
- **TypeScript الكامل**: أمان نوع كامل

## بنية المشروع الجديدة

```
kledje-store/
├── app/                          # Next.js App Router
│   ├── globals.css              # الأنماط العامة
│   ├── layout.tsx               # التخطيط الرئيسي
│   ├── page.tsx                 # الصفحة الرئيسية
│   ├── products/page.tsx        # صفحة المنتجات
│   ├── about/page.tsx           # صفحة من نحن
│   ├── contact/page.tsx         # صفحة التواصل
│   └── [[...slug]]/page.tsx     # Builder.io catch-all route
├── components/                   # المكونات القابلة للإعادة
│   ├── ui/                      # مكونات ShadCN/UI
│   ├── builder/                 # مكونات Builder.io
│   ├── Header.tsx               # الهيدر
│   └── Cart.tsx                 # سلة التسوق
├── lib/                         # المكتبات والأدوات
│   ├── cart.ts                  # Zustand store
│   └── products.ts              # بيانات المنتجات
├── builder-registry.ts          # تسجيل مكونات Builder.io
├── next.config.js               # إعدادات Next.js
└── .env.local                   # متغيرات البيئة
```

## الإعداد الأولي

### 1. تثبيت المكتبات

```bash
npm install
```

### 2. إعداد Builder.io API Key

```bash
# .env.local
NEXT_PUBLIC_BUILDER_API_KEY=your-builder-api-key
```

### 3. تشغيل المشروع

```bash
npm run dev
```

## ميزات Next.js 15 الجديدة

### 1. App Router

- **File-based routing**: كل مجلد في `app/` يصبح route
- **Layout components**: تخطيط مشترك عبر الصفحات
- **Server Components**: تحميل أسرع من الخادم

### 2. SEO محسن

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: "كليدج - متجر العناية بالبشرة الطبيعية",
  description: "متجر العناية بالبشرة الطبيعية الأول في مصر",
  keywords: ["عناية بالبشرة", "منتجات طبيعية"],
};
```

### 3. Builder.io Integration

- **Catch-all route**: `app/[[...slug]]/page.tsx`
- **Visual Editor**: إدارة كاملة للمحتوى
- **Custom Components**: مكونات مخصصة قابلة للتحكم

## المكونات المتاحة في Builder.io

### 1. HeroSection

```tsx
// يمكن تخصيص:
- العنوان الرئيسي
- النص الفرعي
- نص الزر
- صورة البطل
- لون الخلفية
```

### 2. ProductCard

```tsx
// يمكن تخصيص:
- اسم ال��نتج
- الوصف
- السعر بالجنيه
- صورة المنتج
- حالة التوفر
```

### 3. ProductGrid

```tsx
// يمكن تخصيص:
- عنوان المجموعة
- وصف المجموعة
- إضافة ProductCard متعددة
```

### 4. NewsletterSection

```tsx
// يمكن تخصيص:
- عنوان النشرة
- النص التشجيعي
- نص الزر
- لون الخلفية
```

## كيفية إدارة المحتوى

### إنشاء صفحة جديدة:

1. اذهب إلى Builder.io Dashboard
2. انقر "Create" -> "Page"
3. اختر URL path (مثل `/new-page`)
4. اسحب المكونات وخصصها
5. احفظ ونشر

### تعديل الصفحة الرئيسية:

1. أنشئ صفحة جديدة في Builder.io
2. ضع URL path كـ `/`
3. استخدم المكونات المتاحة
4. احفظ ونشر (ستحل محل الصفحة الافتراضية)

### إضافة منتجات:

1. استخدم ProductGrid component
2. أضف ProductCard بداخله
3. املأ تفاصيل كل منتج
4. احفظ ونشر

## التحسينات الجديدة

### 1. الأداء

- **Server Components**: تحميل أسرع
- **Automatic Optimizations**: ضغط تلقائي للصور
- **Bundle Splitting**: تقسيم الكود لتحميل أسرع

### 2. SEO

- **Metadata API**: إدارة محسنة للـ meta tags
- **Structured Data**: بيانات منظمة تلقائياً
- **Arabic RTL Support**: دعم كامل للعربية

### 3. تجربة المطور

- **TypeScript**: أمان نوع كامل
- **Hot Reload**: إعادة تحميل فورية
- **Error Handling**: معالجة أفضل للأخطاء

## Commands المفيدة

```bash
# تطوير
npm run dev

# إنتاج
npm run build
npm start

# فحص الأنواع
npm run typecheck

# تنسيق الكود
npm run format.fix
```

## نصائح للاستخدام

### 1. للمنتجات:

- استخدم صور عالية الجودة (WebP مفضل)
- اكتب أوصاف SEO-friendly
- استخدم الكلمات المفتاحية المناسبة

### 2. للأداء:

- استخدم Next.js Image component للصور
- فعّل caching للمحتوى
- استخدم CDN للملفات الثابتة

### 3. للـ SEO:

- اكتب meta descriptions فريدة
- استخدم structured data
- حسّن alt texts للصور

## الدعم والمساعدة

### المراجع:

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Builder.io Docs](https://www.builder.io/c/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### المشاكل الشائعة:

**1. Builder.io لا يعمل:**

- تأكد من API key صحيح
- تحقق من الشبكة والاتصال

**2. الخطوط العربية لا تظهر:**

- تأكد من تحميل Cairo و Tajawal
- فحص global.css

**3. مشاكل البناء:**

- تشغيل `npm run typecheck`
- فحص الأخطاء في Console

---

🎉 متجر كليدج الآن يعمل بـ Next.js 15 مع أفضل الممارسات!
