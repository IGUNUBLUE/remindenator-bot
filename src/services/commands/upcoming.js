const MongoDB = require('../../db');
const config = require('../../../config');
const yearDay = require('../../utils/year_day');
const padZero = require('../../utils/pad_zero');
const months = require('../../constants/months');
const logger = require('../logger');

const db = new MongoDB(config);

// -- "Upcoming birthdays" command: sends a short list the last 5 upcoming birthdays added for a group -- //
module.exports = async function upcoming(ctx) {
  logger.info('Called /upcoming');

  let theReply = 'Here ya go!\n';

  // Tries to load 5 birthdays starting from todays date
  let upcoming = await db.mongoTransaction('birthdays', async function (coll) {
    return await coll
      .find({
        $query: {
          chat_id: ctx.message.chat.id,
          year_day: { $gt: yearDay(new Date()) },
        },
      })
      .sort({ year_day: 1 })
      .limit(5)
      .toArray();
  });

  // Loads more birthdays starting from January onwards (bug: might send duplicates if there are less than 5 birthdays)
  if (upcoming.length < 5) {
    const moreCumples = await db.mongoTransaction(
      'birthdays',
      async function (coll) {
        return await coll
          .find({ $limit: 2, $query: { chat_id: ctx.message.chat.id } })
          .sort({ year_day: 1 })
          .limit(5 - upcoming.length)
          .toArray();
      }
    );
    upcoming = upcoming.concat(moreCumples);
  }

  upcoming.forEach((cumple) => {
    const name = cumple.username == null ? cumple.first_name : cumple.username;

    // Format example: "MrUser: 23 December"
    theReply += `*${name}*: ${padZero(cumple.bday.getUTCDate())} ${
      months[cumple.bday.getUTCMonth()]
    }\n`;
  });

  ctx.replyWithMarkdown(theReply);
};
