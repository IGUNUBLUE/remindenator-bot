const config = require('../../config');
const logger = require('../logger.service');
const connect = require('./connection-db.service');

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
    }
  },
};
