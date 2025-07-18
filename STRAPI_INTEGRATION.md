# 🎯 **Strapi Backend Integration - مشروع كليدج**

## 📋 **نظرة عامة**

تم تطوير نظام متكامل يربط **Next.js Frontend** مع **Strapi Backend** لمتجر كليدج للعناية بالبشرة.

## 🚀 **الخطوات السريعة للبدء**

### 1. إعداد Strapi Backend

```bash
# إنشاء مشروع Strapi جديد
npx create-strapi-app@latest kledje-backend --typescript
cd kledje-backend

# تشغيل الخادم
npm run develop

# الوصول إلى Admin Panel
# http://localhost:1337/admin
```

### 2. إنشاء Admin User

```
البريد الإلكتروني: admin@kledje.com
كلمة المرور: Admin123!
الاسم: مدير كليدج
```

### 3. إعداد Content Types

انسخ هذه الـ Content Types ف�� Strapi Admin Panel:

#### 🛍️ **Product**

```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "arabicName": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "arabicDescription": {
      "type": "richtext"
    },
    "price": {
      "type": "decimal",
      "required": true
    },
    "originalPrice": {
      "type": "decimal"
    },
    "inventory": {
      "type": "integer",
      "default": 0
    },
    "sku": {
      "type": "string",
      "unique": true
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "isOnSale": {
      "type": "boolean",
      "default": false
    },
    "salePercentage": {
      "type": "integer"
    },
    "images": {
      "type": "media",
      "multiple": true
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category"
    },
    "reviews": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::review.review"
    }
  }
}
```

#### 📂 **Category**

```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "arabicName": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "string",
      "unique": true,
      "required": true
    },
    "description": {
      "type": "text"
    },
    "arabicDescription": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "sortOrder": {
      "type": "integer"
    },
    "products": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::product.product"
    }
  }
}
```

### 4. إعداد Permissions

في **Settings > Users & Permissions > Roles > Public**:

```
Product: find, findOne ✅
Category: find, findOne ✅
Review: find, findOne ✅
```

في **Settings > Users & Permissions > Roles > Authenticated**:

```
Product: find, findOne ✅
Category: find, findOne ✅
Review: find, findOne, create ✅
Order: create, update (own), find (own) ✅
Customer: update (own), find (own) ✅
```

### 5. إنشاء API Token

في **Settings > API Tokens**:

```
Name: Frontend Token
Token duration: Unlimited
Token type: Read-Only
```

احفظ الـ Token وضعه في `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_token_here
```

## 🔗 **Frontend Integration**

### 1. تحديث package.json

```bash
npm install @types/qs
```

### 2. استخدام Strapi API

```typescript
import { strapiAPI } from '@/lib/strapi'

// جلب المنتجات
const products = await strapiAPI.getProducts({
  page: 1,
  pageSize: 12,
  category: 'serums',
  populate: ['images', 'category']
})

// إنشاء طلب جديد
const order = await strapiAPI.createOrder({
  orderNumber: 'KLD-001',
  total: 299,
  status: 'pending',
  items: [...],
  customer: customerId
})
```

### 3. مثال كامل لاستخدام API

