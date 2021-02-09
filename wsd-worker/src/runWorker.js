const { parentPort, workerData } = require('worker_threads');
const { Worker, SentenceWorker } = require('./modules');
const { createLogger, fetchConfig } = require('./utils');

const run = async () => {
  const logger = createLogger();
  const { topSimiliarSentenceCount } = await fetchConfig();
  const worker = new Worker({ parentPort, workerData, logger });

  const sentenceWorker = new SentenceWorker({
    worker,
    logger,
    topSimiliarSentenceCount,
  });

  sentenceWorker.start();
};

run();
