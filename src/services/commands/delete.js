// -- "Delete birthday" command: deletes a birthday record -- //
const MongoDB = require('../../db');
const config = require('../../../config');
const logger = require('../logger');

const db = new MongoDB(config);

module.exports = async function deleteReminder(ctx) {
  logger.info('Called /delete');

  db.mongoTransaction('birthdays', async function (coll) {
    return await coll.deleteOne({
      chat_id: ctx.message.chat.id,
      user_id: ctx.message.from.id,
    });
  });

  return ctx.reply('Your birthday has been removed from the list T.T');
};
