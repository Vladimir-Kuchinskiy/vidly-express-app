const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({
      filename: "log/development.log",
      format: winston.format.json()
    }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
  ]
});

logger.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({
    format: winston.format.json(),
    filename: "log/uncoughtExceptions.log"
  })
);

module.exports = logger;
