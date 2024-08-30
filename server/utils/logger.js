const pino  = require("pino");
const dayjs = require("dayjs");
require("dotenv").config();

const transport = process.env.NODE_ENV !== 'production' ? {
  target: "pino-pretty",
  options: {
    colorize: true
  }
} : undefined;

const log = pino({
  transport,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

module.exports = log;