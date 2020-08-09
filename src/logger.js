'use strict';

const defaultLoggerOptions = {
  level: process.env.LOG_LEVEL || `debug`
};

const logger = require(`pino`)(defaultLoggerOptions);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child({
      ...defaultLoggerOptions,
      ...options,
    });
  }
};
