// -- "Start alerts" command: adds the group to the alerts list -- //
const MongoDB = require('../../db');
const config = require('../../config');
const logger = require('../logger.service');

const db = new MongoDB(config);

module.exports = async function alerts(ctx) {
  logger.info('Called /alerts');

  const group = await db.find('groups', { chat_id: ctx.message.chat.id });

  // Checks if the group is already in the database
  if (group.length > 0) {
    return ctx.reply("Hmmm, seems like I'm already active here!");
  }

  db.mongoTransaction('groups', async function (coll) {
    return await coll.insertOne({
      chat_id: ctx.message.chat.id,
      bot_active: true,
    });
  });

  return ctx.reply(
    "Alright, I'll check everyday for birthdays. Stay tuned! ;)"
  );
};
