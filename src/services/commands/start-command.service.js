const logger = require('../logger.service');
const internalMessages = require('../../constants/internal-messages.constant');

module.exports = function start(ctx) {
  logger.info(
    `${ctx.message.from.username} ${internalMessages.commands.start.info.log}`
  );
  ctx.reply(internalMessages.commands.start.info.executionReply);
};
