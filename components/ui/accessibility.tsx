"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Type,
  Palette,
  Settings,
  Keyboard,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

// Skip to content link
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-brand-600 text-white px-4 py-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-brand-300"
      dir="rtl"
    >
      انتقل إلى المحتوى الرئيسي
    </a>
  );
}

// Screen reader announcer
interface ScreenReaderAnnouncerProps {
  announcement: string;
  priority?: "polite" | "assertive";
}

export function ScreenReaderAnnouncer({
  announcement,
  priority = "polite",
}: ScreenReaderAnnouncerProps) {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  );
}

// Focus trap for modals
interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

export function FocusTrap({
  children,
  isActive,
  className = "",
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    firstFocusableRef.current = focusableElements[0] as HTMLElement;
    lastFocusableRef.current = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Focus first element
    firstFocusableRef.current?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Let parent handle escape
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="dialog"
      aria-modal={isActive}
    >
      {children}
    </div>
  );
}

// Accessible button with proper ARIA
interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  ariaLabel,
  ariaDescribedBy,
  variant = "primary",
  size = "md",
  className = "",
}: AccessibleButtonProps) {
  const variantClasses = {
    primary: "bg-gradient-primary text-white hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      )}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
}

// Accessible input with proper labeling
interface AccessibleInputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  dir?: "rtl" | "ltr";
  className?: string;
}

export function AccessibleInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  dir = "rtl",
  className = "",
}: AccessibleInputProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helpId = helpText ? `${id}-help` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(" ");

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
        dir={dir}
      >
        {label}
        {required && (
          <span className="text-red-500 mr-1" aria-label="مطلوب">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        dir={dir}
        className={cn(
          "w-full px-4 py-3 border rounded-xl transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-white hover:border-gray-400",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      />

      {helpText && (
        <p id={helpId} className="text-sm text-gray-600" dir={dir}>
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
          dir={dir}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// Accessibility settings panel
interface AccessibilitySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilitySettings({
  isOpen,
  onClose,
}: AccessibilitySettingsProps) {
  const [settings, setSettings] = useState({
    fontSize: "normal",
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
  });

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));

    // Apply settings to document
    const root = document.documentElement;

    // Font size
    root.classList.toggle("text-large", settings.fontSize === "large");
    root.classList.toggle("text-larger", settings.fontSize === "larger");

    // High contrast
    root.classList.toggle("high-contrast", settings.highContrast);

    // Reduced motion
    root.classList.toggle("reduce-motion", settings.reducedMotion);
  }, [settings]);

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <FocusTrap isActive={isOpen}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  id="accessibility-title"
                  className="text-xl font-bold text-gray-900"
                >
                  إعدادات إمكانية الوصول
                </h2>
                <button
                  onClick={onClose}
                  aria-label="إغلاق إعدادات إمكانية الوصول"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <p
                id="accessibility-description"
                className="text-sm text-gray-600 mb-6"
              >
                اضبط هذه الإعدادات لتحسين تجربة استخدام الموقع
              </p>

              <div className="space-y-6">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Type className="w-4 h-4 inline ml-2" />
                    حجم الخط
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "normal", label: "عادي" },
                      { value: "large", label: "كبير" },
                      { value: "larger", label: "أكبر" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateSetting("fontSize", option.value)}
                        className={cn(
                          "px-4 py-2 text-sm rounded-lg border transition-colors",
                          settings.fontSize === option.value
                            ? "bg-brand-500 text-white border-brand-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-brand-300",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Palette className="w-4 h-4 ml-2" />
                    تباين عالي
                  </label>
                  <button
                    onClick={() =>
                      updateSetting("highContrast", !settings.highContrast)
                    }
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      settings.highContrast ? "bg-brand-500" : "bg-gray-300",
                    )}
                    aria-pressed={settings.highContrast}
                  >
                    <span
                      className={cn(
                        "absolute w-5 h-5 bg-white rounded-full shadow transition-transform top-0.5",
                        settings.highContrast
                          ? "transform translate-x-6"
                          : "translate-x-0.5",
                      )}
                    />
                  </button>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Eye className="w-4 h-4 ml-2" />
                    تقليل الحركة
                  </label>
                  <button
                    onClick={() =>
                      updateSetting("reducedMotion", !settings.reducedMotion)
                    }
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      settings.reducedMotion ? "bg-brand-500" : "bg-gray-300",
                    )}
                    aria-pressed={settings.reducedMotion}
                  >
                    <span
                      className={cn(
                        "absolute w-5 h-5 bg-white rounded-full shadow transition-transform top-0.5",
                        settings.reducedMotion
                          ? "transform translate-x-6"
                          : "translate-x-0.5",
                      )}
                    />
                  </button>
                </div>

                {/* Keyboard Navigation */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Keyboard className="w-4 h-4 ml-2" />
                    التنقل بلوحة المفاتيح
                  </label>
                  <button
                    onClick={() =>
                      updateSetting(
                        "keyboardNavigation",
                        !settings.keyboardNavigation,
                      )
                    }
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      settings.keyboardNavigation
                        ? "bg-brand-500"
                        : "bg-gray-300",
                    )}
                    aria-pressed={settings.keyboardNavigation}
                  >
                    <span
                      className={cn(
                        "absolute w-5 h-5 bg-white rounded-full shadow transition-transform top-0.5",
                        settings.keyboardNavigation
                          ? "transform translate-x-6"
                          : "translate-x-0.5",
                      )}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  إعدادات إمكانية الوصول محفوظة في جهازك
                </p>
              </div>
            </motion.div>
          </FocusTrap>
        </>
      )}
    </AnimatePresence>
  );
}

// Accessibility toolbar
export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(false);

  useEffect(() => {
    // Show toolbar on Tab key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setToolbarVisible(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: toolbarVisible ? 1 : 0,
          y: toolbarVisible ? 0 : 20,
        }}
        className="fixed bottom-4 left-4 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-brand-500 text-white shadow-lg hover:shadow-xl"
          aria-label="فتح إعدادات إمكانية الوصول"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </motion.div>

      <AccessibilitySettings isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
