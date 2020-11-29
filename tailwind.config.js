module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      screens: {
        // "sm": "640px",
        // "md": "768px",
        // "lg": "1024px",
        // "xl": "1280px",
        "2lg": "1400px",
        "2xl": "1570px",
      },
      spacing: {
        1: "0.5rem",
        22: "5rem",
        26: "6.5rem",
        36: "10rem",
        56: "14rem",
        72: "18rem",
        80: "20rem",
        84: "21rem",
        96: "24rem",
        104: "26rem",
      },
      inset: {
        "1/8": "12.5%",
      },
      boxShadow: {
        strong:
          "0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 -25px 50px -12px rgba(0, 0, 0, 0.75)",
      },
      colors: {
        "esn-green": "#7ac143",
        "esn-blue": "#00aeef",
        "esn-pink": "#ec008c",
        "esn-lightpink": "#ffaabb",
        "esn-orange": "#f47b20",
        "esn-dark-blue": "#2e3192",
        black: "#000",
        gray: "#d3d3d3",
        graylight: "#eaeaea",
        graymap: "#5a5a5a",
        bluelight: "#afb2ff",
        white: "#fff",
        whitebg: "#efefef",
        footer: "#3a3a3a",
        transparent: "#ffffffff",
      },
    },
    fontFamily: {
      body: ["Lato", "sans-serif"],
      heading: ["Oswald", "sans-serif"],
    },
    gridAutoRows: {
      images: "280px",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
