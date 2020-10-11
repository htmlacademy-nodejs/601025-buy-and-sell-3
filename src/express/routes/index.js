'use strict';

const errorsRoutes = require(`./errors`);
const homeRoute = require(`./homeRoute`);
const loginRoutes = require(`./login`);
const myRoutes = require(`./my`);
const offersRoutes = require(`./offers`);
const registerRoutes = require(`./register`);
const searchRoutes = require(`./search`);

module.exports = {
  errorsRoutes,
  homeRoute,
  loginRoutes,
  myRoutes,
  offersRoutes,
  registerRoutes,
  searchRoutes,
};
