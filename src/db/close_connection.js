const logger = require('../services/logger');
const client = require('./client');

module.exports = async function close() {
  await client.close();

  return logger.info('connection closed');
};
