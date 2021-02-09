const { healthRouteGroup } = require('./health/routes');
const { extractionRouteGroup } = require('./extraction/routes');

module.exports = {
  routeGroups: [healthRouteGroup, extractionRouteGroup],
};
