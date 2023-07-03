/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-roboto), sans-serif'],
      alt: ['var(--font-fjalla-one), sans-serif'],
    },
    extend: {
      bunker: {
        50: '#f5f6f8',
        100: '#dde2ea',
        200: '#bac5d5',
        300: '#8fa0b9',
        400: '#687999',
        500: '#4e5e7e',
        600: '#3c4965',
        700: '#333d52',
        800: '#2c3343',
        900: '#282d39',
        950: '#0c0e14',
      },
      pizazz: '#ff8906',
    },
  },
  plugins: [],
}
