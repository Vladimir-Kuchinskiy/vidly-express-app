const mongoose = require("mongoose");
const logger = require("../logger");
const config = require("config");

const db = config.get("db");

module.exports = function() {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => logger.info(`Connected to ${db}...`));
};
