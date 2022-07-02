const mongoose = require('mongoose');
const logger = require('../logger.service');
const config = require('../../config');

async function connect() {
  try {
    await mongoose.connect(config.mongo_db_name);
    logger.info('Database connected successfully');
    return;
  } catch (err) {
    logger.error(err);
  }
}

module.exports = connect;
