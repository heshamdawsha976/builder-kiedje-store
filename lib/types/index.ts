/**
 * Unified Type System for Kledje Store
 * Central location for all TypeScript types and interfaces
 */

// ===============================
// CORE ENTITIES
// ===============================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// ===============================
// PRODUCT SYSTEM
// ===============================

export interface Product extends BaseEntity {
  name: string;
  arabicName: string;
  description?: string;
  arabicDescription?: string;
  price: number;
  originalPrice?: number;
  sku: string;
  inventory: number;
  isActive: boolean;
  isOnSale: boolean;
  salePercentage?: number;
  images: ProductImage[];
  category: Category;
  tags: string[];
  ingredients?: string;
  usage?: string;
  benefits?: string[];
  skinTypes: SkinType[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
  sortOrder: number;
}

export interface Category extends BaseEntity {
  name: string;
  arabicName: string;
  slug: string;
  description?: string;
  arabicDescription?: string;
  image?: string;
  parentCategory?: Category;
  childCategories: Category[];
  products: Product[];
  isActive: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export type SkinType =
  | "dry"
  | "oily"
  | "combination"
  | "sensitive"
  | "normal"
  | "mature";

// ===============================
// USER & CUSTOMER SYSTEM
// ===============================

export interface User extends BaseEntity {
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;
  profile: UserProfile;
}

export type UserRole =
  | "customer"
  | "admin"
  | "manager"
  | "super_admin"
  | "staff";

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female";
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: "ar" | "en";
  currency: "EGP" | "USD";
  skinType?: SkinType;
  skinConcerns: string[];
  allergies: string[];
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
}

export interface Customer extends User {
  profile: CustomerProfile;
  addresses: Address[];
  orders: Order[];
  wishlist: Product[];
  loyaltyPoints: number;
  totalSpent: number;
  customerType: CustomerType;
  notes?: string;
}

export interface CustomerProfile extends UserProfile {
  skinAssessment?: SkinAssessment;
  purchaseHistory: PurchaseHistory[];
}

export type CustomerType = "regular" | "vip" | "gold" | "platinum";

export interface SkinAssessment {
  skinType: SkinType;
  skinConcerns: string[];
  currentRoutine: string[];
  goals: string[];
  assessmentDate: Date;
  recommendations: ProductRecommendation[];
}

export interface ProductRecommendation {
  product: Product;
  reason: string;
  priority: "high" | "medium" | "low";
}

export interface PurchaseHistory {
  product: Product;
  purchaseDate: Date;
  price: number;
  rating?: number;
  review?: string;
}

// ===============================
// ORDER SYSTEM
// ===============================

export interface Order extends BaseEntity {
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress?: Address;
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  notes?: string;
  adminNotes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  cancelReason?: string;
  refundAmount?: number;
  timeline: OrderTimeline[];
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  appliedDiscounts: OrderDiscount[];
}

export interface OrderDiscount {
  type: "coupon" | "bulk" | "loyalty" | "promotional";
  amount: number;
  percentage?: number;
  description: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "cancelled"
  | "refunded"
  | "partially_refunded";

export type PaymentMethod =
  | "cash_on_delivery"
  | "bank_transfer"
  | "fawry"
  | "credit_card"
  | "mobile_wallet"
  | "instapay";

export interface OrderTimeline {
  id: string;
  status: OrderStatus;
  timestamp: Date;
  notes?: string;
  updatedBy: string;
}

// ===============================
// ADDRESS SYSTEM
// ===============================

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  governorate: string;
  city: string;
  area?: string;
  street: string;
  building?: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  postalCode?: string;
  coordinates?: Coordinates;
  isDefault: boolean;
  type: AddressType;
  deliveryInstructions?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type AddressType = "home" | "work" | "other";

// ===============================
// REVIEW SYSTEM
// ===============================

export interface Review extends BaseEntity {
  customer: Customer;
  product: Product;
  order?: Order;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  moderationNotes?: string;
  helpfulVotes: number;
  unhelpfulVotes: number;
  response?: ReviewResponse;
}

export interface ReviewResponse {
  message: string;
  respondedBy: string;
  respondedAt: Date;
}

// ===============================
// CART SYSTEM
// ===============================

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  estimatedShipping: number;
  estimatedTax: number;
  estimatedTotal: number;
  appliedCoupons: AppliedCoupon[];
  lastUpdated: Date;
}

export interface AppliedCoupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

// ===============================
// COUPON SYSTEM
// ===============================

export interface Coupon extends BaseEntity {
  code: string;
  arabicName?: string;
  englishName?: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderValue?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableCategories?: Category[];
  applicableProducts?: Product[];
  excludedProducts?: Product[];
  customerRestrictions?: CustomerRestriction[];
}

export interface CustomerRestriction {
  type:
    | "new_customers"
    | "returning_customers"
    | "vip_only"
    | "specific_customers";
  customerIds?: string[];
}

// ===============================
// NOTIFICATION SYSTEM
// ===============================

export interface Notification extends BaseEntity {
  recipient: User;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  readAt?: Date;
  scheduledFor?: Date;
  sentAt?: Date;
  status: NotificationStatus;
}

export type NotificationType =
  | "order_confirmation"
  | "order_shipped"
  | "order_delivered"
  | "payment_received"
  | "low_stock"
  | "new_product"
  | "promotional"
  | "system_maintenance"
  | "account_update"
  | "review_request";

export type NotificationChannel =
  | "email"
  | "sms"
  | "push"
  | "in_app"
  | "whatsapp";

export type NotificationStatus =
  | "pending"
  | "sent"
  | "delivered"
  | "failed"
  | "cancelled";

// ===============================
// ANALYTICS TYPES
// ===============================

export interface AnalyticsMetrics {
  revenue: RevenueMetrics;
  orders: OrderMetrics;
  customers: CustomerMetrics;
  products: ProductMetrics;
  traffic: TrafficMetrics;
  conversion: ConversionMetrics;
}

export interface RevenueMetrics {
  total: number;
  growth: number;
  target: number;
  byPeriod: PeriodMetric[];
  byCategory: CategoryMetric[];
  byPaymentMethod: PaymentMethodMetric[];
}

export interface OrderMetrics {
  total: number;
  completed: number;
  cancelled: number;
  averageValue: number;
  byStatus: StatusMetric[];
  byRegion: RegionMetric[];
}

export interface CustomerMetrics {
  total: number;
  new: number;
  returning: number;
  retention: number;
  lifetime: number;
  byType: CustomerTypeMetric[];
}

export interface ProductMetrics {
  total: number;
  topSelling: Product[];
  lowStock: Product[];
  outOfStock: Product[];
  byCategory: CategoryMetric[];
}

export interface TrafficMetrics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  averageSessionTime: number;
  topPages: PageMetric[];
  deviceBreakdown: DeviceMetric[];
}

