var logger = require('winston');

var errorHandler = function errorHandler (err, req, res, next) {
  var message;
  if (typeof err === 'string') {
    message = err;
  } else if (err && err.message) {
    message = err.message;
  } else {
    message = (typeof err === 'object' ? JSON.stringify(err) : 'Unknow server error');
  }

  logger.info('Unhandled error: ' + (typeof err === 'object' ? JSON.stringify(err) : err));

  res.status(500).json({
    message: message
  });
};

module.exports = errorHandler;
