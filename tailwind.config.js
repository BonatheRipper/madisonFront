/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-gold": "#D2B6A2",
        "cc-gold": "rgb(210,182,162)",
        "c-green": "rgb(31, 51, 48)",
        "c-indigo": "#12083B",
        "c-darkGreen": "#022302",
      },
      backgroundColor: {
        "cb-gold": "#D2B6A2",
      },
      fontFamily: {
        fair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
