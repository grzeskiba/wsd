/* eslint-disable class-methods-use-this */
const axios = require('axios').default;
const { WorkerError, ConnectionError } = require('../errors');

class WorkerClient {
  constructor(workerUrl, axiosInstance) {
    this._workerUrl = workerUrl;
    this._axiosInstance = axiosInstance || axios.create();
  }

  send = async (data) => {
    let response;
    try {
      response = await this._axiosInstance({
        method: 'post',
        url: this._workerUrl,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(data),
      });
    } catch (err) {
      throw new WorkerError(err);
    }
    return this._handlerResponse(response);
  };

  _handlerResponse(response) {
    return response instanceof Error
      ? this._handleError(response)
      : response.data;
  }

  _handleError(err) {
    if (err.code === 'ECONNREFUSED') {
      throw new ConnectionError('Worker unavailable');
    }
    throw err;
  }
}

module.exports = {
  WorkerClient,
};
