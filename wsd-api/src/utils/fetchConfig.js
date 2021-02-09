const fetchConfig = async () => ({
  port: process.env.PORT || 4040,
  hostname: process.env.HOSTNAME || 'http://localhost',
  workerUrl: process.env.WORKER_URL || 'http://localhost:4041',
});

module.exports = {
  fetchConfig,
};
