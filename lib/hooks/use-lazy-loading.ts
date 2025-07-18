"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useLazyLoading<T extends Element>({
  threshold = 0.1,
  rootMargin = "50px",
  triggerOnce = true,
  delay = 0,
}: UseLazyLoadingOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<T>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => {
            setIsVisible(true);
            setIsLoaded(true);
          }, delay);
        } else {
          setIsVisible(true);
          setIsLoaded(true);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    },
    [delay, triggerOnce],
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);

  return {
    elementRef,
    isVisible,
    isLoaded,
  };
}

// Hook للصور مع preloading
export function useImageLazyLoading(
  src: string,
  options: UseLazyLoadingOptions = {},
) {
  const { elementRef, isVisible } = useLazyLoading<HTMLImageElement>(options);
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isVisible && src && !imageSrc) {
      const img = new Image();

      img.onload = () => {
        setImageSrc(src);
        setIsImageLoaded(true);
        setHasError(false);
      };

      img.onerror = () => {
        setHasError(true);
        setIsImageLoaded(false);
      };

      img.src = src;
    }
  }, [isVisible, src, imageSrc]);

  return {
    elementRef,
    imageSrc,
    isImageLoaded,
    hasError,
    isVisible,
  };
}

// Hook للأقسام مع animation stagger
export function useSectionLazyLoading(
  itemCount: number,
  staggerDelay: number = 100,
) {
  const { elementRef, isVisible } = useLazyLoading<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "100px",
  });

  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible && visibleItems.length === 0) {
      const timeouts: NodeJS.Timeout[] = [];

      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems((prev) => [...prev, i]);
        }, i * staggerDelay);

        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isVisible, itemCount, staggerDelay, visibleItems.length]);

  return {
    elementRef,
    isVisible,
    visibleItems,
    isItemVisible: (index: number) => visibleItems.includes(index),
  };
}
