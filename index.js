const express = require("express");
const app = express();
const logger = require("./logger");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
const server =
  process.env.NODE_ENV === "test"
    ? app
    : app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;
