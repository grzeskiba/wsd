const express = require('express');

const { schemaValidationMiddleware } = require('../middlewares');

const mountRoute = (route, logger, services) => {
  const router = express.Router();
  // eslint-disable-next-line object-curly-newline
  const { url, schema, method, handler } = route;
  router[method](
    url,
    schemaValidationMiddleware(schema, logger),
    async (req, res, next) => {
      try {
        const { payload, status, contentType } = await handler(req, services);
        return res
          .status(status || 200)
          .header('Content-Type', contentType || 'application/json')
          .send(payload);
      } catch (err) {
        return next(err);
      }
    }
  );
  return router;
};

const mountRouteGroup = (routeGroup, logger, services) => {
  const routeGroupRouter = express.Router({ mergeParams: true });
  routeGroup.routes.forEach((route) => {
    const mountedRoute = mountRoute(route, logger, services);
    routeGroupRouter.use(routeGroup.url, mountedRoute);
    logger.debug('route_mounted', {
      method: route.method,
      url: `${routeGroup.url}${route.url}`,
    });
  });
  return routeGroupRouter;
};

const mountRouteGroups = (routeGroups, logger, services) => {
  const router = express.Router();
  routeGroups.forEach((routeGroup) => {
    router.use(mountRouteGroup(routeGroup, logger, services));
  });
  return router;
};

module.exports = {
  mountRouteGroups,
};
