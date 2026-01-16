/** @type {import('tailwindcss').Config} */
module.exports = {
  separator: "__",
  corePlugins: {
    preflight: false,
    space: false,
    divideWidth: false,
    divideColor: false,
    divideStyle: false,
    divideOpacity: false,
  },
  content: [
    "./src/pages/**/*.{vue,js}",
    "./src/components/**/*.{vue,js}",
    "./src/main.js",
    "./src/App.vue",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#07c160",
        danger: "#ee0a24",
        warning: "#ff976a",
        success: "#07c160",
      },
    },
  },
  plugins: [],
};
