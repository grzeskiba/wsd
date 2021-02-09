const Ajv = require('ajv').default;

const createAjv = (options = {}) => new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
  strict: false,
  ...options,
});

const createSchemaValidator = (ajv = createAjv()) => (schema) => (data) => {
  ajv.validate(schema, data);
  return ajv.errors || undefined;
};

module.exports = {
  createSchemaValidator,
};
