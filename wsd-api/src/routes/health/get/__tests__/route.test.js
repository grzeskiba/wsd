const supertest = require('supertest');
const { expect } = require('chai');
const { createApp } = require('../../../../api/app');
const { createTestLogger } = require('../../../../utils/testUtils');

describe('GET health', () => {
  it('should return health check', () => {
    supertest(createApp(createTestLogger(), {}))
      .get('/health')
      .then((response) => {
        expect(response.status).equals(200);
      });
  });
});
