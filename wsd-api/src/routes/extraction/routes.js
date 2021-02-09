const { postMatchesRoute } = require('./matches/route');

const extractionRouteGroup = {
  url: '/extraction',
  routes: [postMatchesRoute],
};

module.exports = {
  extractionRouteGroup,
};
