import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      heading: "Teko, sans-serif",
    },
  },
  plugins: [],
} satisfies Config;
