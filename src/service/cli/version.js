'use strict';
const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    const logger = require(`./index`).apiServiceLogger;
    logger.info(version);
  }
};
