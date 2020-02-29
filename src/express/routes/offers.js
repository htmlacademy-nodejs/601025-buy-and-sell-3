'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.render(`pages/new-ticket.pug`));
offersRouter.get(`/edit/:id`, (req, res) => res.render(`pages/ticket-edit.pug`));
offersRouter.get(`/category/:id`, (req, res) => res.render('pages/category.pug'));
offersRouter.get(`/:id`, (req, res) => res.render(`pages/ticket`));

module.exports = offersRouter;
