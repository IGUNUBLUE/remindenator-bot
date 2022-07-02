// -- "All birthdays" command: sends a list of all the birthdays added for a group -- //
const MongoDB = require('../../db');
const config = require('../../config');
const months = require('../../constants/months');
const padZero = require('../../utils/pad-zero.util');
const logger = require('../logger-service');

const db = new MongoDB(config);

module.exports = async function list(ctx) {
  logger.info('Called /list');

  let theReply = 'Here ya go!\n';
  const result = await db.find('birthdays', { chat_id: ctx.message.chat.id });

  result.forEach((cumple) => {
    const name = cumple.username == null ? cumple.first_name : cumple.username;

    // Format example: "MrUser: 23 December"
    theReply += `*${name}*: ${padZero(cumple.bday.getUTCDate())} ${
      months[cumple.bday.getUTCMonth()]
    }\n`;

    /* THIS Happened here: https://www.youtube.com/watch?v=-5wpm-gesOY
        console.log(
        'Date: ', cumple.bday, 
        'Old year_day', cumple.year_day, 
        'Year_day CALC', yearDay(cumple.bday), 
        'CHECK', cumple.year_day == yearDay(cumple.bday), 
        'DAY: ', cumple.bday.getUTCDate(),
        'NAME: ', cumple.username ); */
  });

  ctx.replyWithMarkdown(theReply);
};
