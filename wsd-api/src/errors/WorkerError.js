class WorkerError extends Error {
  constructor(source, message = 'Worker error') {
    super(message);
    Error.captureStackTrace(this, WorkerError);
    this.source = source;
    this.name = 'WorkerError';
  }
}

module.exports = {
  WorkerError,
};
