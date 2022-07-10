const logger = require('../logger.service');
const strings = require('../../constants/strings.constant');
const config = require('../../config');

module.exports = function startBot(ctx) {
  ctx.replyWithMarkdown(strings.commands.start.executionReply);

  return logger.info(`${config.commandNames.start} ${strings.logger.info.successCmd}`);
};
