const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '520px',
      'md': '900px',
      'lg': '1200px',
    },
    fontFamily: {
      primary: ['Poppins', 'ui-sans-serif', 'system-ui'],
      secondary: ['Roboto', 'ui-sans-serif', 'system-ui'],
    },
    colors: {
      transparent: "#00000000",
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      dark: "#0C0C0C",
      primary: {
        100: {
          DEFAULT: "#D4A8FF",
          dark: "#BA75FF",
        },
        200: {
          DEFAULT: "#C183FF",
          dark: "#A64EFF",
        },
      }
    },
    extend: {},
  },
  plugins: [],
}
