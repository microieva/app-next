import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  darkMode: "class", 
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  safelist: [
    'hover:text-white'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    flowbite.plugin(),
  ],
} satisfies Config;
