/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sweet-pink': '#FF6B9D',
        'sweet-purple': '#8B5CF6',
        'sweet-mint': '#98D8C8',
        'sweet-vanilla': '#FFE5B4',
      },
      fontFamily: {
        'display': ['Quicksand', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
