import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "a1": "#FF3A29",
      "a2": "#02A0FC",
      "a3": "#4339F2",
      "a4": "#34B53A",
      "a5": "#FFB200",
      "l1": "#FFE5D3",
      "l2": "#CCF8FE",
      "l3": "DAD7FE",
      "l4": "E2FBD7",
      "l5": "FFF5CC",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
