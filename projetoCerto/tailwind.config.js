/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#646cff", // escolha a cor que quiser
        "background-light": "#ffffff",
        "background-dark": "#242424"
      }
    }
  },
  plugins: [],
}


