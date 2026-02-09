/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        background: "#F9FAFB",
        dark: "#111827",
      },
    },
  },
  plugins: [],
};
