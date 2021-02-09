class InvalidSchemaError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InvalidSchemaError);
    this.name = 'InvalidSchemaError';
  }
}

module.exports = {
  InvalidSchemaError,
};
