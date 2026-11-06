/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A192F',
          surface: '#112240',
          hover: '#19325c',
          dark: '#050D1A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5E6B3',
          dark: '#B89726',
        },
        coolGray: '#F3F4F6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'card-dark': '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
      }
    },
  },
  plugins: [],
}
