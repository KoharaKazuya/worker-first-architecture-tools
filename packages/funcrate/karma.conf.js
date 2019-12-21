module.exports = config => {
  config.set({
    frameworks: ["mocha", "chai", "detectBrowsers"],
    files: [
      {
        pattern: "tests/*.test.js",
        type: "module"
      },
      {
        pattern: "dist/*",
        included: false
      }
    ],
    detectBrowsers: {
      usePhantomJS: false,
      preferHeadless: true
    }
  });
};
