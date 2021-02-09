const { Worker } = require('worker_threads');
const os = require('os');
const { WorkerError } = require('../errors');

class Pool {
  constructor({
    workerCount,
    workerFile,
    logger,
    poolInterval,
    workerData,
  } = {}) {
    this._workerCount = workerCount || os.cpus().length;
    this._workers = new Map();
    this._workerFile = workerFile;
    this._availableWorkers = [];
    this._logger = logger || console;
    this._poolInterval = poolInterval || 100;
    this._workerData = workerData;
  }

  start() {
    this._logger.info(`Running with ${this._workerCount} worker.`);

    for (let i = 0; i < this._workerCount; i++) {
      this._logger.info(`Creating worker ${i}`);
      const worker = new Worker(this._workerFile, {
        workerData: this._workerData,
      });
      worker.on('exit', () => {
        this._removeWorker(i);
        this._logger.info(`Worker ${i} exits.`);
      });

      this._availableWorkers.push(i);
      this._workers.set(i, worker);
    }
  }

  async send(data) {
    const workerId = await this._getAvailableWorkerId();
    return new Promise((resolve, reject) => {
      const worker = this._workers.get(workerId);
      worker.once('message', ({ error, message }) => {
        if (error) {
          reject(new WorkerError(error));
        }
        resolve(message);
        this._releaseWorker(workerId);
      });
      worker.postMessage(data);
    });
  }

  _getAvailableWorkerId() {
    return new Promise((resolve) => {
      if (this._availableWorkers.length) {
        const id = this._availableWorkers.pop();
        resolve(id);
      } else {
        const intervalId = setInterval(() => {
          if (this._availableWorkers.length) {
            const id = this._availableWorkers.pop();
            clearInterval(intervalId);
            resolve(id);
          }
        }, this._poolInterval);
      }
    });
  }

  _releaseWorker(workerId) {
    if (!this._availableWorkers.includes(workerId)) {
      this._availableWorkers.push(workerId);
    }
  }

  _removeWorker(workerId) {
    this._availableWorkers = this._availableWorkers.filter(
      (x) => x !== workerId
    );
    this._workers.delete(workerId);
  }
}

module.exports = {
  Pool,
};
