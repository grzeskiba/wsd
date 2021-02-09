const Heap = require('heap');

const calculateStringSimilarity = (str1, str2) =>
  Math.min(str1.length, str2.length) / Math.max(str1.length, str2.length);

// https://www.tutorialspoint.com/levenshtein-distance-in-javascript
const levenshteinDistance = (str1 = '', str2 = '') => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
};

const getTopSimiliarSenteces = (
  topSimiliarSentecesCount,
  getDistance = calculateStringSimilarity
) => (sentence, sentences) => {
  const result = sentences.reduce((heap, curr) => {
    const similarity = getDistance(sentence, curr.original_string);
    if (heap.size() < topSimiliarSentecesCount) {
      heap.push({ ...curr, similarity });
      heap.heapify();
    } else if (heap.peek().similarity > similarity) {
      heap.replace({ ...curr, similarity });
      heap.heapify();
    }
    return heap;
  }, new Heap((a, b) => a.similarity - b.similarity));

  return result.toArray().sort((a, b) => a.similarity - b.similarity);
};
module.exports = {
  levenshteinDistance,
  calculateStringSimilarity,
  getTopSimiliarSenteces,
};
