const path = require('path');

const fetchConfig = async () => ({
  port: process.env.PORT || 4041,
  hostname: process.env.HOSTNAME || 'http://localhost',
  workerDataFilePath:
    process.env.WORKDER_DATA_FILE_PATH
    || path.join(__dirname, '../../data.json'),
  workerCount: process.env.WORKER_COUNT || 4,
  workerFile:
    process.env.WORKER_FILE || path.join(__dirname, '../runWorker.js'),
  topSimiliarSentenceCount: +(process.env.TOP_SIMILAR_SENTENCE_COUNT || 3),
});

module.exports = {
  fetchConfig,
};
