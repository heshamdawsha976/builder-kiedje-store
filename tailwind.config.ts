import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "system-ui", "sans-serif"],
        sans: ["Cairo", "Inter", "system-ui", "sans-serif"],
        display: ["Cairo", "Tajawal", "system-ui", "sans-serif"],
        elegant: ["Amiri", "Cairo", "serif"],
        modern: ["IBM Plex Sans Arabic", "Cairo", "sans-serif"],
      },
      colors: {
        // Primary Brand Colors - متدرج وردي ذهبي فاخر
        brand: {
          50: "hsl(315 100% 98%)",
          100: "hsl(315 100% 95%)",
          200: "hsl(315 85% 90%)",
          300: "hsl(315 80% 82%)",
          400: "hsl(315 75% 72%)",
          500: "hsl(315 70% 62%)",
          600: "hsl(315 65% 52%)",
          700: "hsl(315 60% 42%)",
          800: "hsl(315 55% 32%)",
          900: "hsl(315 50% 22%)",
          950: "hsl(315 45% 12%)",
        },
        // Secondary Colors - تدرج بنفسجي أنيق
        secondary: {
          50: "hsl(270 100% 98%)",
          100: "hsl(270 100% 95%)",
          200: "hsl(270 85% 88%)",
          300: "hsl(270 80% 78%)",
          400: "hsl(270 75% 68%)",
          500: "hsl(270 70% 58%)",
          600: "hsl(270 65% 48%)",
          700: "hsl(270 60% 38%)",
          800: "hsl(270 55% 28%)",
          900: "hsl(270 50% 18%)",
        },
        // Accent Colors - تدرج ذهبي لامع
        accent: {
          50: "hsl(45 100% 98%)",
          100: "hsl(45 100% 95%)",
          200: "hsl(45 95% 88%)",
          300: "hsl(45 90% 78%)",
          400: "hsl(45 85% 68%)",
          500: "hsl(45 80% 58%)",
          600: "hsl(45 75% 48%)",
          700: "hsl(45 70% 38%)",
          800: "hsl(45 65% 28%)",
          900: "hsl(45 60% 18%)",
          DEFAULT: "hsl(45 80% 58%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        // Nature Colors - ألوان طبيعية
        nature: {
          mint: "hsl(150 60% 85%)",
          sage: "hsl(120 40% 75%)",
          lavender: "hsl(240 50% 85%)",
          peach: "hsl(20 80% 85%)",
          cream: "hsl(35 30% 92%)",
        },
        // Core System Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(315 70% 62%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
        glow: "0 0 30px rgba(255, 105, 180, 0.3)",
        "glow-lg": "0 0 50px rgba(255, 105, 180, 0.4)",
        lifted: "0 20px 40px rgba(0, 0, 0, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "pulse-glow": {
          from: {
            boxShadow: "0 0 20px rgba(255, 105, 180, 0.3)",
          },
          to: {
            boxShadow: "0 0 40px rgba(255, 105, 180, 0.6)",
          },
        },
        shimmer: {
          "0%": {
            left: "-100%",
          },
          "100%": {
            left: "100%",
          },
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      scale: {
        "102": "1.02",
        "105": "1.05",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for glass effects
    function ({ addUtilities }) {
      addUtilities({
        ".glass": {
          background: "var(--glass-bg)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
        },
        ".glass-strong": {
          background: "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.4)",
        },
        ".text-gradient": {
          background: "var(--gradient-primary)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        },
      });
    },
  ],
} satisfies Config;
