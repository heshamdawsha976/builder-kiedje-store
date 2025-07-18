/**
 * Strapi API Integration for Kledje Store
 * Utility functions for connecting Next.js frontend with Strapi backend
 */

// Base configuration
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Headers for API requests
const headers = {
  "Content-Type": "application/json",
  ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
};

// Types for Strapi responses
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Product Types
export interface ProductAttributes {
  name: string;
  arabicName: string;
  description?: string;
  arabicDescription?: string;
  price: number;
  originalPrice?: number;
  inventory: number;
  sku: string;
  isActive: boolean;
  isOnSale: boolean;
  salePercentage?: number;
  ingredients?: string;
  usage?: string;
  seoTitle?: string;
  seoDescription?: string;
  images?: {
    data: Array<{
      id: number;
      attributes: {
        name: string;
        url: string;
        formats?: any;
      };
    }>;
  };
  category?: {
    data: StrapiEntity<CategoryAttributes>;
  };
  reviews?: {
    data: Array<StrapiEntity<ReviewAttributes>>;
  };
}

// Category Types
export interface CategoryAttributes {
  name: string;
  arabicName: string;
  description?: string;
  arabicDescription?: string;
  slug: string;
  isActive: boolean;
  sortOrder?: number;
  image?: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
        formats?: any;
      };
    };
  };
  parentCategory?: {
    data: StrapiEntity<CategoryAttributes>;
  };
  products?: {
    data: Array<StrapiEntity<ProductAttributes>>;
  };
}

// Customer Types
export interface CustomerAttributes {
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female";
  totalSpent: number;
  loyaltyPoints: number;
  customerType: "regular" | "vip" | "gold";
  isActive: boolean;
  lastLogin?: string;
  notes?: string;
  addresses?: Array<AddressComponent>;
  orders?: {
    data: Array<StrapiEntity<OrderAttributes>>;
  };
  wishlist?: {
    data: Array<StrapiEntity<ProductAttributes>>;
  };
}

// Order Types
export interface OrderAttributes {
  orderNumber: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cash_on_delivery" | "bank_transfer" | "online";
  paymentStatus: "pending" | "paid" | "failed";
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  notes?: string;
  adminNotes?: string;
  customer?: {
    data: StrapiEntity<CustomerAttributes>;
  };
  items: Array<OrderItemComponent>;
  shippingAddress: AddressComponent;
  billingAddress?: AddressComponent;
}

// Component Types
export interface AddressComponent {
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
  isDefault: boolean;
  type: "home" | "work" | "other";
}

