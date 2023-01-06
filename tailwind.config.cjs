/* eslint @typescript-eslint/no-var-requires: 0, no-undef: 0 */
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: colors.white,
      black: colors.black,
      gray: colors.neutral,
      primary: {
        300: "#48cae4",
        200: "#0096c7",
        100: "#023e8a"
      },
      highlight: {
        error: "#d00000",
      },
    },
  },
};
