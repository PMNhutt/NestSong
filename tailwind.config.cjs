/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#3498db",
        secondary: "#2980b9",
        redError: '#E52835',
        greenSuccess: '#2ecc71'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        maven: ["MavenPro", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      smd: "888px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
