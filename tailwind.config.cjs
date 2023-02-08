/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: 'Lato, sans-serif'
      },
      colors: {
        secondary: {
          50: '#f7f7f7',
          100: '#eaeaeb',
          200: '#d0cfd3',
          300: '#a9a9b2',
          400: '#7c7b8e',
          500: '#59576b',
          600: '#3e3d4d',
          700: '#282735',
          800: '#1c1b28',
          900: '#17111c'
        },
        cadet: '#a7a9be',
        pizazz: '#ff8906',
        carnation: '#f25f4c',
        tertiary: '#e53170'
      }
    }
  },
  plugins: []
}
