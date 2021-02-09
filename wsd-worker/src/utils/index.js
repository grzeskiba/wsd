module.exports = {
  ...require('./routes'),
  ...require('./createLogger'),
  ...require('./fetchConfig'),
  ...require('./schemaValidator'),
};
