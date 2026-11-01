import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      colors: {
        // brand: swap these for your own colours
        brand: { DEFAULT: "#4DB6A0", hover: "#3FA28D", text: "#2E8C79", wash: "#E3F5F1" },
        money: "#4CAF6E",
        ink: "#111111",
        muted: "#6B6B6B",
        line: "#E6E6E6",
        side: "#F4F4F4",
      },
      borderRadius: { card: "14px" },
    },
  },
  plugins: [],
};
export default config;
