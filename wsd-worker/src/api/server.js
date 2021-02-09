const http = require('http');
const { createApp } = require('./app');

const createServer = ({ hostname, logger, pool, port }) => {
  const handleShutdown = () => {
    logger.info('Server stops');
    process.exit(0);
  };

  const handleError = (err) => {
    logger.error('Server exited', { err });
    process.exit(1);
  };

  const app = createApp(logger, { pool });

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
