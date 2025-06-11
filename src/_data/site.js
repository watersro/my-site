const isDev = process.env.ELEVENTY_ENV === "development";

module.exports = {
  baseUrl: isDev ? "http://localhost:8080/" : "https://romanwaters.com/",
};
