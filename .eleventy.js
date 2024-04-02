const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(`./src${src}`, {
    widths: [300, 800, null],
    formats: ["avif", "jpeg", "png"],
    urlPath: "/images/",
    outputDir: "./public/images/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("style.out.css");
  eleventyConfig.addWatchTarget("./src/");
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/assets/images/");
  eleventyConfig.addPassthroughCopy({ "./src/assets/favicons": "/" });
  eleventyConfig.addPassthroughCopy({ "src/assets/pdfs": "assets/pdfs" });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("pdfLink", function (path, text) {
    return `<a href="${path}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);
  eleventyConfig.addPassthroughCopy({
    "style.out.css": "/assets/css/style.css",
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};
