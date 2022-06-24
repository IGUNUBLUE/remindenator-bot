const job = require('./src/jobs/reminder');
const bot = require('./src/bot');

// Starts the cron job
job.start();
// To space and beyond
bot.launch();
