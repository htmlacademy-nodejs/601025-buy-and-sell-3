'use strict';

const path = require(`path`);
const express = require(`express`);
const apiRoutes = require(`../service/api`);
const {HttpCode, API_PREFIX} = require(`../constants`);
const {getLogger} = require(`../logger`);

const STATIC_DIR = path.join(__dirname, `./../../markup`);

const {
  errorsRoutes,
  homeRoute,
  loginRoutes,
  myRoutes,
  offersRoutes,
  registerRoutes,
  searchRoutes,
} = require(`./routes/index`);

const logger = getLogger({
  name: `pino-express`,
});

const expressPino = require(`express-pino-logger`)({logger});

const app = express();
const port = 8080;

app.use(expressPino);
app.use(express.json());
app.use(API_PREFIX, apiRoutes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND);
  res.json({
    error: {
      'name': `Error`,
      'status': 404,
      'message': `Invalid Request`,
      'statusCode': 404,
    }
  });
  logger.debug(`Wrong route`);
});

app.use(express.static(STATIC_DIR));
app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `./templates`));

app.use(`/`, homeRoute);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/register`, registerRoutes);
app.use(`/search`, searchRoutes);
app.use(`/errors`, errorsRoutes);

app.listen(port, () => {
  logger.info(`server start on ${port}`);
})
  .on(`error`, (err) => {
    logger.error(`Server can't start. Error: ${err}`);
  });

module.exports = app;
