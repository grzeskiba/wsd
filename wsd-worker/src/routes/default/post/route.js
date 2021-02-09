const { schema } = require('./schema');

const postDefaultRoute = {
  handler: async ({ body }, { pool }) => {
    const payload = await Promise.all(
      body.sentences.map(async (sentence) => {
        const matches = await pool.send(sentence);
        return {
          sentence,
          matches,
        };
      }),
    );
    return {
      payload,
    };
  },
  method: 'post',
  schema,
  url: '/',
};

module.exports = {
  postDefaultRoute,
};
