import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "side-nav-orange": "#ff9678",
        "theme": {
          "light" : "#F3476D",
          "dark" : "#a70025",
        },
        "orange" : {
          "light" : "#FF9678",
          "dark"  : "#f66238",
        },
        "s-gray" : "#F9F9F9",
        "burgundy" : "#CF8DA7",
        "mandy" : {
          "light" : "#F78AA2",
          "dark" : "#f8436b"
        },
        "blush" : "#FFBEAB",
      
      },
      maxWidth: {
        "70" : "70px"
      },
      maxHeight: {
        '98vh': '98vh',
      },
      minWidth: {
        '370': '370px',
        '256' : '256px',
        '450' : '450px'
      },
      left: {
        "256" : "-256px"
      },
      bottom: {
        "24" : "-24px",
        "16px" : "-16px"
      },
      height: {
        "40px" : "40px",
        "185px" : "185px"
      },
      width: {
        "40px" : "40px",
        "95px" : "95px",
        "223px" : "223px"
      }
    
    },
    
    fontFamily: {
      heading: "Teko, sans-serif",
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1440px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
} satisfies Config;
