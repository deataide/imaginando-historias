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
        primary: "#EB4F4F",
        secondary: "#173D60",
        support: "#45DEBA",
        light: "#FFFFFF",
        dark: "#374151",
      },
    },
  },
  plugins: [],
};
export default config;
