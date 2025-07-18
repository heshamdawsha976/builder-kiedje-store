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
        // Primary Brand Colors - متدرج بنفسجي كليج الجديد
        kledje: {
          50: "hsl(260 100% 98%)",
          100: "hsl(260 100% 95%)",
          200: "hsl(260 90% 88%)",
          300: "hsl(260 85% 78%)",
          400: "hsl(260 80% 68%)",
          500: "hsl(260 75% 58%)",
          600: "hsl(260 70% 48%)",
          700: "hsl(260 65% 38%)",
          800: "hsl(260 60% 28%)",
          900: "hsl(260 55% 18%)",
          950: "hsl(260 50% 12%)",
        },
        // Secondary Colors - كورال طبيعي وردي
        coral: {
          50: "hsl(10 100% 97%)",
          100: "hsl(10 100% 94%)",
          200: "hsl(10 95% 87%)",
          300: "hsl(10 90% 78%)",
          400: "hsl(10 85% 68%)",
          500: "hsl(10 80% 58%)",
          600: "hsl(10 75% 48%)",
          700: "hsl(10 70% 38%)",
          800: "hsl(10 65% 28%)",
          900: "hsl(10 60% 18%)",
        },
        // Accent Colors - تيل أخضر طبيعي
        teal: {
          50: "hsl(170 100% 97%)",
          100: "hsl(170 95% 92%)",
          200: "hsl(170 90% 85%)",
          300: "hsl(170 85% 75%)",
          400: "hsl(170 80% 65%)",
          500: "hsl(170 75% 55%)",
          600: "hsl(170 70% 45%)",
          700: "hsl(170 65% 35%)",
          800: "hsl(170 60% 25%)",
          900: "hsl(170 55% 15%)",
          DEFAULT: "hsl(170 75% 55%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        // Nature Colors - ألوان طبيعية محدثة
        nature: {
          sunflower: "hsl(45 95% 65%)",
          sage: "hsl(120 30% 70%)",
          lavender: "hsl(240 40% 80%)",
          peach: "hsl(20 85% 78%)",
          cream: "hsl(35 40% 95%)",
          ocean: "hsl(200 60% 85%)",
        },
        // Core System Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(260 75% 58%)",
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
