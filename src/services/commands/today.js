// -- "Today's birthdays" command: sends a list with today's birthdays -- //
const MongoDB = require('../../db');
const config = require('../../../config');
const yearDay = require('../../utils/year_day');
const padZero = require('../../utils/pad_zero');
const isLeapYear = require('../../utils/is_leap_year');
const months = require('../../constants/months');
const logger = require('../logger');

const db = new MongoDB(config);

module.exports = async function today(ctx) {
  logger.info('Called /today');

  const dayFind = yearDay(new Date());

  let birthdays = await db.find('birthdays', {
    chat_id: ctx.message.chat.id,
    year_day: dayFind,
  });

  // Doing a second check if it's not a leap year (birthdays on the 29th of February will be called on the 28th)
  if (dayFind === 59 && !isLeapYear(new Date())) {
    birthdays = birthdays.concat(
      await db.find('birthdays', {
        chat_id: ctx.message.chat.id,
        year_day: dayFind + 1,
      })
    );
  }

  if (birthdays.length === 0) {
    return ctx.reply('No birthdays today :(');
  }

  await ctx.reply(
    'Here' +
      (birthdays.length > 1 ? ' are' : "'s") +
      " today's birthday" +
      (birthdays.length > 1 ? 's:' : ':')
  );

  // Sends a different message for every birthday
  birthdays.forEach(async (cumple) => {
    const year = cumple.bday.getFullYear();
    const old =
      year === 1804
        ? ''
        : `... now ${new Date().getFullYear() - year} years old!`;

    const name =
      cumple.username == null
        ? `*${cumple.first_name}*'s`
        : `@${cumple.username}'s`;

    // Format example: "@someuser's: 26 November (... now 21 years old! optional) - Happy birthday! 🥳"
    await ctx.reply(
      `${name}: ${padZero(cumple.bday.getUTCDate())} ${
        months[cumple.bday.getUTCMonth()]
      }${old} - Happy birthday! 🥳`
    );
  });
};
