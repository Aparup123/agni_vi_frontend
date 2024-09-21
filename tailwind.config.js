/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Montserrat: ["Montserrat", "cursive"],
      Inter:['Inter', "sans-serif"]
    },
    extend: {
      backgroundImage: {
        'galaxy': "url('./src/assets/galaxy.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
}