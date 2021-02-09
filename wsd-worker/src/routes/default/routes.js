const { postDefaultRoute } = require('./post/route');

const defaultRouteGroup = {
  url: '/',
  routes: [postDefaultRoute],
};

module.exports = {
  defaultRouteGroup,
};
