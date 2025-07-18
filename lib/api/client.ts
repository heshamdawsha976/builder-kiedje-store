/**
 * Enhanced API Client System for Kledje Store
 * Unified API client with error handling, caching, and TypeScript support
 */

import { ApiResponse, ApiError, PaginationParams } from "@/lib/types";

// ===============================
// API CLIENT CONFIGURATION
// ===============================

interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  cache: boolean;
  defaultHeaders: Record<string, string>;
}

const defaultConfig: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  retries: 3,
  cache: true,
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// ===============================
// ERROR HANDLING
// ===============================

export class ApiClientError extends Error {
  constructor(
    public status: number,
    public errors: ApiError[],
    message?: string,
  ) {
    super(message || errors[0]?.message || "API Error");
    this.name = "ApiClientError";
  }
}

export class NetworkError extends Error {
  constructor(message = "Network Error") {
    super(message);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends Error {
  constructor(message = "Request Timeout") {
    super(message);
    this.name = "TimeoutError";
  }
}

// ===============================
// CACHE SYSTEM
// ===============================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

// ===============================
// API CLIENT CLASS
// ===============================

export class ApiClient {
  private config: ApiClientConfig;
  private cache: ApiCache;
  private authToken?: string;

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.cache = new ApiCache();
  }

  // Set authentication token
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  // Clear authentication token
  clearAuthToken(): void {
    this.authToken = undefined;
  }

  // Get headers with auth
  private getHeaders(customHeaders: Record<string, string> = {}): HeadersInit {
    const headers = {
      ...this.config.defaultHeaders,
      ...customHeaders,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  // Generate cache key
  private getCacheKey(endpoint: string, params?: Record<string, any>): string {
    const paramString = params ? JSON.stringify(params) : "";
    return `${endpoint}:${paramString}`;
  }

  // Retry mechanism
  private async withRetry<T>(
    fn: () => Promise<T>,
    retries = this.config.retries,
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && error instanceof NetworkError) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.withRetry(fn, retries - 1);
      }
      throw error;
    }
  }

  // Main request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useCache = true,
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const cacheKey = this.getCacheKey(endpoint, options.body);

    // Check cache for GET requests
    if (options.method !== "POST" && useCache && this.cache.has(cacheKey)) {
      const cachedData = this.cache.get<ApiResponse<T>>(cacheKey);
      if (cachedData) return cachedData;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await this.withRetry(async () => {
        const res = await fetch(url, {
          ...options,
          headers: this.getHeaders(options.headers as Record<string, string>),
          signal: controller.signal,
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new ApiClientError(
            res.status,
            errorData.errors || [
              { code: "HTTP_ERROR", message: res.statusText },
            ],
          );
        }

        return res;
      });

      clearTimeout(timeoutId);
      const data: ApiResponse<T> = await response.json();

      // Cache successful GET requests
      if (options.method !== "POST" && useCache && this.config.cache) {
        this.cache.set(cacheKey, data);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new TimeoutError();
      }

      if (error instanceof TypeError) {
        throw new NetworkError();
      }

      throw error;
    }
  }

  // HTTP Methods
  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    useCache = true,
  ): Promise<ApiResponse<T>> {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return this.request<T>(
      `${endpoint}${queryString}`,
      { method: "GET" },
      useCache,
    );
  }

  async post<T>(
    endpoint: string,
    data?: any,
    useCache = false,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      },
      useCache,
    );
  }

  async put<T>(
    endpoint: string,
    data?: any,
    useCache = false,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      },
      useCache,
    );
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    useCache = false,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      },
      useCache,
    );
  }

  async delete<T>(endpoint: string, useCache = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" }, useCache);
  }

  // File upload
  async uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const headers = this.authToken
      ? { Authorization: `Bearer ${this.authToken}` }
      : {};

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      30000, // 30 seconds for file uploads
    );

    try {
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiClientError(
          response.status,
          errorData.errors || [
            { code: "UPLOAD_ERROR", message: response.statusText },
          ],
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new TimeoutError("File upload timeout");
      }

      throw error;
    }
  }

  // Pagination helper
  async getPaginated<T>(
    endpoint: string,
    params: PaginationParams = {},
  ): Promise<ApiResponse<T[]>> {
    const queryParams = {
      page: params.page?.toString() || "1",
      pageSize: params.pageSize?.toString() || "10",
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortOrder && { sortOrder: params.sortOrder }),
      ...(params.search && { search: params.search }),
      ...params.filters,
    };

    return this.get<T[]>(endpoint, queryParams);
  }

  // Cache management
  clearCache(): void {
    this.cache.clear();
  }

  deleteCacheKey(key: string): void {
    this.cache.delete(key);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.get("/health", {}, false);
      return true;
    } catch {
      return false;
    }
  }
}

// ===============================
// DEFAULT CLIENT INSTANCE
// ===============================

export const apiClient = new ApiClient();

// Convenience methods for common operations
export const api = {
  // Products
  products: {
    getAll: (params?: PaginationParams) =>
      apiClient.getPaginated<any>("/products", params),
    getById: (id: string) => apiClient.get<any>(`/products/${id}`),
    create: (data: any) => apiClient.post<any>("/products", data),
    update: (id: string, data: any) =>
      apiClient.put<any>(`/products/${id}`, data),
    delete: (id: string) => apiClient.delete<any>(`/products/${id}`),
    search: (query: string) =>
      apiClient.get<any[]>("/products/search", { q: query }),
  },

  // Categories
  categories: {
    getAll: () => apiClient.get<any[]>("/categories"),
    getById: (id: string) => apiClient.get<any>(`/categories/${id}`),
    getBySlug: (slug: string) => apiClient.get<any>(`/categories/slug/${slug}`),
  },

  // Orders
  orders: {
    getAll: (params?: PaginationParams) =>
      apiClient.getPaginated<any>("/orders", params),
    getById: (id: string) => apiClient.get<any>(`/orders/${id}`),
    create: (data: any) => apiClient.post<any>("/orders", data),
    update: (id: string, data: any) =>
      apiClient.put<any>(`/orders/${id}`, data),
    updateStatus: (id: string, status: string) =>
      apiClient.patch<any>(`/orders/${id}/status`, { status }),
  },

  // Customers
  customers: {
    getAll: (params?: PaginationParams) =>
      apiClient.getPaginated<any>("/customers", params),
    getById: (id: string) => apiClient.get<any>(`/customers/${id}`),
    update: (id: string, data: any) =>
      apiClient.put<any>(`/customers/${id}`, data),
  },

  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post<any>("/auth/login", credentials),
    register: (data: any) => apiClient.post<any>("/auth/register", data),
    logout: () => apiClient.post<any>("/auth/logout"),
    refreshToken: () => apiClient.post<any>("/auth/refresh"),
    forgotPassword: (email: string) =>
      apiClient.post<any>("/auth/forgot-password", { email }),
    resetPassword: (token: string, password: string) =>
      apiClient.post<any>("/auth/reset-password", { token, password }),
  },

  // File uploads
  uploads: {
    image: (file: File) => apiClient.uploadFile<any>("/uploads/image", file),
    document: (file: File) =>
      apiClient.uploadFile<any>("/uploads/document", file),
  },

  // Analytics
  analytics: {
    getMetrics: (period: string) =>
      apiClient.get<any>("/analytics/metrics", { period }),
    getRevenue: (period: string) =>
      apiClient.get<any>("/analytics/revenue", { period }),
    getCustomers: (period: string) =>
      apiClient.get<any>("/analytics/customers", { period }),
  },
};

// Export types for external usage
export type { ApiResponse, ApiError, PaginationParams };
