/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1D61E7",
        background: "#F9FAFB",
        blue_dark: "#181823",
        black_1: "#1A1C1E",
        grey_1: "#6C7278",
      },
    },
  },
  plugins: [],
};
