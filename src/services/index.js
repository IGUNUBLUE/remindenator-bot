const MongoDB = require('../db');
const config = require('../../config');
const parseDate = require('../utils/parse_date');
const parseDateNoYear = require('../utils/parse_date_no_year');
const yearDay = require('../utils/year_day');

const db = new MongoDB(config);

module.exports = async function listenTo(ctx, state) {
  console.log('Got text!');

  const curUserId = ctx.message.from.id;

  // Ignores the message if the user has not previusly run the "add birthday" command
  if (!state[curUserId]) return;

  if (state[curUserId].last_command === 'add_bday') {
    const theMsg = ctx.message.text;
    let theDate = parseDate(theMsg);

    // If the date parsing fails, try to parse the date without the year
    if (theDate === null) {
      theDate = parseDateNoYear(theMsg);

      if (theDate === null) {
        return ctx.reply(
          'Hmmm, that does not seem to be a valid date.' +
            '\n' +
            'You can reply to this message with a valid date'
        );
      }
    }

    db.mongoTransaction('birthdays', async function (coll) {
      return await coll.insertOne({
        chat_id: ctx.message.chat.id,
        user_id: curUserId,
        username: ctx.message.from.username,
        first_name: ctx.message.from.first_name,
        bday: theDate,
        year_day: yearDay(theDate),
      });
    });

    console.log('- Date added: ', theDate);

    // Clears the user temp state
    state[curUserId].last_command = null;

    return ctx.reply('Your birthday has been saved successfully!');
  }
};
