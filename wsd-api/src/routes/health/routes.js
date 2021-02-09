const { getHealthRoute } = require('./get/route');

const healthRouteGroup = {
  url: '/health',
  routes: [getHealthRoute],
};

module.exports = {
  healthRouteGroup,
};
