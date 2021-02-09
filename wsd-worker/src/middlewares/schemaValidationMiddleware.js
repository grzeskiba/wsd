const { InvalidSchemaError, ValidationError } = require('../errors');
const { createSchemaValidator } = require('../utils/schemaValidator');

const schemaValidationMiddleware = (schema) => {
  const validateSchema = createSchemaValidator();

  return (req, _, next) => {
    try {
      const errors = validateSchema(schema)(req);

      if (errors) {
        return next(new ValidationError(errors));
      }

      return next();
    } catch (invalidSchemaError) {
      return next(new InvalidSchemaError(invalidSchemaError.message));
    }
  };
};

module.exports = {
  schemaValidationMiddleware,
};
