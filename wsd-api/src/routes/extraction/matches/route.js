const { schema } = require('./schema');

const postMatchesRoute = {
  handler: async ({ body }, { workerClient }) => ({
    payload: await workerClient.send(body),
  }),
  method: 'post',
  schema,
  url: '/matches',
};

module.exports = {
  postMatchesRoute,
};
