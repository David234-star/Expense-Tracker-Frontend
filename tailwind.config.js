/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- ADD THIS LINE
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#fefbf1',
        'coffee': '#4a2c2a',
        'terracotta': '#e57373',
        'ocean-blue': '#4fc3f7',
        'forest-green': '#81c784',
        'sunny-yellow': '#fff176',
        // Dark Mode Colors
        'dark-bg': '#1a202c',
        'dark-card': '#2d3748',
        'dark-text': '#edf2f7',
        'dark-subtext': '#a0aec0',
      },
      fontFamily: {
        'heading': ['"Fredoka One"', 'cursive'],
        'body': ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}