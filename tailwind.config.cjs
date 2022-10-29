/* eslint @typescript-eslint/no-var-requires: 0, no-undef: 0 */
const colors = require('tailwindcss/colors');
const lineClamp = require('@tailwindcss/line-clamp');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '520px',
      md: '900px',
      lg: '1200px',
    },
    fontFamily: {
      primary: ['Poppins', 'ui-sans-serif', 'system-ui'],
      secondary: ['Roboto', 'ui-sans-serif', 'system-ui'],
    },
    colors: {
      transparent: '#00000000',
      zinc: colors.zinc,
      white: colors.white,
      black: colors.black,
      dark: {
        100: '#141414',
        200: '#232323',
        300: '#414141',
      },
      primary: {
        100: {
          DEFAULT: '#D4A8FF',
          dark: '#BA75FF',
        },
        200: {
          DEFAULT: '#C183FF',
          dark: '#A64EFF',
        },
      },
    },
    extend: {},
  },
  plugins: [lineClamp],
};
