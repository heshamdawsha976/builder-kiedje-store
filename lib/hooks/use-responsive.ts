"use client";

import { useState, useEffect } from "react";

// Breakpoints تتماشى مع Tailwind CSS
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

interface UseResponsiveReturn {
  // Screen size info
  width: number;
  height: number;

  // Breakpoint checks
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;

  // Helper functions
  isAbove: (breakpoint: Breakpoint) => boolean;
  isBelow: (breakpoint: Breakpoint) => boolean;
  isBetween: (min: Breakpoint, max: Breakpoint) => boolean;

  // Device type detection
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  // Orientation
  isPortrait: boolean;
  isLandscape: boolean;

  // Current breakpoint
  currentBreakpoint: Breakpoint;
}

export function useResponsive(): UseResponsiveReturn {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Set initial dimensions
    handleResize();

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = dimensions;

  // Breakpoint checks
  const isXs = width >= breakpoints.xs && width < breakpoints.sm;
  const isSm = width >= breakpoints.sm && width < breakpoints.md;
  const isMd = width >= breakpoints.md && width < breakpoints.lg;
  const isLg = width >= breakpoints.lg && width < breakpoints.xl;
  const isXl = width >= breakpoints.xl && width < breakpoints["2xl"];
  const is2Xl = width >= breakpoints["2xl"];

  // Helper functions
  const isAbove = (breakpoint: Breakpoint): boolean => {
    return width >= breakpoints[breakpoint];
  };

  const isBelow = (breakpoint: Breakpoint): boolean => {
    return width < breakpoints[breakpoint];
  };

  const isBetween = (min: Breakpoint, max: Breakpoint): boolean => {
    return width >= breakpoints[min] && width < breakpoints[max];
  };

  // Device type detection
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;

  // Orientation
  const isPortrait = height > width;
  const isLandscape = width > height;

  // Current breakpoint
  let currentBreakpoint: Breakpoint = "xs";
  if (is2Xl) currentBreakpoint = "2xl";
  else if (isXl) currentBreakpoint = "xl";
  else if (isLg) currentBreakpoint = "lg";
  else if (isMd) currentBreakpoint = "md";
  else if (isSm) currentBreakpoint = "sm";

  return {
    width,
    height,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isAbove,
    isBelow,
    isBetween,
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape,
    currentBreakpoint,
  };
}

// Hook للتحقق من حجم الشاشة مع استخدام media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

// Hook لتحديد إعدادات مخصصة حسب الجهاز
interface ResponsiveConfig<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
  default: T;
}

export function useResponsiveValue<T>(config: ResponsiveConfig<T>): T {
  const { currentBreakpoint } = useResponsive();

  // نبحث عن القيمة المناسبة بدءاً من الحجم الحالي ونازلاً
  const breakpointOrder: Breakpoint[] = ["2xl", "xl", "lg", "md", "sm", "xs"];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const breakpoint = breakpointOrder[i];
    if (config[breakpoint] !== undefined) {
      return config[breakpoint] as T;
    }
  }

  return config.default;
}

// Hook للتحقق من إمكانيات الجهاز
interface DeviceCapabilities {
  hasTouch: boolean;
  hasHover: boolean;
  prefersReducedMotion: boolean;
  prefersColorScheme: "light" | "dark" | "no-preference";
  supportsWebP: boolean;
  supportsAvif: boolean;
  connectionSpeed: "slow" | "fast" | "unknown";
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    hasTouch: false,
    hasHover: true,
    prefersReducedMotion: false,
    prefersColorScheme: "no-preference",
    supportsWebP: false,
    supportsAvif: false,
    connectionSpeed: "unknown",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateCapabilities = () => {
      setCapabilities({
        hasTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
        hasHover: window.matchMedia("(hover: hover)").matches,
        prefersReducedMotion: window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches,
        prefersColorScheme: window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "no-preference",
        supportsWebP: (() => {
          const canvas = document.createElement("canvas");
          canvas.width = 1;
          canvas.height = 1;
          return (
            canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
          );
        })(),
        supportsAvif: (() => {
          const canvas = document.createElement("canvas");
          canvas.width = 1;
          canvas.height = 1;
          return (
            canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0
          );
        })(),
        connectionSpeed: (() => {
          const connection = (navigator as any).connection;
          if (!connection) return "unknown";

          const effectiveType = connection.effectiveType;
          return effectiveType === "4g" ? "fast" : "slow";
        })(),
      });
    };

    updateCapabilities();

    // Listen for changes
    const mediaQueries = [
      window.matchMedia("(hover: hover)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(prefers-color-scheme: dark)"),
      window.matchMedia("(prefers-color-scheme: light)"),
    ];

    const handler = () => updateCapabilities();

    mediaQueries.forEach((mq) => {
      if (mq.addEventListener) {
        mq.addEventListener("change", handler);
      } else {
        mq.addListener(handler);
      }
    });

    return () => {
      mediaQueries.forEach((mq) => {
        if (mq.removeEventListener) {
          mq.removeEventListener("change", handler);
        } else {
          mq.removeListener(handler);
        }
      });
    };
  }, []);

  return capabilities;
}

// Utility function لتحسين الأداء على الأجهزة البطيئة
export function usePerformanceOptimization() {
  const { connectionSpeed } = useDeviceCapabilities();
  const { isMobile } = useResponsive();

  return {
    shouldReduceAnimations: connectionSpeed === "slow" || isMobile,
    shouldLazyLoad: true,
    imageQuality: connectionSpeed === "slow" ? 75 : 90,
    maxImageSize: isMobile ? 800 : 1200,
    prefersReducedData: connectionSpeed === "slow",
  };
}
