const mongoose = require('mongoose');
const strings = require('./src/constants/strings.constant');
// const reminderJob = require('./src/jobs/reminder');
const bot = require('./src/bot');
const config = require('./src/config');
const logger = require('./src/services/logger.service');

async function startApp() {
  try {
    bot.launch();
    await mongoose.connect(config.mongo_url);
    logger.info(strings.logger.info.dbConnection);
    // reminderJob(bot).start();
  } catch (err) {
    logger.error(err);
  }
}

startApp();
