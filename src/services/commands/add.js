// -- "Add birthday" command: sends info and sets data to insert a birthday -- //
const MongoDB = require('../../db');
const config = require('../../../config');
const logger = require('../logger');

const db = new MongoDB(config);

module.exports = async function add(ctx, state) {
  logger.info('Called /add');

  const userId = ctx.message.from.id;

  // Check if the birthday is already in the database
  const check = await db.find('birthdays', {
    chat_id: ctx.message.chat.id,
    user_id: userId,
  });

  if (check.length > 0) {
    return ctx.reply(
      'You already told us your birthday.' +
        '\n' +
        'Delete it first if you want to edit your birthday (but y tho?)'
    );
  }

  // Sets a temporary state for the player, so it can be read later when a essage is received
  if (!state[userId]) {
    state[userId] = {};
  }
  state[userId].last_command = 'add_bday';

  ctx.replyWithMarkdown(
    'Alright!' +
      '\n' +
      "Hit *reply to this message* and tell us the date. You can use the formats DD/MM/YYYY or just DD/MM if you're too old :p"
  );
};
