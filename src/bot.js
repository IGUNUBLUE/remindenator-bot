const { Telegraf } = require('telegraf');
const internalMessages = require('../src/constants/internal-messages.constant');

const logger = require('./services/logger.service');
const config = require('./config');
const cmdStart = require('./services/commands/start-command.service');
const cmdAdd = require('./services/commands/add-command.service');

const bot = new Telegraf(config.telegraf_key);

// -- "Start" command: gets bot info -- //
bot.command('start', (ctx) => cmdStart(ctx));
bot.command('add', (ctx) => cmdAdd(ctx));

logger.info(internalMessages.others.info.firstStar);

module.exports = bot;
