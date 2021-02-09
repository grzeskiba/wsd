const http = require('http');
const { createApp } = require('./app');

const createServer = ({ workerClient, port, hostname, logger }) => {
  const handleShutdown = () => {
    logger.info('Server stops');
    process.exit(0);
  };

  const handleError = () => {
    logger.info('Server exited');
    process.exit(1);
  };

  const app = createApp(logger, { workerClient });

  const server = http.createServer(app).listen(port, () => {
    logger.debug(`Server listening on ${hostname}:${port}`);
  });

  server.on('error', handleError);
  process.on('SIGTERM', handleShutdown);
  process.on('SIGINT', handleShutdown);
};

module.exports = {
  createServer,
};