```typescript
// components/ProductList.tsx
'use client'

import { useEffect, useState } from 'react'
import { strapiAPI, type StrapiEntity, type ProductAttributes } from '@/lib/strapi'

export default function ProductList() {
  const [products, setProducts] = useState<Array<StrapiEntity<ProductAttributes>>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await strapiAPI.getProducts({
          populate: ['images', 'category'],
          pageSize: 8
        })
        setProducts(response.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div>جاري التحميل...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## 📊 **إضافة بيانات تجريبية**

### 1. Categories (الفئات)

```json
[
  {
    "name": "Serums",
    "arabicName": "سيرومات",
    "slug": "serums",
    "arabicDescription": "سيرومات متقدمة للعناية بالبشرة",
    "isActive": true,
    "sortOrder": 1
  },
  {
    "name": "Moisturizers",
    "arabicName": "مرطبات",
    "slug": "moisturizers",
    "arabicDescription": "كريمات ترطيب طبيعية",
    "isActive": true,
    "sortOrder": 2
  },
  {
    "name": "Cleansers",
    "arabicName": "منظفات",
    "slug": "cleansers",
    "arabicDescription": "منظفات لطيفة للبشرة",
    "isActive": true,
    "sortOrder": 3
  }
]
```

### 2. Products (المنتجات)

```json
[
  {
    "name": "Vitamin C Advanced Serum",
    "arabicName": "سيروم فيتامين سي المتطور",
    "arabicDescription": "سيروم مركز بفيتامين سي الطبيعي لإشراق البشرة",
    "price": 299,
    "originalPrice": 399,
    "inventory": 50,
    "sku": "KLD-SER-001",
    "isActive": true,
    "isOnSale": true,
    "salePercentage": 25,
    "category": 1
  },
  {
    "name": "Hydrating Daily Moisturizer",
    "arabicName": "كريم الترطيب اليومي",
    "arabicDescription": "كريم ترطيب يومي بمكونات طبيعية",
    "price": 199,
    "inventory": 75,
    "sku": "KLD-MOI-001",
    "isActive": true,
    "isOnSale": false,
    "category": 2
  }
]
```

## 🎨 **تخصيص Strapi Admin**

### 1. إضافة اللغة العربية

```bash
npm install @strapi/plugin-i18n
```

في **Settings > Internationalization**:

- أضف اللغة العربية (ar)
- اجعلها اللغة الافتراضية

### 2. تخصيص الألوان

```javascript
// config/admin.js
module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
  theme: {
    colors: {
      primary100: "#f0f9ff",
      primary200: "#e0f2fe",
      primary500: "#e91e63",
      primary600: "#d81b60",
      primary700: "#c2185b",
    },
  },
});
```

## 🔐 **الأمان والإنتاج**

### 1. متغيرات البيئة للإنتاج

```env
# Production .env
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=your_production_database_url
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
JWT_SECRET=your_strong_jwt_secret
ADMIN_JWT_SECRET=your_strong_admin_jwt_secret
```

### 2. CORS للإنتاج

```javascript
// config/middlewares.js
module.exports = [
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:3000",
        "https://kledje.com",
        "https://www.kledje.com",
      ],
    },
  },
];
```

## 📱 **API Endpoints المتاحة**

### Products

```
GET /api/products - جلب جميع المنتجات
GET /api/products/:id - جلب منتج واحد
POST /api/products - إنشاء منتج جديد
PUT /api/products/:id - تحديث منتج
DELETE /api/products/:id - حذف منتج
```

### Categories

```
GET /api/categories - جلب جميع الفئات
GET /api/categories/:id - جلب فئة واحدة
POST /api/categories - إنشاء فئة جديدة
```

### Orders

```
GET /api/orders - جلب الطلبات
POST /api/orders - إنشاء طلب جديد
PUT /api/orders/:id - تحديث طلب
```

## 🛠️ **استكشاف الأخطاء**

### مشاكل شائعة وحلولها

1. **CORS Error**

   ```javascript
   // تأكد من إعداد CORS صحيح في config/middlewares.js
   ```

2. **API Token Invalid**

   ```bash
   # تأكد من صحة الـ Token في .env.local
   NEXT_PUBLIC_STRAPI_API_TOKEN=valid_token_here
   ```

3. **Images Not Loading**
   ```javascript
   // استخدم getStrapiImageURL helper
   import { getStrapiImageURL } from "@/lib/strapi";
   const imageUrl = getStrapiImageURL(product.images?.data?.[0]);
   ```

## 📚 **الخطوات التالية**

1. ✅ **مكتمل**: إعداد Strapi والـ Content Types
2. ✅ **مكتمل**: ربط Frontend مع Backend
3. 🔄 **جاري**: إضافة المصادقة للعملاء
4. ⏳ **قادم**: نظام الدفع والشحن
5. ⏳ **قادم**: لوحة تحكم المدير المتقدمة

## 🎯 **النتيجة النهائية**

- ✅ **Frontend**: Next.js 15 + TypeScript + Tailwind
- ✅ **Backend**: Strapi 4 + PostgreSQL + Cloudinary
- ✅ **API**: RESTful API مع TypeScript types
- ✅ **Admin**: لوحة إدارة Strapi مخصصة
- ✅ **Real-time**: تحديثات فورية للمنتجات والطلبات

**المشروع الآن جاهز للاستخدام مع Strapi Backend! 🚀**
