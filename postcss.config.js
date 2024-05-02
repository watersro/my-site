module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? {
          "@fullhuman/postcss-purgecss": {
            content: ["./src/**/*.{njk,html,js}"], // Make sure to include the paths to all your HTML, Nunjucks, and JavaScript files
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: ["some-class-name", "panel"], // Optional: specify any classes to keep regardless of their usage in scanned files
          },
          cssnano: {},
        }
      : {}),
  },
};
