import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        // ── BRAND ──
        navy:    { DEFAULT: "#0B1F33", 50: "#E7ECF2", 900: "#05101C", light: "#1e40af" },
        orange:  { DEFAULT: "#F47721", 50: "#FEF1E8", hover: "#e6670f" },
        teal:    { DEFAULT: "#0E8F78", 50: "#E6F4F0", dark: "#0a6e5d" },
        // backward-compat alias
        emerald: { DEFAULT: "#0E8F78" },
        warm:    { DEFAULT: "#F2C94C", dark: "#d97706" },
        purple:  { DEFAULT: "#7C3AED" },

        // ── SEMANTIC ──
        success: "#16A34A",
        warning: "#F59E0B",
        danger:  "#DC2626",
        info:    "#2563EB",

        // ── SURFACES ──
        canvas:   { DEFAULT: "#F5F7FA" },
        surface:  { DEFAULT: "#FFFFFF", alt: "#F8FAFC", alt2: "#F1F5F9" },

        // ── NEUTRAL ──
        muted:   { DEFAULT: "#64748B", light: "#94A3B8" },
        border:  "#E2E8F0",
        input:   "#E2E8F0",
        ring:    "#F47721",
        background: "#F5F7FA",
        foreground: "#0F172A",
      },
      borderRadius: {
        xl:    "14px",
        "2xl": "16px",
        "3xl": "18px",
      },
      boxShadow: {
        card:  "0 1px 2px rgba(11,31,51,0.04), 0 4px 12px rgba(11,31,51,0.06)",
        hover: "0 12px 32px rgba(11,31,51,0.08)",
        pop:   "0 10px 30px rgba(11,31,51,0.12)",
        topbar:"0 1px 3px rgba(0,0,0,0.05)",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "-apple-system", "BlinkMacSystemFont", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up .35s ease-out both",
        float:     "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;