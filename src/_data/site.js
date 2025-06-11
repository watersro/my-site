const isDev = process.env.ELEVENTY_ENV === "development";

module.exports = {
  baseUrl: isDev
    ? "http://localhost:8080/" // include protocol + trailing slash
    : "https://www.romanwaters.com/",
};
