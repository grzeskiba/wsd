const sinon = require('sinon');
const faker = require('faker');
const { expect } = require('chai');
const { WorkerClient } = require('../WorkerClient');
const { ConnectionError, WorkerError } = require('../../errors');

describe('WorkerClient', () => {
  let axiosInstance;
  let workerClient;
  let workerUrl;
  let response;
  let data;

  beforeEach(() => {
    workerUrl = faker.random.word();
    data = faker.random.word();
    response = {
      data: faker.random.word(),
    };
  });

  describe('when worker returns successful response', () => {
    beforeEach(() => {
      axiosInstance = sinon.stub().returns(Promise.resolve(response));
      workerClient = new WorkerClient(workerUrl, axiosInstance);
    });

    it('should return data', async () => {
      expect(await workerClient.send(data)).equals(response.data);
    });
  });

  describe('when worker has a connection problem', () => {
    beforeEach(() => {
      const error = { code: 'ECONNREFUSED' };
      axiosInstance = sinon.stub().returns(Promise.resolve(error));
      workerClient = new WorkerClient(workerUrl, axiosInstance);
    });

    it('should throw ConnectionError', async () => {
      try {
        await workerClient.send(data);
      } catch (err) {
        expect(err instanceof ConnectionError).equals(true);
      }
    });
  });

  describe('when worker throws an error', () => {
    beforeEach(() => {
      axiosInstance = sinon.stub().returns(Promise.reject(new Error()));
      workerClient = new WorkerClient(workerUrl, axiosInstance);
    });

    it('should throw WorkerError', async () => {
      try {
        await workerClient.send(data);
      } catch (err) {
        expect(err instanceof WorkerError).equals(true);
      }
    });
  });
});
