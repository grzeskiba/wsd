class Worker {
  constructor({ workerData, parentPort, logger }) {
    this._workerData = workerData;
    this._parentPort = parentPort;
    this._logger = logger;
  }

  onMessage = async (cb) => {
    this._parentPort.on('message', (message) => {
      try {
        cb(message, this._workerData);
      } catch (err) {
        this.sendError(err.message);
      }
    });
  };

  onClose = async (cb) => {
    this._parentPort.on('close', () => {
      try {
        cb();
      } catch (err) {
        this.sendError(err);
      }
    });
  };

  sendMessage = (message) => {
    this._parentPort.postMessage({ message });
  };

  sendError = (error) => {
    this._parentPort.postMessage({ error });
  };
}

module.exports = {
  Worker,
};
