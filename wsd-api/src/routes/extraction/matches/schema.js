const schema = {
  $id: 'post-matches-extraction',
  properties: {
    body: {
      properties: {
        sentences: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['sentences'],
      additionalProperties: false,
    },
    params: {
      additionalProperties: false,
    },
    query: {
      additionalProperties: false,
    },
  },
};

module.exports = {
  schema,
};
