/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
// import img from "./public/assets/images/ClickerGameBg.png"
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          primary: "#e29227",
          number: "#ffeea3"
        }
      },
      screens: {
        '3xl': '1650px',
        ...defaultTheme.screens,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "clicker-game": "url('/assets/images/ClickerGameBg.png')",
        "gradient": "linear-gradient(90deg, #BD7AFF 80%, #7010F1 80%, #6F3DFF 80%, #BEE8FF 100%, #BEE8FF 100%, #630086 100%)",
        "quest-card": "url('/assets/images/cardBg2.png')",
        "count1": "url('/assets/images/count1.png')",
        "count2": "url('/assets/images/count2.png')",
        "username": "url('/assets/images/username.png')",
        "activeDog": "url('/assets/images/activeDog.png')",
        "activeDogBg": "url('/assets/images/activeDogBg.png')",
        "initialDogBg": "url('/assets/images/initialDogBg.png')",
        "leaderboard": "url('/assets/images/leaderboard.png')",
        "light": "url('/assets/images/Light.png')",
        "leaderboardBg": "url('/assets/images/leaderboardBg.png')",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "LuckiestGuy": ['var(--LuckiestGuy)'],
        "inter": ['var(--inter)']
    }
    },
 
},
  plugins: [],
};
