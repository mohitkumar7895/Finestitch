import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4f9",
          100: "#e0ebf3",
          200: "#b9d4e5",
          300: "#86b4d3",
          400: "#4f90bd",
          500: "#2d73a4",
          600: "#1e5b87",
          700: "#1a496d",
          800: "#183e5c",
          900: "#0f273d",
          950: "#081827",
        },
        navy: {
          50: "#f3f5f8",
          100: "#e4e9f0",
          200: "#cbd6e3",
          300: "#a4b9cf",
          400: "#7697b7",
          500: "#5479a0",
          600: "#406186",
          700: "#354e6e",
          800: "#203247",
          900: "#131f2d",
          950: "#0b121c",
        },
        accent: {
          DEFAULT: "#e67e22",
          hover: "#d35400",
          light: "#fef5ec",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(15, 39, 61, 0.08)',
        'lift': '0 12px 30px -4px rgba(15, 39, 61, 0.12)',
      },
      screens: {
        'xs': '400px',
      }
    },
  },
  plugins: [],
};
export default config;

