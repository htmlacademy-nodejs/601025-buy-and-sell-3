'use strict';

const {Router} = require(`express`);
const errorsRouter = new Router();

errorsRouter.get(`/500`, (req, res) => res.render('pages/errors/500.pug'));
errorsRouter.get(`/400`, (req, res) => res.render('pages/errors/400.pug'));

module.exports = errorsRouter;
