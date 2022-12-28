/* eslint @typescript-eslint/no-var-requires: 0, no-undef: 0 */
const colors = require('tailwindcss/colors');
const lineClamp = require('@tailwindcss/line-clamp');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '662px',
      lg: '844px',
      xl: '1024px',
    },
    fontFamily: {},
    fontSize: {
      xs: ['0.694rem', '1.2'],
      sm: ['0.833rem', '1.5'],
      base: ['1rem', '1.5'],
      lg: ['1.2rem', '1.5'],
      xl: ['1.44rem', '1.5'],
      '2xl': ['1.728rem', '1.3'],
      '3xl': ['2.074rem', '1.3'],
      '4xl': ['2.488rem', '1.3'],
      '5xl': ['2.986rem', '1.2'],
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: colors.white,
      black: colors.black,
      gray: colors.neutral,
      primary: {
        300: "#72efdd"
      },
      highlight: {
        error: '#d00000',
      },
    },
    extend: {
      maxWidth: {
        'container-xs': '420px',
        'container-sm': '600px',
        'container-md': '800px',
        'container-lg': '980px',
        'container-xl': '1130px',
      },
    },
  },
  plugins: [lineClamp],
};
