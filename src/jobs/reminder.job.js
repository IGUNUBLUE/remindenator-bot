/**
 * TODO: remember use the default event to identify when the is a birthday.
 */

// const CronJob = require('cron').CronJob;

// const eventsModel = require('../db/models/events.model');
// const bot = require('../bot');
// const config = require('../config');
// const logger = require('../services/logger.service');
// const wishes = require('../constants/birthday-wishes.constant');
// const isLeapYear = require('../utils/is-leap-year.util');
// const yearDay = require('../utils/year-day.util');
// // -- The cron job. Runs everyday at 8:30. -- //
// const executionTime = '30 8 * * *';

// module.exports = new CronJob(
//   executionTime,
//   async function () {
//     logger.info('Cron job has been fired');
//     const events = await eventsModel.find({ event_date: new Date() }).exec();
//     events.forEach(async (grp) => {
//       const dayFind = yearDay(new Date());

//       // Doing a second check if it's not a leap year (birthdays on the 29th of February will be called on the 28th)
//       if (dayFind === 59 && !isLeapYear(new Date())) {
//         foundEvents = foundEvents.concat(
//           await db().getReminders(events, {
//             chat_id: grp.chat_id,
//             year_day: dayFind + 1,
//           })
//         );
//       }

//       foundEvents.forEach(async (cumple) => {
//         const year = cumple.bday.getFullYear();
//         const old =
//           year === 1804
//             ? ''
//             : ` They're now ${new Date().getFullYear() - year} years old!`;

//         const name =
//           cumple.username == null
//             ? `*${cumple.first_name}*'s`
//             : `@${cumple.username}'s`;

//         // "Today it's @someuser' birthday. (They're now 21 years old! optional)"
//         await bot.telegram.sendMessage(
//           grp.chat_id,
//           `Today it's ${name} birthday.${old}`
//         );

//         // Selects a random birthday wish from file
//         const rand = Math.floor(Math.random() * wishes.length);
//         await bot.telegram.sendMessage(
//           grp.chat_id,
//           `${wishes[rand]} - Happy birthday! 🥳`
//         );
//       });
//     });
//   },
//   null,
//   true,
//   config.cronTimeZone
// );
