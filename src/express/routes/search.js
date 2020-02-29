'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => res.render('pages/search-result.pug'));

module.exports = searchRouter;
