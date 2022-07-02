// -- "Add birthday" command: sends info and sets data to insert a birthday -- //
const config = require('../../config');
const botMessages = require('../../constants/bot_messages');
const db = require('../db/operations-db.service');
const logger = require('../logger.service');

module.exports = async function add(ctx, state) {
  logger.info(botMessages.cmdAdd.log);
  const userId = ctx.message.from.id;
  // Check if the birthday is already in the database
  const result = await db.getDocuments(config.eventsCollection, [
    {
      $match: {
        chat_id: ctx.message.chat.id,
        user_id: userId,
      },
    },
  ]);

  if (result.length) {
    return ctx.reply('el cumple existe');
  } else {
    return ctx.reply('el cumple no esta...');
  }
};
