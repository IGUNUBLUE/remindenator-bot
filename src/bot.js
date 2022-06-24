const { Telegraf } = require('telegraf');

const logger = require('./services/logger');
const config = require('../config');
const startCmd = require('./services/commands/start');
const addCmd = require('./services/commands/add');
const deleteCmd = require('./services/commands/delete');
const listCmd = require('./services/commands/list');
const upcomingCmd = require('./services/commands/upcoming');
const todayCmd = require('./services/commands/today');
const alerts = require('./services/commands/alerts');
const stop = require('./services/commands/stop');
const listenTo = require('./services');

const bot = new Telegraf(config.telegraf_key);
const state = {};

// -- "Start" command: gets bot info -- //
bot.command('start', (ctx) => startCmd(ctx));
bot.command('add', (ctx) => addCmd(ctx, state));
bot.command('delete', (ctx) => deleteCmd(ctx));
bot.command('list', (ctx) => listCmd(ctx));
bot.command('upcoming', (ctx) => upcomingCmd(ctx));
bot.command('today', (ctx) => todayCmd(ctx));
bot.command('alerts', (ctx) => alerts(ctx));
bot.command('stop', (ctx) => stop(ctx, state));
// -- Listens for plain text messages from the user. In groups, just replies to the bot are considered. -- //
bot.on('text', (ctx) => listenTo(ctx));

logger.info('Started successfully!');

module.exports = bot;
