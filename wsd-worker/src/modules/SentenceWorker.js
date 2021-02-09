const { levenshteinDistance, getTopSimiliarSenteces } = require('./utlis');

class SentenceWorker {
  constructor({ worker, logger, topSimiliarSentenceCount }) {
    this._worker = worker;
    this._logger = logger;
    this._topSimilarSentenceCount = topSimiliarSentenceCount;
  }

  start() {
    this._worker.onMessage(this._handleMessage);
    this._worker.onClose(this._handleClose);
  }

  _handleMessage = (message, data) => {
    const result = getTopSimiliarSenteces(
      this._topSimilarSentenceCount,
      levenshteinDistance
    )(message, data);

    this._worker.sendMessage(result);
  };

  _handleClose = () => {
    this._logger.debug('sentence_worker_handle_close');
  };
}

module.exports = {
  SentenceWorker,
};
