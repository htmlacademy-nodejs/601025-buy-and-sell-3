'use strict';

const {Router} = require(`express`);
const homeRoute = new Router();

homeRoute.get(`/`, (req, res) => res.render('pages/main.pug'));

module.exports = homeRoute;
