const { MongoClient } = require('mongodb');
const config = require('../config');
const logger = require('../services/logger');

const client = new MongoClient(config.mongo_url, {
  useUnifiedTopology: true,
});

async function connect(collection) {
  try {
    await client.connect();
    const selectedDb = client.db(config.mongo_db_name);
    const selectedCollection = selectedDb.collection(collection);
    logger.info('Connected successfully to server');
    return selectedCollection;
  } catch (err) {
    logger.error(err);
  }
}

module.exports = connect;
