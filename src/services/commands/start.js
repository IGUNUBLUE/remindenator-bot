// -- "Start" command: gets bot info -- //
const logger = require('../logger');

module.exports = function start(ctx) {
  logger.info(`${ctx.message.from.username} Called /start`);
  ctx.reply(`Everyone can use /add_my_birthday to add their own birthdays.
You can then use /start_alerts to start receiving reminders when it's someone's birthday.
You can see all the other commands using Telegram's bot commands list.`);
};
