// -- "Stop alerts" command: removes the group from the alerts list -- //
const MongoDB = require('../../db');
const config = require('../../config');
const logger = require('../logger.service');

const db = new MongoDB(config);

module.exports = async function stop(ctx) {
  logger.info('Called /stop');

  db.mongoTransaction('groups', async function (coll) {
    return await coll.deleteOne({ chat_id: ctx.message.chat.id });
  });

  return ctx.reply("I'll no longer check everyday for birthdays :(");
};
