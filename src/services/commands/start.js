// -- "Start" command: gets bot info -- //
const logger = require('../logger');
const botMessages = require('../../constants/bot_messages');

module.exports = function start(ctx) {
  logger.info(`${ctx.message.from.username} ${botMessages.cmdStart.log}`);
  ctx.reply(botMessages.cmdStart.executionReply);
};
