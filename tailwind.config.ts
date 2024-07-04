import { type Config } from "tailwindcss";

// export default {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         "side-nav-orange": "#ff9678",
//       },
//     },
//     fontFamily: {
//       heading: "Teko, sans-serif",
//     },
//   },
//   plugins: [],
// } satisfies Config;

//selector strategy
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   // darkMode: "selector",
//   theme: {
//     extend: {
//       colors: {
//         "side-nav-orange": "#ff9678",
//         primary: "#0E2439",
//         darkmode: "#242424",
//       },
//     },
//   },
//   plugins: [],
// };

export default {
  darkMode: "class", // Use the class strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "side-nav-orange": "#ff9678",
        primary: "#0E2439",
        darkmode: "#242424",
      },
    },
  },
  plugins: [],
} satisfies Config;
