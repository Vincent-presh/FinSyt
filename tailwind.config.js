/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primaryLight: '#1E1E1E',
        secondaryLight: '#989595',
        backgroundColor: 'rgba(255, 255, 255, 0.60);'
      }
    },
  },
  plugins: [],
}

