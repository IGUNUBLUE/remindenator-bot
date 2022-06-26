// -- "Start" command: gets bot info -- //
const logger = require('../logger');
const botMessages = require('../../constants/bot_messages');

module.exports = function start(ctx) {
  logger.info(`${ctx.message.from.username} ${botMessages.cmdStart.log}`);
  ctx.reply(`Everyone can use /add_my_birthday to add their own birthdays.
You can then use /start_alerts to start receiving reminders when it's someone's birthday.
You can see all the other commands using Telegram's bot commands list.`);
};
