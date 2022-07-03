const { Telegraf } = require('telegraf');
const internalMessages = require('../src/constants/internal-messages.constant');

const logger = require('./services/logger.service');
const config = require('./config');
const cmdStart = require('./services/commands/start-command.service');
const cmdAdd = require('./services/commands/add-command.service');
// const deleteCmd = require('./services/commands/delete');
// const listCmd = require('./services/commands/list');
// const upcomingCmd = require('./services/commands/upcoming');
// const todayCmd = require('./services/commands/today');
// const alerts = require('./services/commands/alerts');
// const stop = require('./services/commands/stop');
const bot = new Telegraf(config.telegraf_key);

// -- "Start" command: gets bot info -- //
bot.command('start', (ctx) => cmdStart(ctx));
bot.command('add', (ctx) => cmdAdd(ctx));
// bot.command('delete', (ctx) => deleteCmd(ctx));
// bot.command('list', (ctx) => listCmd(ctx));
// bot.command('upcoming', (ctx) => upcomingCmd(ctx));
// bot.command('today', (ctx) => todayCmd(ctx));
// bot.command('alerts', (ctx) => alerts(ctx));
// bot.command('stop', (ctx) => stop(ctx, state));

logger.info(internalMessages.app.info.bot.firstStar);

module.exports = bot;
