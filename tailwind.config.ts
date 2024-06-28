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
        red: "#f91880",
        green: "#00ba7c",
        blue: "#1c98eb",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
export default config;
