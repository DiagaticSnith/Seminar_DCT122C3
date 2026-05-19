/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: '#39FF14',
        darkGreenBorder: '#0F2C11',
        inputBackground: '#111b15',
        textGrey: '#888888',
      }
    },
  },
  plugins: [],
}
