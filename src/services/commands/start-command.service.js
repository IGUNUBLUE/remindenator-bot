// -- "Start" command: gets bot info -- //
const logger = require('../logger.service');
const botMessages = require('../../constants/bot-messages.constant');

module.exports = function start(ctx) {
  logger.info(`${ctx.message.from.username} ${botMessages.cmdStart.log}`);
  ctx.reply(botMessages.cmdStart.executionReply);
};
