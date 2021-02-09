class ConnectionError extends Error {
  constructor(source, message = 'Connection Error') {
    super(message);
    Error.captureStackTrace(this, ConnectionError);
    this.source = source;
    this.name = 'ConnectionError';
  }
}

module.exports = {
  ConnectionError,
};
