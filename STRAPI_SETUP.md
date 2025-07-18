# 🎯 Strapi Backend لمتجر كليدج

## 🚀 إعداد Strapi

### 1. إنشاء مشروع Strapi منفصل

```bash
# إنشاء مشروع Strapi جديد
npx create-strapi-app@latest kledje-backend

# أو بـ TypeScript (مفضل)
npx create-strapi-app@latest kledje-backend --typescript

# الانتقال للمشروع
cd kledje-backend

# تشغيل الخادم
npm run develop
```

### 2. الوصول إلى Admin Panel

```
URL: http://localhost:1337/admin
إنشاء أول مدير: admin@kledje.com / Admin123!
```

## 📦 Content Types المطلوبة

### 1. Product (المنتجات)

```json
{
  "name": "String (required)",
  "description": "Rich Text",
  "price": "Number (required)",
  "originalPrice": "Number",
  "category": "Relation to Category",
  "images": "Media (multiple)",
  "inventory": "Number (default: 0)",
  "sku": "String (unique)",
  "isActive": "Boolean (default: true)",
  "isOnSale": "Boolean (default: false)",
  "salePercentage": "Number",
  "tags": "Component (repeatable)",
  "ingredients": "Rich Text",
  "usage": "Rich Text",
  "seoTitle": "String",
  "seoDescription": "Text",
  "arabicName": "String (required)",
  "arabicDescription": "Rich Text"
}
```

### 2. Category (الفئات)

```json
{
  "name": "String (required)",
  "arabicName": "String (required)",
  "description": "Text",
  "arabicDescription": "Text",
  "image": "Media (single)",
  "slug": "String (unique)",
  "parentCategory": "Relation to Category",
  "isActive": "Boolean (default: true)",
  "sortOrder": "Number"
}
```

### 3. Customer (العملاء)

```json
{
  "fullName": "String (required)",
  "email": "Email (unique, required)",
  "phone": "String",
  "dateOfBirth": "Date",
  "gender": "Enumeration (male, female)",
  "addresses": "Component (repeatable)",
  "orders": "Relation to Order",
  "wishlist": "Relation to Product",
  "totalSpent": "Number (default: 0)",
  "loyaltyPoints": "Number (default: 0)",
  "customerType": "Enumeration (regular, vip, gold)",
  "isActive": "Boolean (default: true)",
  "lastLogin": "DateTime",
  "notes": "Text"
}
```

### 4. Order (الطلبات)

```json
{
  "orderNumber": "String (unique, required)",
  "customer": "Relation to Customer",
  "items": "Component (repeatable)",
  "subtotal": "Number (required)",
  "shippingFee": "Number (default: 0)",
  "tax": "Number (default: 0)",
  "discount": "Number (default: 0)",
  "total": "Number (required)",
  "status": "Enumeration (pending, confirmed, shipped, delivered, cancelled)",
  "paymentMethod": "Enumeration (cash_on_delivery, bank_transfer, online)",
  "paymentStatus": "Enumeration (pending, paid, failed)",
  "shippingAddress": "Component",
  "billingAddress": "Component",
  "trackingNumber": "String",
  "estimatedDelivery": "Date",
  "actualDelivery": "Date",
  "notes": "Text",
  "adminNotes": "Text"
}
```

### 5. Address Component

```json
{
  "fullName": "String (required)",
  "phone": "String (required)",
  "governorate": "String (required)",
  "city": "String (required)",
  "area": "String",
  "street": "String (required)",
  "building": "String",
  "floor": "String",
  "apartment": "String",
  "landmark": "String",
  "isDefault": "Boolean (default: false)",
  "type": "Enumeration (home, work, other)"
}
```

### 6. OrderItem Component

```json
{
  "product": "Relation to Product",
  "quantity": "Number (required)",
  "unitPrice": "Number (required)",
  "totalPrice": "Number (required)"
}
```

### 7. Review (التقييمات)

```json
{
  "customer": "Relation to Customer",
  "product": "Relation to Product",
  "rating": "Number (1-5, required)",
  "comment": "Text",
  "isApproved": "Boolean (default: false)",
  "isVerifiedPurchase": "Boolean (default: false)",
  "helpfulVotes": "Number (default: 0)"
}
```

### 8. Coupon (كوبونات الخصم)

```json
{
  "code": "String (unique, required)",
  "arabicName": "String",
  "englishName": "String",
  "discountType": "Enumeration (percentage, fixed)",
  "discountValue": "Number (required)",
  "minimumOrderValue": "Number",
  "maximumDiscount": "Number",
  "usageLimit": "Number",
  "usedCount": "Number (default: 0)",
  "validFrom": "Date (required)",
  "validUntil": "Date (required)",
  "isActive": "Boolean (default: true)",
  "applicableCategories": "Relation to Category",
  "applicableProducts": "Relation to Product"
}
```

## 🔧 إعدادات إضافية

### 1. إعداد CORS

```javascript
// config/middlewares.js
module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: ["http://localhost:3000", "https://yourdomain.com"],
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
```

### 2. إعداد قاعدة البيانات

```javascript
// config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: "postgres", // أو 'mysql' أو 'sqlite'
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "kledje"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "password"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
```

### 3. إعداد Cloudinary للصور

```bash
npm install @strapi/provider-upload-cloudinary
```

```javascript
// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
```

## 🔐 إعدادات الأمان والصلاحيات

### 1. API Tokens

```
Settings > API Tokens > Create new token
Name: Frontend Token
Token duration: Unlimited
Token type: Read-Only أو Custom
```

### 2. Roles & Permissions

```
Authenticated Users:
- Product: find, findOne
- Category: find, findOne
- Review: find, findOne, create (own only)
- Order: create, update (own only), find (own only)

Public:
- Product: find, findOne
- Category: find, findOne
- Review: find, findOne (approved only)
```

## 🌐 متغيرات البيئة (.env)

```env
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=kledje
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_SSL=false

# Cloudinary
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret

# Email (للإشعارات)
EMAIL_PROVIDER=sendgrid
EMAIL_PROVIDER_API_KEY=your-sendgrid-key
EMAIL_DEFAULT_FROM=noreply@kledje.com
EMAIL_DEFAULT_REPLY_TO=support@kledje.com
```

## 📱 الخطوات التالية

1. **إنشاء Content Types** حسب الـ Schema أعلاه
2. **رفع بيانات تجريبية** للمنتجات والفئات
3. **تخصيص Admin Panel** بالعربية
4. **ربط Frontend** مع Strapi API
5. **إعداد نظام المدفوعات** والشحن

## 🔗 روابط مفيدة

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html)
- [Strapi GraphQL](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html)
- [Strapi Plugins](https://market.strapi.io/)

**هل تريد البدء بإعداد Strapi الآن؟**
