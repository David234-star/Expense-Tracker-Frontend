/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Mode (Our "crafty" theme)
        'parchment': '#fefbf1',
        'coffee': '#4a2c2a',
        'light-bg': '#fefbf1',
        'light-card': '#ffffff',
        'light-text': '#4a2c2a',
        'light-subtext': '#7d5a58',
        'primary-blue': '#3b82f6', // A nice blue for buttons
        
        // Dark Mode (From screenshots)
        'dark-bg': '#111827',
        'dark-card': '#1f2937',
        'dark-text': '#f9fafb',
        'dark-subtext': '#9ca3af',
      },
      fontFamily: {
        'heading': ['"Fredoka One"', 'cursive'],
        'body': ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}