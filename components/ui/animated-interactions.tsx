"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Animation Variants
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "backOut",
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Enhanced Animated Container
interface AnimatedContainerProps {
  children: React.ReactNode;
  variant?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "stagger";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function AnimatedContainer({
  children,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
  threshold = 0.2,
}: AnimatedContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const controls = useAnimation();

  const variants = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    stagger: staggerContainer,
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className={className}
      style={{
        transition: `all ${duration}s ease-out ${delay}s`,
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating Elements
interface FloatingElementProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "circular";
  duration?: number;
  intensity?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({
  children,
  direction = "up",
  duration = 4,
  intensity = 20,
  delay = 0,
  className = "",
}: FloatingElementProps) {
  const getAnimationProps = () => {
    switch (direction) {
      case "up":
        return {
          y: [-intensity, intensity, -intensity],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };
      case "down":
        return {
          y: [intensity, -intensity, intensity],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };
      case "left":
        return {
          x: [-intensity, intensity, -intensity],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };
      case "right":
        return {
          x: [intensity, -intensity, intensity],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };
      case "circular":
        return {
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          transition: {
            duration: duration * 2,
            repeat: Infinity,
            ease: "linear",
            delay,
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div animate={getAnimationProps()} className={className}>
      {children}
    </motion.div>
  );
}

// Magnetic Effect
interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}

// Parallax Scroll Effect
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

export function Parallax({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
}: ParallaxProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: isInView ? 0 : direction === "up" ? -100 * speed : 100 * speed,
      }}
    >
      {children}
    </motion.div>
  );
}

// Tilt Effect
interface TiltProps {
  children: React.ReactNode;
  tiltAngle?: number;
  scale?: number;
  speed?: number;
  className?: string;
}

export function Tilt({
  children,
  tiltAngle = 15,
  scale = 1.05,
  speed = 300,
  className = "",
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltAngle;
    const rotateY = ((x - centerX) / centerX) * tiltAngle;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: `transform ${speed}ms ease-out`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// Morphing Button
interface MorphingButtonProps {
  children: React.ReactNode;
  morphTo?: React.ReactNode;
  trigger?: "hover" | "click";
  className?: string;
  onClick?: () => void;
}

export function MorphingButton({
  children,
  morphTo,
  trigger = "hover",
  className = "",
  onClick,
}: MorphingButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleInteraction = () => {
    if (trigger === "click") {
      setIsActive(!isActive);
      onClick?.();
    }
  };

  const handleHover = () => {
    if (trigger === "hover") {
      setIsActive(true);
    }
  };

  const handleLeave = () => {
    if (trigger === "hover") {
      setIsActive(false);
    }
  };

  return (
    <motion.button
      className={className}
      onClick={handleInteraction}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        initial={false}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      {morphTo && (
        <motion.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {morphTo}
        </motion.div>
      )}
    </motion.button>
  );
}

// Text Animation Effects
interface AnimatedTextProps {
  text: string;
  animation?: "typewriter" | "fadeInWords" | "slideInWords" | "bounceInLetters";
  speed?: number;
  delay?: number;
  className?: string;
}

export function AnimatedText({
  text,
  animation = "fadeInWords",
  speed = 0.1,
  delay = 0,
  className = "",
}: AnimatedTextProps) {
  const words = text.split(" ");
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    typewriter: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInWords: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideInWords: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    bounceInLetters: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300 },
      },
    },
  };

  if (animation === "bounceInLetters") {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={itemVariants[animation]}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={itemVariants[animation]}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Export all utilities
export {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
};
