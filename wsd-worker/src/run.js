const { createServer } = require('./api/server');
const { Pool } = require('./modules/Pool');
const { fetchConfig, createLogger } = require('./utils');

const run = async () => {
  const {
    hostname,
    port,
    workerFile,
    workerCount,
    workerDataFilePath,
  } = await fetchConfig();
  const logger = createLogger();
  // eslint-disable-next-line import/no-dynamic-require
  const workerData = require(workerDataFilePath);
  const pool = new Pool({
    logger,
    workerCount,
    workerData,
    workerFile,
  });
  pool.start();

  createServer({
    hostname,
    port,
    logger,
    pool,
  });
};

run();
