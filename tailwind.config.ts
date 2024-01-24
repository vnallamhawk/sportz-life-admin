import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "side-nav-orange": "#ff9678",
      },
    },
    fontFamily: {
      heading: "Teko, sans-serif",
    },
  },
  plugins: [],
} satisfies Config;
