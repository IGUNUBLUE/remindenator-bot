const CronJob = require('cron').CronJob;

const wishes = require('../constants/birthday_wishes.json');
// -- The cron job. Runs everyday at 8:30. -- //
const start = new CronJob(
  '30 8 * * *',
  async function () {
    console.log('Cron job has been fired');

    // Finds all groups
    const groups = await db.find('groups');

    groups.forEach(async (grp) => {
      var day_find = yearDay(new Date());

      var birthdays = await db.find('birthdays', {
        chat_id: grp.chat_id,
        year_day: day_find,
      });

      // Doing a second check if it's not a leap year (birthdays on the 29th of February will be called on the 28th)
      if (day_find == 59 && !isLeapYear(new Date())) {
        birthdays = birthdays.concat(
          await db.find('birthdays', {
            chat_id: grp.chat_id,
            year_day: day_find + 1,
          })
        );
      }

      birthdays.forEach(async (cumple) => {
        const year = cumple.bday.getFullYear();
        const old =
          year == 1804
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
        var rand = Math.floor(Math.random() * wishes.length);
        await bot.telegram.sendMessage(
          grp.chat_id,
          `${wishes[rand]} - Happy birthday! 🥳`
        );
      });
    });
  },
  null,
  true,
  'Europe/Rome'
);

module.exports = start;
