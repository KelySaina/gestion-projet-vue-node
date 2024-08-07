/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' depending on your preference
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'colored': '0 4px 6px rgba(31, 41, 55, 0.2), 0 1px 3px rgba(31, 41, 55, 0.1)',
        'colored-hover': '0 8px 16px rgba(31, 41, 55, 0.4), 0 4px 6px rgba(31, 41, 55, 0.2)'
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
