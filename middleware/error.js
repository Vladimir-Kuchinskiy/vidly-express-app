const logger = require("../logger");

function error(error, _req, res, _next) {
  logger.error(error.message, error);
  res.status(500).send("Something failed!");
}

module.exports = error;
