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
        greenSuccess: '#2ecc71',
        subPrimary: '#e4f6f8'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        maven: ["MavenPro", "sans-serif"]
      },
      animation: {
        blob: "blob 7s infinite"
      },
      keyframes: {
        blob: {
          "0%" : {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%" : {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%" : {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%" : {
            transform: "translate(0px, 0px) scale(1)",
          },
        }
      }
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
