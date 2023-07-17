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
      alt: ['var(--font-fjalla), sans-serif'],
    },
    extend: {
      boxShadow: {
        banner: '0px -180px 100px 0px rgba(12, 14, 20, 0.75) inset',
        genreBanner: '-540px 0px 100px 0px rgba(12, 14, 20, 0.75) inset',
      },
      colors: {
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
        carnation: '#D84339',
        pizazz: '#FCA311',
        woodsmoke: '#111214',
        shark: '#1A1B1F',
        oslo: '#8C8D8F',
      },
    },
  },
  plugins: [],
}
