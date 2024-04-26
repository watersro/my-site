/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,njk,md}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Azeret Mono", "monospace"],
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    colors: {
      "custom-slate": "#fff9dd",
    },
    animation: {
      "pulse-slow": "pulse 4s linear infinite",
      pulse: "pulse 3s linear infinite",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
