const mongoose = require('mongoose');
const strings = require('./src/constants/strings.constant');
const reminderJob = require('./src/jobs/reminder.job');
const bot = require('./src/bot');
const config = require('./src/config');
const logger = require('./src/services/logger.service');

async function startApp() {
  try {
    bot.launch();
    await mongoose.connect(config.dbUrl);
    logger.info(strings.logger.info.dbConnection);
    reminderJob.start();
  } catch (err) {
    logger.error(err);
  }
}

startApp();
