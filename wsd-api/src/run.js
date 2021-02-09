const { createLogger } = require('./utils/createLogger');
const { createServer } = require('./api/server');
const { WorkerClient } = require('./modules/WorkerClient');
const { fetchConfig } = require('./utils/fetchConfig');

const run = async () => {
  const config = await fetchConfig();
  const logger = createLogger();

  const workerClient = new WorkerClient(config.workerUrl);
  createServer({ workerClient, logger, ...config });
};

run();
