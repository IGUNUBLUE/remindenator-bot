const logger = require('../logger.service');
const messages = require('../../constants/messages.constant');
const config = require('../../config');

module.exports = function startBot(ctx) {
  ctx.reply(messages.commands.start.executionReply);

  return logger.info(`${config.commandNames.start} ${messages.logger.info.successCmd}`);
};
