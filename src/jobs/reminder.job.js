const CronJob = require('cron').CronJob;

const db = require('../db');
const config = require('../config');
const logger = require('../services/logger.service');
const wishes = require('../constants/birthday_wishes.json');
const isLeapYear = require('../utils/is_leap_year');
const yearDay = require('../utils/year_day');
// -- The cron job. Runs everyday at 8:30. -- //
const executionTime = '30 8 * * *';
const events = config.eventsCollection;
const pipeline = [{ $match: {} }];

function reminderJob(bot) {
  return new CronJob(
    executionTime,
    async function () {
      logger.info('Cron job has been fired');
      const reminders = await db.getDocuments(
        config.eventsCollection,
        pipeline
      );
      reminders.forEach(async (grp) => {
        const dayFind = yearDay(new Date());

        let foundEvents = await db.getReminders(events, {
          chat_id: grp.chat_id,
          year_day: dayFind,
        });

        // Doing a second check if it's not a leap year (birthdays on the 29th of February will be called on the 28th)
        if (dayFind === 59 && !isLeapYear(new Date())) {
          foundEvents = foundEvents.concat(
            await db().getReminders(events, {
              chat_id: grp.chat_id,
              year_day: dayFind + 1,
            })
          );
        }

        foundEvents.forEach(async (cumple) => {
          const year = cumple.bday.getFullYear();
          const old =
            year === 1804
              ? ''
              : ` They're now ${new Date().getFullYear() - year} years old!`;

          const name =
            cumple.username == null
              ? `*${cumple.first_name}*'s`
              : `@${cumple.username}'s`;

          // "Today it's @someuser' birthday. (They're now 21 years old! optional)"
          await bot.telegram.sendMessage(
            grp.chat_id,
            `Today it's ${name} birthday.${old}`
          );

          // Selects a random birthday wish from file
          const rand = Math.floor(Math.random() * wishes.length);
          await bot.telegram.sendMessage(
            grp.chat_id,
            `${wishes[rand]} - Happy birthday! 🥳`
          );
        });
      });
    },
    null,
    true,
    config.cronTimeZone
  );
}

module.exports = reminderJob;
