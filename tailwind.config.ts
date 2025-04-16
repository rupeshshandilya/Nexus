import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
        display: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
        condensed: ["Bebas Neue", "Impact", "Arial Narrow", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Premium theme colors
        premium: {
          start: "hsl(var(--premium-gradient-start))",
          mid: "hsl(var(--premium-gradient-mid))",
          end: "hsl(var(--premium-gradient-end))",
          accent: "hsl(var(--premium-accent))",
          highlight: "hsl(var(--premium-highlight))",
        },
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "text-shimmer": "text-shimmer 3s infinite linear",
        float: "float 10s ease-in-out infinite",
        glitch: "glitch 3s infinite linear alternate",
        reveal: "reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "text-shimmer": {
          "0%": {
            backgroundPosition: "-500px 0",
          },
          "100%": {
            backgroundPosition: "500px 0",
          },
        },
        float: {
          "0%": {
            transform: "translateY(0) translateX(0) rotate(0)",
          },
          "50%": {
            transform: "translateY(-20px) translateX(10px) rotate(10deg)",
          },
          "100%": {
            transform: "translateY(0) translateX(0) rotate(0)",
          },
        },
        glitch: {
          "0%": {
            textShadow:
              "0.05em 0 0 rgba(255, 255, 255, 0.75), -0.05em -0.025em 0 rgba(169, 169, 169, 0.75), -0.025em 0.05em 0 rgba(128, 128, 128, 0.75)",
          },
          "15%": {
            textShadow:
              "-0.05em -0.025em 0 rgba(255, 255, 255, 0.75), 0.025em 0.025em 0 rgba(169, 169, 169, 0.75), -0.05em -0.05em 0 rgba(128, 128, 128, 0.75)",
          },
          "30%": {
            textShadow:
              "0.025em 0.05em 0 rgba(255, 255, 255, 0.75), 0.05em 0 0 rgba(169, 169, 169, 0.75), 0 -0.05em 0 rgba(128, 128, 128, 0.75)",
          },
          "45%": {
            textShadow:
              "-0.025em 0 0 rgba(255, 255, 255, 0.75), -0.025em -0.025em 0 rgba(169, 169, 169, 0.75), -0.025em -0.05em 0 rgba(128, 128, 128, 0.75)",
          },
          "60%": {
            textShadow:
              "-0.025em 0.025em 0 rgba(255, 255, 255, 0.75), -0.025em -0.025em 0 rgba(169, 169, 169, 0.75), -0.025em -0.05em 0 rgba(128, 128, 128, 0.75)",
          },
          "75%": {
            textShadow:
              "0.05em 0.05em 0 rgba(255, 255, 255, 0.75), 0.025em 0 0 rgba(169, 169, 169, 0.75), 0 0.05em 0 rgba(128, 128, 128, 0.75)",
          },
          "90%": {
            textShadow:
              "0.025em 0 0 rgba(255, 255, 255, 0.75), 0.05em -0.05em 0 rgba(169, 169, 169, 0.75), -0.025em -0.025em 0 rgba(128, 128, 128, 0.75)",
          },
          "100%": {
            textShadow:
              "0.05em 0 0 rgba(255, 255, 255, 0.75), -0.05em -0.025em 0 rgba(169, 169, 169, 0.75), -0.025em 0.05em 0 rgba(128, 128, 128, 0.75)",
          },
        },
        reveal: {
          "0%": {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          },
          "100%": {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          },
        },
      },
      backgroundImage: {
        "premium-gradient":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      gradientColorStops: {
        "silver-start": "#ffffff",
        "silver-mid": "#e0e0e0",
        "silver-end": "#a0a0a0",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      letterSpacing: {
        widest: "0.25em",
        "super-wide": "0.35em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
