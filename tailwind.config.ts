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
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      borderRadius: {
        md: "4px",
      },
      width: {
        "inner-pc": "1200px",
        "inner-mo": "768px",
      },
      screens: {
        mo: { max: "769px" },
        tab: { min: "770px", max: "1240px" },
        pc: "1241px",
      },
      colors: {
        "border-gray": "#dadce0",
        "default-bg": "#1D1E20",
        "sub-bg": "#27282b",
        "content-bg": "#ffffff05",

        "main-text": "#e6e6e6",
        "sub-text": "#888",
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
        ".drag-unable": {},
        ".x-center": {},
        ".y-center": {},
        ".center": {},
        ".hexagon": {},
        ".pentagon": {},
        ".triangle": {},
        //
        ".button": {},
        ".popover-box": {},
      });
    }),
  ],
};
export default config;
