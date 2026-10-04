/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
      colors: { navy: { 900: '#0A1F44', 800: '#0F2C63', 700: '#14397F' }, brand: '#2F6BFF' },
      keyframes: {
        rise: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'none' },
        },
        pop: {
          '0%': { opacity: 0, transform: 'scale(.96)' },
          '100%': { opacity: 1, transform: 'none' },
        },
      },
      animation: { rise: 'rise .5s ease-out both', pop: 'pop .15s ease-out both' },
    },
  },
  plugins: [],
}
