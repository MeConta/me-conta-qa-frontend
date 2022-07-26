const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  env: {
    PASSWORD: "s#nh4Valida",
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://me-conta-frontend.herokuapp.com/",
  },
});
