'use strict';

const defaultLoggerOptions = {
  name: `logger`,
  level: process.env.LOG_LEVEL || `info`,
};

const pino = require(`pino`);

const logger = pino(defaultLoggerOptions, pino.destination({
  dest: `src/service/logs/logs.log`,
  sync: false,
}));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child({
      ...defaultLoggerOptions,
      ...options,
    });
  }
};
