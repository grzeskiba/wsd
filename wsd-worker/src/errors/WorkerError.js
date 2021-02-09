class WorkerError extends Error {
  constructor(source, message = 'Worker Error') {
    super(message);
    Error.captureStackTrace(this, WorkerError);
    this.source = source;
    this.name = 'WorkerError';
  }
}

module.exports = {
  WorkerError,
};
