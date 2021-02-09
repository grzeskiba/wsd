const express = require('express');
const bodyParser = require('body-parser');
const { mountRouteGroups } = require('../utils/routes');
const { routeGroups } = require('../routes');
const { errorHandlerMiddleware } = require('../middlewares');

const createApp = (logger, services) => {
  const app = express();

  app.use(bodyParser.json());

  app.use(mountRouteGroups(routeGroups, logger, services));

  app.use(errorHandlerMiddleware(logger));

  return app;
};

module.exports = {
  createApp,
};
