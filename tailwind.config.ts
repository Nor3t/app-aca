import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#FF1A1A",
          50: "#FFF0F0",
          100: "#FFE0E0",
          500: "#FF1A1A",
          600: "#E60000",
          700: "#CC0000",
        },
        aca: {
          red: "#FF1A1A",
          white: "#FFFFFF",
          black: "#0A0A0A",
          gray: "#F5F5F5",
          muted: "#6B7280",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-red": "pulseRed 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,26,26,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(255,26,26,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
