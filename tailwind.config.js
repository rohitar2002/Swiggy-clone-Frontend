/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,html}",
    "./src/*.{js,jsx}"
  ],
  theme: {
    extend: {
      screens:{
        "xs": "480px",
        "smd": "880px",
      }
    },
  },
  plugins: [],
}

