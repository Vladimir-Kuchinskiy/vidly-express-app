const logger = require("../logger");
require("express-async-errors");

module.exports = function() {
  process.on("uncaughtException", e => {
    logger.error(e.message, e);
    process.exit(1);
  });

  process.on("unhandledRejection", e => {
    throw e;
  });
};
