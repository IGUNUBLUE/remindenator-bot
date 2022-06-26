const { MongoClient } = require('mongodb');
const config = require('../config');

const client = new MongoClient(config.mongo_url, {
  useUnifiedTopology: true,
});

module.exports = client;
