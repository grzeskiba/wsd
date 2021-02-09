const schema = {
  $id: 'get-health',
  properties: {
    body: {
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
