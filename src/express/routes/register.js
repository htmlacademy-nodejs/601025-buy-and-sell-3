'use strict';

const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => res.render('pages/sign-up.pug'));

module.exports = registerRouter;
