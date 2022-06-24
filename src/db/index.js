class BotDatabaseFunctions {
  constructor(config) {
    // Load config
    this.mongo_url = config.mongo_url;
    this.mongo_db_name = config.mongo_db_name;

    // Collection names
    this.setting_collection = 'bot_settings';
  }

  // Executes a database transaction with MongoDB
  async mongoTransaction(collName, callback) {
    const Client = require('mongodb').MongoClient(this.mongo_url, {
      useUnifiedTopology: true,
    });
    let res = [];

    try {
      await Client.connect();
      const database = Client.db(this.mongo_db_name);
      const collection = database.collection(collName);

      res = await callback(collection);
    } finally {
      await Client.close();
    }

    return res;
  }

  // Finds data from a collection
  async find(collName, filters) {
    return await this.mongoTransaction(collName, async function (coll) {
      return await coll.find(filters).toArray();
    });
  }
}

module.exports = BotDatabaseFunctions;
