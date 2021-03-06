const http = require('http');
const { ValidationError, WorkerError, ConnectionError } = require('../errors');

const badRequest = (message) => ({
  status: 400,
  message: message || http.STATUS_CODES[400],
});

const internalError = (message) => ({
  status: 500,
  message: message || http.STATUS_CODES[500],
});

const serviceUnavailable = (message) => ({
  status: 503,
  title: message || http.STATUS_CODES[503],
});

const toHttpError = (err) => {
  if (err instanceof ValidationError) {
    return badRequest(err.message);
  }
  if (err instanceof WorkerError) {
    return internalError(err.message);
  }
  if (err instanceof ConnectionError) {
    return serviceUnavailable(err.message);
  }
  return internalError();
};

const errorHandlerMiddleware = (logger) => (err, _req, res, next) => {
  if (err) {
    logger.error('error_handler_middleware', { err });
    const error = toHttpError(err);
    return res.status(error.status).send({ error });
  }

  next();
  return undefined;
};

module.exports = {
  errorHandlerMiddleware,
};
