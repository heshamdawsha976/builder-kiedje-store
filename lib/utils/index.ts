/**
 * Enhanced Utility Functions for Kledje Store
 * Centralized helper functions with TypeScript support
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ===============================
// CSS UTILITIES
// ===============================

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ===============================
// FORMATTING UTILITIES
// ===============================

/**
 * Format price with Egyptian currency
 */
export function formatPrice(
  price: number,
  currency: "EGP" | "USD" = "EGP",
): string {
  if (currency === "EGP") {
    return new Intl.NumberFormat("ar-EG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Format Arabic currency with suffix
 */
export function formatCurrency(
  amount: number,
  currency: "EGP" | "USD" = "EGP",
): string {
  const formatted = formatPrice(amount, currency);
  return currency === "EGP" ? `${formatted} ج.م` : formatted;
}

/**
 * Format Arabic date
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("ar-EG", defaultOptions).format(dateObj);
}

/**
 * Format relative time in Arabic
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return "الآن";
  if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  if (diffDays < 7) return `منذ ${diffDays} يوم`;

  return formatDate(dateObj, { month: "short", day: "numeric" });
}

/**
 * Format phone number for Egyptian numbers
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Egyptian phone number formatting
  if (cleaned.startsWith("20")) {
    // International format: +20 XXX XXX XXXX
    const match = cleaned.match(/^(20)(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
  } else if (cleaned.startsWith("01")) {
    // Local format: 01X XXX XXXX
    const match = cleaned.match(/^(01\d)(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
  }

  return phone; // Return original if no pattern matches
}

// ===============================
// STRING UTILITIES
// ===============================

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

/**
 * Generate slug from Arabic or English text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Capitalize first letter (works with Arabic)
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert to Arabic numerals
 */
export function toArabicNumerals(text: string): string {
  const englishToArabic = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
  };

  return text.replace(/[0-9]/g, (digit) => englishToArabic[digit] || digit);
}

/**
 * Convert Arabic numerals to English
 */
export function toEnglishNumerals(text: string): string {
  const arabicToEnglish = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  return text.replace(/[٠-٩]/g, (digit) => arabicToEnglish[digit] || digit);
}

// ===============================
// VALIDATION UTILITIES
// ===============================

/**
 * Validate Egyptian email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Egyptian phone number
 */
export function isValidEgyptianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  // Egyptian mobile: 01X XXXX XXXX (11 digits starting with 01)
  // International: +20 1X XXXX XXXX (12 digits starting with 201)
  return /^01[0-9]{9}$/.test(cleaned) || /^201[0-9]{9}$/.test(cleaned);
}

/**
 * Validate Arabic text
 */
export function isArabicText(text: string): boolean {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("كلمة المرور يجب أن تحتوي على رقم واحد على الأقل");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ===============================
// MATH UTILITIES
// ===============================

/**
 * Calculate percentage
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number,
): number {
  return Math.round(originalPrice * (discountPercentage / 100));
}

/**
 * Calculate final price after discount
 */
export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number,
): number {
  const discount = calculateDiscount(originalPrice, discountPercentage);
  return originalPrice - discount;
}

/**
 * Round to 2 decimal places
 */
export function roundPrice(price: number): number {
  return Math.round(price * 100) / 100;
}

/**
 * Calculate tax amount
 */
export function calculateTax(amount: number, taxRate: number = 14): number {
  return roundPrice(amount * (taxRate / 100));
}

// ===============================
// ARRAY UTILITIES
// ===============================

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      groups[groupKey] = groups[groupKey] || [];
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Remove duplicates from array
 */
export function uniqueArray<T>(array: T[], key?: keyof T): T[] {
  if (key) {
    const seen = new Set();
    return array.filter((item) => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }
  return [...new Set(array)];
}

/**
 * Chunk array into smaller arrays
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// ===============================
// URL UTILITIES
// ===============================

/**
 * Build URL with query parameters
 */
export function buildUrl(
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined>,
): string {
  const url = new URL(baseUrl, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Extract query parameters from URL
 */
export function getQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const urlObj = new URL(url, window.location.origin);

  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

// ===============================
// LOCAL STORAGE UTILITIES
// ===============================

/**
 * Safe localStorage operations
 */
export const storage = {
  get<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === "undefined") return defaultValue || null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },

  set<T>(key: string, value: T): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key: string): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear(): boolean {
    if (typeof window === "undefined") return false;

    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

// ===============================
// PERFORMANCE UTILITIES
// ===============================

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

/**
 * Sleep function for async delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ===============================
// ERROR HANDLING UTILITIES
// ===============================

/**
 * Safe async function wrapper
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
): Promise<[T | null, Error | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000,
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Exponential backoff
      await sleep(delay * Math.pow(2, attempt - 1));
    }
  }

  throw lastError!;
}

// ===============================
// EXPORT ALL UTILITIES
// ===============================

export {
  // Re-export commonly used utilities
  formatPrice as price,
  formatDate as date,
  truncate as text,
  generateSlug as slug,
  isValidEmail as email,
  calculatePercentage as percentage,
  debounce,
  throttle,
};
