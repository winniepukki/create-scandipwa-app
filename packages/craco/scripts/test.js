process.env.NODE_ENV = process.env.NODE_ENV || "test";

const { findArgsFromCli } = require("../lib/args");

// Make sure this is called before "paths" is imported.
findArgsFromCli();

const { log } = require("../lib/logger");
const { getCraPaths, test } = require("../lib/cra");
const { overrideJest } = require("../lib/features/test/override");
const { loadCracoConfig } = require("../lib/config");
const { overrideCraPaths } = require("../lib/features/cra-paths/override");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV
};

const cracoConfig = loadCracoConfig(context);

overrideCraPaths(cracoConfig, context);

context.paths = getCraPaths(cracoConfig);

overrideJest(cracoConfig, context);
test(cracoConfig);
