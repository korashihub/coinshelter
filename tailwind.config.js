/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        tprimary: {
          100: "#89FE95",
          200: "#6FFF7D",
          300: "#62e26f",
          400: "#47dc55",
        },
        tsecondary: "#413DFD",
        tinfo: "#8E98FF",
        tsuccess: "#0DE7B2",
        twarning: "#FF3F57",
        talert: "#B07BEF",
        tblack: {
          100: "#181A20",
          200: "#393E4D",
          300: "#5E667A",
          400: "#8993A4",
        },
        tgray: {
          200: "#D8E0EE",
          300: "#B1BFD4",
          400: "#95A1B2",
          500: "#8993A4",
        },
      },
    },
  },
  plugins: [],
};
