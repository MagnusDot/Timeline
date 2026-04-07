import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "#000000",
        borderLight: "#E5E5E5",
        input: "#000000",
        ring: "#000000",
        background: "#FFFFFF",
        foreground: "#000000",
        primary: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#525252",
        },
        accent: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      backgroundImage: {
        editorialLines:
          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.9) 1px, rgba(0,0,0,0.9) 2px)",
        editorialGrid:
          "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
        editorialDiagonal:
          "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 42px)",
        invertedLines:
          "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.9) 1px, rgba(255,255,255,0.9) 2px)",
        invertedGlow: "radial-gradient(circle at top center, rgba(255,255,255,0.22), transparent 70%)",
      },
      fontFamily: {
        sans: ["Georgia", '"Times New Roman"', "Times", "serif"],
        display: ["Georgia", '"Times New Roman"', "Times", "serif"],
        mono: ['"SFMono-Regular"', '"SF Mono"', '"Cascadia Mono"', '"Segoe UI Mono"', '"Liberation Mono"', "Menlo", "Monaco", "Consolas", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
      },
      maxWidth: {
        editorial: "72rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
