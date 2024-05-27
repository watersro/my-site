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
  // Passthrough copy for specific files and directories
  eleventyConfig.addPassthroughCopy("./src/_redirects");
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/assets/images/");
  eleventyConfig.addPassthroughCopy({ "./src/assets/favicons": "/" });
  eleventyConfig.addPassthroughCopy({
    "style.out.css": "/assets/css/style.css",
  });

  // Collection for blog posts
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("featuredPosts", function (collection) {
    return collection
      .getAllSorted()
      .filter(function (item) {
        return item.data.tags && item.data.tags.includes("Featured");
      })
      .slice(0, 3);
  });

  // Watch targets for development
  eleventyConfig.addWatchTarget("style.out.css");
  eleventyConfig.addWatchTarget("./src/");
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // Shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("pdfLink", function (path, text) {
    return `<a href="${path}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
  eleventyConfig.addShortcode("blogLink", function (path, text) {
    return `<a href="${path}">${text}</a>`;
  });
  eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);
  eleventyConfig.addShortcode("blogImage", function (image, imageAlt) {
    return `<img class="w-full h-auto rounded-md shadow-lg" src="${image}" alt="${imageAlt}">`;
  });

  // Directory settings
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data",
    },
  };
};
