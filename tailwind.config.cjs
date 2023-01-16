/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkest: '#0f0e17',
        lightest: '#fffffe',
        cadet: '#a7a9be',
        main: '#ff8906',
        secondary: '#f25f4c',
        tertiary: '#e53170'
      }
    }
  },
  plugins: []
}
