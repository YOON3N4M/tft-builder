import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        md: "4px",
      },
      screens: {
        mo: { max: "1023px" },
        pc: "1024px",
      },
      colors: {
        "border-gray": "#dadce0",
        "default-bg": "#f0f2f5",

        //tier
        "tier-1": "#848999",
        "tier-2": "#11b288",
        "tier-3": "#207ac7",
        "tier-4": "#c440da",
        "tier-5": "#ffb93b",
      },
      zIndex: {
        layout: "100",
        overlay: "500",
      },
      spacing: {
        xxxs: "2px",
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "32px",
        xxxl: "40px",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".inner": {},
        ".x-center": {},
        ".y-center": {},
        ".center": {},
        ".hexagon": {},
      });
    }),
  ],
};
export default config;
