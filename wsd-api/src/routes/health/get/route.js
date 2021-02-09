const { schema } = require('./schema');

const getHealthRoute = {
  handler: () => ({
    payload: 'OK',
  }),
  method: 'get',
  schema,
  url: '/',
};

module.exports = {
  getHealthRoute,
};
