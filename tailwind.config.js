/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#252721',
        muted: '#898b83',
        canvas: '#f6f6f2',
        leaf: '#74866a',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: { card: '0 10px 30px rgba(44, 49, 39, .045)' },
    },
  },
  plugins: [],
}
