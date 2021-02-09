const supertest = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const faker = require('faker');
const { createApp } = require('../../../../api/app');
const { createTestLogger } = require('../../../../utils/testUtils');
const { WorkerError } = require('../../../../errors');

describe('POST default/', () => {
  let sentences;
  let pool;

  beforeEach(() => {
    pool = {
      send: sinon.stub(Promise.resolve({})),
    };
  });

  describe('when workers work', () => {
    beforeEach(() => {
      sentences = [faker.random.word()];
      pool = {
        send: sinon.stub().returns(
          Promise.resolve([
            {
              id: faker.random.number(),
              similiarity: faker.random.number(),
              original_string: faker.random.words(),
            },
          ])
        ),
      };
    });

    it('should return matched senteces', async () => {
      return supertest(createApp(createTestLogger(), { pool }))
        .post('/')
        .send({ sentences })
        .set('Content-Type', 'application/json')
        .then((response) => {
          expect(response.status).equals(200);
          expect(response.body).lengthOf(1);
        });
    });
  });

  describe('when workes thow an error', () => {
    beforeEach(() => {
      pool = {
        send: sinon.stub().returns(Promise.reject(new WorkerError())),
      };
    });
    it('returns internal server error status code', () => {
      return supertest(createApp(createTestLogger(), { pool }))
        .post('/')
        .send({ sentences })
        .set('Content-Type', 'application/json')
        .then((response) => {
          expect(response.status).equals(500);
        });
    });
  });
});
