const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "main-black": "#323232",
        "dim-black": "#282828",
        submit: {
          disable: "#C1DD8A",
          DEFAULT: "#8BC319",
          loading: "#C1DD8A",
        },
        cancel: {
          disable: "#EB8CAF",
          DEFAULT: "#D81B60",
          loading: "#EB8CAF",
        },
      },
      fontFamily: {
        manrope: ["bricolage grotesque"],
      },
      maxWidth: {
        xl: "1200px",
      },
    },
    screens: {
      "4sm": "361px",
      "3sm": "375px",
      "2sm": "426px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1280px",
      "3xl": "1345px",
      "4xl": "1536px",
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
