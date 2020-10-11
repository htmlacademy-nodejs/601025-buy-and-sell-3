'use strict';

const help = require(`./help`);
const generate = require(`./generate`);
const version = require(`./version`);
const server = require(`./server`);
const {getLogger} = require(`../../logger`);

const cliLogger = getLogger({name: `logger-api-service`});

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};

module.exports = {
  Cli,
  apiServiceLogger: cliLogger,
};
