const supertest = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const faker = require('faker');
const { createApp } = require('../../../../api/app');
const { createTestLogger } = require('../../../../utils/testUtils');

describe('POST extraction/matches', () => {
  let sentences;
  let workerClient;

  beforeEach(() => {
    workerClient = {
      send: sinon.stub(Promise.resolve({})),
    };
  });

  describe('when worker works', () => {
    beforeEach(() => {
      sentences = [faker.random.word()];
      workerClient = {
        send: sinon.stub().returns(
          Promise.resolve([
            {
              sentece: sentences[0],
              matches: [
                {
                  id: faker.random.number(),
                  similiarity: faker.random.number(),
                  original_string: faker.random.words(),
                },
              ],
            },
          ])
        ),
      };
    });

    it('should return matched senteces', async () => {
      return supertest(createApp(createTestLogger(), { workerClient }))
        .post('/extraction/matches')
        .send({ sentences })
        .set('Content-Type', 'application/json')
        .then((response) => {
          expect(response.status).equals(200);
          expect(response.body).lengthOf(1);
        });
    });
  });

  describe('when data has invalid format', () => {
    beforeEach(() => {
      sentences = faker.random.word();
    });

    it('should return matched senteces', async () => {
      return supertest(createApp(createTestLogger(), { workerClient }))
        .post('/extraction/matches')
        .send({ sentences })
        .set('Content-Type', 'application/json')
        .then((response) => {
          expect(response.status).equals(400);
        });
    });
  });
});
