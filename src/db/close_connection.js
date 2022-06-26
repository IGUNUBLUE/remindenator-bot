const logger = require('../services/logger');
const client = require('./mongo_client');

module.exports = async function close() {
  await client.close();

  return logger.info('connection closed');
};