export interface OrderItemComponent {
  product: {
    data: StrapiEntity<ProductAttributes>;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Review Types
export interface ReviewAttributes {
  rating: number;
  comment?: string;
  isApproved: boolean;
  isVerifiedPurchase: boolean;
  helpfulVotes: number;
  customer?: {
    data: StrapiEntity<CustomerAttributes>;
  };
  product?: {
    data: StrapiEntity<ProductAttributes>;
  };
}

// Coupon Types
export interface CouponAttributes {
  code: string;
  arabicName?: string;
  englishName?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderValue?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  applicableCategories?: {
    data: Array<StrapiEntity<CategoryAttributes>>;
  };
  applicableProducts?: {
    data: Array<StrapiEntity<ProductAttributes>>;
  };
}

// API utility functions
class StrapiAPI {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseURL = `${STRAPI_URL}/api`;
    this.headers = headers;
  }

  // Generic API call method
  private async apiCall<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: this.headers,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Strapi API Error:", error);
      throw error;
    }
  }

  // Products API
  async getProducts(params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
    isOnSale?: boolean;
    populate?: string[];
  }): Promise<StrapiResponse<Array<StrapiEntity<ProductAttributes>>>> {
    const searchParams = new URLSearchParams();

    if (params?.page)
      searchParams.set("pagination[page]", params.page.toString());
    if (params?.pageSize)
      searchParams.set("pagination[pageSize]", params.pageSize.toString());
    if (params?.category)
      searchParams.set("filters[category][slug][$eq]", params.category);
    if (params?.search)
      searchParams.set("filters[name][$containsi]", params.search);
    if (params?.isOnSale) searchParams.set("filters[isOnSale][$eq]", "true");

    // Default populate
    const populate = params?.populate || ["images", "category", "reviews"];
    populate.forEach((field) => searchParams.append("populate", field));

    return this.apiCall(`/products?${searchParams.toString()}`);
  }

  async getProduct(
    id: number | string,
    populate?: string[],
  ): Promise<StrapiResponse<StrapiEntity<ProductAttributes>>> {
    const searchParams = new URLSearchParams();
    const populateFields = populate || [
      "images",
      "category",
      "reviews.customer",
    ];
    populateFields.forEach((field) => searchParams.append("populate", field));

    return this.apiCall(`/products/${id}?${searchParams.toString()}`);
  }

  async createProduct(
    data: Partial<ProductAttributes>,
  ): Promise<StrapiResponse<StrapiEntity<ProductAttributes>>> {
    return this.apiCall("/products", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  async updateProduct(
    id: number,
    data: Partial<ProductAttributes>,
  ): Promise<StrapiResponse<StrapiEntity<ProductAttributes>>> {
    return this.apiCall(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  async deleteProduct(
    id: number,
  ): Promise<StrapiResponse<StrapiEntity<ProductAttributes>>> {
    return this.apiCall(`/products/${id}`, {
      method: "DELETE",
    });
  }

  // Categories API
  async getCategories(
    populate?: string[],
  ): Promise<StrapiResponse<Array<StrapiEntity<CategoryAttributes>>>> {
    const searchParams = new URLSearchParams();
    const populateFields = populate || ["image", "parentCategory"];
    populateFields.forEach((field) => searchParams.append("populate", field));

    return this.apiCall(`/categories?${searchParams.toString()}`);
  }

  async getCategory(
    slug: string,
    populate?: string[],
  ): Promise<StrapiResponse<StrapiEntity<CategoryAttributes>>> {
    const searchParams = new URLSearchParams();
    searchParams.set("filters[slug][$eq]", slug);
    const populateFields = populate || [
      "image",
      "products.images",
      "parentCategory",
    ];
    populateFields.forEach((field) => searchParams.append("populate", field));

    const response = await this.apiCall<
      StrapiResponse<Array<StrapiEntity<CategoryAttributes>>>
    >(`/categories?${searchParams.toString()}`);

    if (response.data.length === 0) {
      throw new Error("Category not found");
    }

    return {
      data: response.data[0],
      meta: response.meta,
    };
  }

  // Orders API
  async createOrder(
    data: Partial<OrderAttributes>,
  ): Promise<StrapiResponse<StrapiEntity<OrderAttributes>>> {
    return this.apiCall("/orders", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  async getOrders(
    customerId?: number,
    params?: {
      page?: number;
      pageSize?: number;
      status?: string;
    },
  ): Promise<StrapiResponse<Array<StrapiEntity<OrderAttributes>>>> {
    const searchParams = new URLSearchParams();

    if (params?.page)
      searchParams.set("pagination[page]", params.page.toString());
    if (params?.pageSize)
      searchParams.set("pagination[pageSize]", params.pageSize.toString());
    if (customerId)
      searchParams.set("filters[customer][id][$eq]", customerId.toString());
    if (params?.status) searchParams.set("filters[status][$eq]", params.status);

    // Populate order details
    searchParams.append("populate", "customer");
    searchParams.append("populate", "items.product.images");

    return this.apiCall(`/orders?${searchParams.toString()}`);
  }

  async getOrder(
    id: number,
  ): Promise<StrapiResponse<StrapiEntity<OrderAttributes>>> {
    const searchParams = new URLSearchParams();
    searchParams.append("populate", "customer");
    searchParams.append("populate", "items.product.images");

    return this.apiCall(`/orders/${id}?${searchParams.toString()}`);
  }

  async updateOrder(
    id: number,
    data: Partial<OrderAttributes>,
  ): Promise<StrapiResponse<StrapiEntity<OrderAttributes>>> {
    return this.apiCall(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  // Customers API
  async getCustomers(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<StrapiResponse<Array<StrapiEntity<CustomerAttributes>>>> {
    const searchParams = new URLSearchParams();

    if (params?.page)
      searchParams.set("pagination[page]", params.page.toString());
    if (params?.pageSize)
      searchParams.set("pagination[pageSize]", params.pageSize.toString());
    if (params?.search) {
      searchParams.set("filters[$or][0][fullName][$containsi]", params.search);
      searchParams.set("filters[$or][1][email][$containsi]", params.search);
    }

    return this.apiCall(`/customers?${searchParams.toString()}`);
  }

  async getCustomer(
    id: number,
  ): Promise<StrapiResponse<StrapiEntity<CustomerAttributes>>> {
    const searchParams = new URLSearchParams();
    searchParams.append("populate", "orders");
    searchParams.append("populate", "wishlist.images");

    return this.apiCall(`/customers/${id}?${searchParams.toString()}`);
  }

  // Reviews API
  async getReviews(
    productId?: number,
  ): Promise<StrapiResponse<Array<StrapiEntity<ReviewAttributes>>>> {
    const searchParams = new URLSearchParams();
    searchParams.set("filters[isApproved][$eq]", "true");
    if (productId)
      searchParams.set("filters[product][id][$eq]", productId.toString());
    searchParams.append("populate", "customer");

    return this.apiCall(`/reviews?${searchParams.toString()}`);
  }

  async createReview(
    data: Partial<ReviewAttributes>,
  ): Promise<StrapiResponse<StrapiEntity<ReviewAttributes>>> {
    return this.apiCall("/reviews", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  // Coupons API
  async validateCoupon(
    code: string,
  ): Promise<StrapiResponse<StrapiEntity<CouponAttributes>>> {
    const searchParams = new URLSearchParams();
    searchParams.set("filters[code][$eq]", code);
    searchParams.set("filters[isActive][$eq]", "true");
    searchParams.set("filters[validFrom][$lte]", new Date().toISOString());
    searchParams.set("filters[validUntil][$gte]", new Date().toISOString());

    const response = await this.apiCall<
      StrapiResponse<Array<StrapiEntity<CouponAttributes>>>
    >(`/coupons?${searchParams.toString()}`);

    if (response.data.length === 0) {
      throw new Error("Coupon not found or expired");
    }

    return {
      data: response.data[0],
      meta: response.meta,
    };
  }

  // File upload
  async uploadFile(
    file: File,
  ): Promise<Array<{ id: number; url: string; name: string }>> {
    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return await response.json();
  }
}

// Export singleton instance
export const strapiAPI = new StrapiAPI();

// Helper function to get image URL
export const getStrapiImageURL = (imageData: any): string => {
  if (!imageData?.data?.attributes?.url) return "/placeholder.svg";

  const url = imageData.data.attributes.url;

  // If it's already a full URL (Cloudinary, etc), return as is
  if (url.startsWith("http")) return url;

  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
};

// Helper function to format Strapi entity
export const formatStrapiEntity = <T>(entity: StrapiEntity<T>) => {
  return {
    id: entity.id,
    ...entity.attributes,
  };
};

// Helper function to format multiple Strapi entities
export const formatStrapiEntities = <T>(entities: Array<StrapiEntity<T>>) => {
  return entities.map(formatStrapiEntity);
};