export interface ConversionMetrics {
  rate: number;
  funnel: FunnelStep[];
  abandonedCarts: number;
  checkoutCompletionRate: number;
}

// Metric helper interfaces
export interface PeriodMetric {
  period: string;
  value: number;
  growth?: number;
}

export interface CategoryMetric {
  category: Category;
  value: number;
  percentage: number;
}

export interface StatusMetric {
  status: string;
  count: number;
  percentage: number;
}

export interface RegionMetric {
  region: string;
  count: number;
  revenue: number;
}

export interface CustomerTypeMetric {
  type: CustomerType;
  count: number;
  revenue: number;
}

export interface PaymentMethodMetric {
  method: PaymentMethod;
  count: number;
  revenue: number;
}

export interface PageMetric {
  path: string;
  views: number;
  uniqueViews: number;
}

export interface DeviceMetric {
  device: string;
  percentage: number;
}

export interface FunnelStep {
  step: string;
  visitors: number;
  conversionRate: number;
}

// ===============================
// API TYPES
// ===============================

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
    timestamp: string;
    version: string;
  };
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: Record<string, any>;
}

// ===============================
// FORM TYPES
// ===============================

export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  agreedToTerms: boolean;
  marketingConsent?: boolean;
}

export interface CheckoutForm {
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  orderNotes?: string;
  saveAddress?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  attachments?: File[];
}

// ===============================
// UTILITY TYPES
// ===============================

export type Locale = "ar" | "en";

export type Currency = "EGP" | "USD";

export type Theme = "light" | "dark" | "auto";

export interface AppConfig {
  locale: Locale;
  currency: Currency;
  theme: Theme;
  rtl: boolean;
  apiBaseUrl: string;
  cdnBaseUrl: string;
  stripePublicKey?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

// ===============================
// EXPORT ALL TYPES
// ===============================

export type {
  // Re-export commonly used types
  BaseEntity,
  StrapiEntity,
  Product,
  Category,
  User,
  Customer,
  Order,
  OrderItem,
  Review,
  Cart,
  CartItem,
  Address,
  Notification,
  AnalyticsMetrics,
  ApiResponse,
  PaginationParams,
};
