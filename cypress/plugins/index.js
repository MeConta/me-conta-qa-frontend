/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const { cleanUpDatabase } = require("./utils/db");
require("dotenv/config");

const toggleDatabaseCleanup = false;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("before:run", async () => {
    if (toggleDatabaseCleanup) {
      // In localhost we need ssl == false, running in heroku/github use rejectUnauthorized instead.
      const ssl = process.env.PGSSL
        ? process.env.PGSSL === "true"
        : { rejectUnauthorized: false };
      const options = {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        dialect: "postgres",
        ssl: ssl,
      };
      console.log("Starting database clean up");
      await cleanUpDatabase(options);
      console.log("Database clean up finished");
    }
  });
};
