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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#F87171",
          50: "#FFF9F9",
          100: "#FEE6E6",
          200: "#FCBFBF",
          300: "#FA9898",
          400: "#F87171",
          500: "#F53C3C",
          600: "#ED0C0C",
          700: "#B80909",
          800: "#820606",
          900: "#4D0404",
          950: "#320202",
        },
      },
    },
  },
  plugins: [],
};
export default config;
