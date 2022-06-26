const config = require('../config');
const logger = require('../services/logger');
const close = require('./close_connection');
const connect = require('./connection');

module.exports = {
  getDocuments: async function (
    collectionName = config.eventsCollection,
    pipeline = []
  ) {
    try {
      const collection = await connect(collectionName);
      const result = await collection.aggregate(pipeline).toArray();
      return result;
    } catch (err) {
      logger.error(err);
    } finally {
      close();
    }
  },
};
