/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      osu_pink: "#eb6aa4",
      osu_purple: "#5639ac",
      osu_background_dark: "#18171c",
      osu_background_card: "#24222a",
      osu_background_info: "#2e293d",
      osu_light_gray: "#302e38",
      osu_text_purple: "#8d99d7",
      osu_text_white: "#f9eeda",
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      blue: colors.blue,
    },
    extend: {},
  },
  plugins: [],
};
