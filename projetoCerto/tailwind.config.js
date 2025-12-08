/** @type {import('tailwindcss').Config} */

export default {
  // ADICIONE ESTA LINHA AQUI:
  darkMode: 'class', 

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
        "background-light": "#ffffff",
        "background-dark": "#242424"
      }
    }
  },
  plugins: [],
}