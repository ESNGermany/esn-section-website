module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        "esn-green": "#7ac143",
        "esn-blue": "#00aeef",
        "esn-pink": "#ec008c",
        "esn-lightpink": "#ffaabb",
        "esn-orange": "#f47b20",
        "esn-dark-blue": "#2e3192",
      },
    },
    fontFamily: {
      body: ["Lato", "sans-serif"],
      heading: ["Oswald", "sans-serif"],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
