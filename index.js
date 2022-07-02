// const reminderJob = require('./src/jobs/reminder');
const bot = require('./src/bot');
const connectDb = require('./src/services/db/connection-db.service');
const logger = require('./src/services/logger.service');

async function startApp() {
  try {
    await connectDb();
    await bot.launch();
    // reminderJob(bot).start();
    logger.info('Starting application... ');
  } catch (err) {
    logger.error(err);
  }
}

startApp();
