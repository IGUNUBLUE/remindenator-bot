const logger = require('../logger.service');
const textStrings = require('../../constants/text-strings.constant');
const config = require('../../config');

module.exports = function startBot(ctx) {
  ctx.reply(textStrings.commands.start.executionReply);

  return logger.info(
    `${config.commandNames.start} ${textStrings.logger.info.successCmd}`
  );
};
