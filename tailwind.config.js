/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,njk,md}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Satoshi", "sans-serif"],
      },
      colors: {
        "custom-slate": "#fff9dd",
        "service-wordpress": "#8ac4ff",
        "service-ecommerce": "#ACACDE",
        "service-optimisation": "#E85F5C",
        "service-support": "#773344",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    animation: {
      "pulse-slow": "pulse 4s linear infinite",
      pulse: "pulse 3s linear infinite",
      glow: "glow 2s ease-in-out infinite",
    },
    keyframes: {
      pulse: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.5 },
      },
      glow: {
        "0%, 100%": {
          textShadow: "0 0 3px #F3F5CC",
        },
        "50%": {
          textShadow: "0 0 1px #F3F5CC",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
