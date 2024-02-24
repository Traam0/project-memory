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
        'text': '#140d1c',
        'background': '#f9f7fd',
        'primary': '#631494',
        'secondary': '#ba8ee6',
        'accent': '#bf88b2',
       },
       
    },
  },
  plugins: [],
};
export default config;
