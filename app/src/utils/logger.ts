import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: process.env.LOGGING_LEVEL ?? "debug",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
      }`;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;
