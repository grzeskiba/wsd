const { expect } = require('chai');

const { levenshteinDistance } = require('../utlis');

describe('levenshteinDistance', () => {
  let stringA;
  let stringB;

  describe('when string are identical', () => {
    beforeEach(() => {
      stringA = 'abc';
      stringB = 'abc';
    });

    it('should return 0', () => {
      expect(levenshteinDistance(stringA, stringB)).equals(0);
    });
  });

  describe('when string are completly different', () => {
    beforeEach(() => {
      stringA = 'xyz';
      stringB = 'abc';
    });

    it('should return lenght of string', () => {
      expect(levenshteinDistance(stringA, stringB)).equals(stringB.length);
    });
  });
});
