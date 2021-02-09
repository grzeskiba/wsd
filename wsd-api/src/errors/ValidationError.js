class ValidationError extends Error {
  constructor(source, message = 'Validation Failed') {
    super(message);
    Error.captureStackTrace(this, ValidationError);
    this.source = source;
    this.name = 'ValidationError';
  }
}

module.exports = {
  ValidationError,
};
