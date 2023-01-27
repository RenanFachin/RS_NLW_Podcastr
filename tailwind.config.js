const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      maxWidth: {
        '7/10': '70%',
      },
      fontSize: {
        '3xl': '2rem',
      },
      width: {
        '104': '26rem',
      },
      fontFamily: {
        Inter: ['var(--font-inter)', ...fontFamily.sans],
        Lexend: ['var(--font-lexend)', ...fontFamily.sans]
      },
      backgroundImage: {
        'player-gradient': 'linear-gradient(143.8deg, rgba(145,100,250,0.8) 0%, rgba(0,0,0,0) 100%)'
      }
    },
    colors: {
      transparent: "transparent",
      white: "#FFF",
      gray: {
        50: "#F7F8FA",
        100: "#E6E8EB",
        200: "#AFB2B1",
        500: "#808080",
        800: "#494D4B",
      },
      green: {
        500: "#04D361" 
      },
      purple: {
        300: "#9F75FF",
        400: "#9164FA",
        500: "#8257E5",
        800: "#6F48C9",
      }
    }
  },
  plugins: [],
}
