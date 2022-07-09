const { Telegraf } = require('telegraf');
const messages = require('./constants/text-strings.constant');

const logger = require('./services/logger.service');
const config = require('./config');
const cmdStart = require('./services/commands/start-command.service');
const cmdAdd = require('./services/commands/add-command.service');

const bot = new Telegraf(config.telegramBotKey);

// -- "Start" command: gets bot info -- //
bot.command(config.commandNames.start, (ctx) => cmdStart(ctx));
bot.command(config.commandNames.addEvent, (ctx) =>
  cmdAdd(ctx, config.commandNames.addEvent)
);

logger.info(messages.logger.info.firstStar);

module.exports = bot;
