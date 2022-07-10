const CronJob = require('cron').CronJob;

const eventsModel = require('../db/models/events.model');
const bot = require('../bot');
const config = require('../config');
const logger = require('../services/logger.service');
const wishes = require('../constants/wishes.constant');
const strings = require('../constants/strings.constant');
const defaultEvents = require('../constants/default-events.constant');
const buildMultilineMessage = require('../utils/build-multiline-message.utils');
const dayjsPlus = require('../utils/extended-dayjs.util');

module.exports = new CronJob(
  config.cronExecutionTime,
  async function () {
    try {
      logger.info(strings.logger.info.reminderJodStart);

      const day = dayjsPlus().get('date');
      const month = dayjsPlus().get('month') + 1;
      const foundEvents = await eventsModel.aggregate([
        {
          $project: {
            chat_id: 1,
            user_id: 1,
            username: 1,
            first_name: 1,
            event_name: 1,
            event_description: 1,
            year: { $year: '$event_date' },
            month: { $month: '$event_date' },
            day: { $dayOfMonth: '$event_date' },
          },
        },
        {
          $match: {
            day,
            month,
          },
        },
      ]);

      foundEvents.forEach(async (event) => {
        if (defaultEvents[event.event_name]) {
          const randomNumber = Math.floor(
            Math.random() * wishes[defaultEvents[event.event_name]].length
          );
          await bot.telegram.sendMessage(
            event.chat_id,
            buildMultilineMessage([
              `${event.first_name} ${
                strings.defaultEvents[defaultEvents[event.event_name]]
              }`,
              wishes[defaultEvents[event.event_name]][randomNumber],
            ])
          );
          return null;
        }

        await bot.telegram.sendMessage(
          event.chat_id,
          buildMultilineMessage([
            `${strings.events.reminder.partOne} ${event.event_name} ${strings.events.reminder.partTwo}`,
            strings.events.reminder.partThree,
            `${strings.events.fields.eventDate} ${event.event_date}`,
            `${strings.events.fields.eventDesc} ${event.event_description}`,
            `${strings.events.reminder.partFour}`,
          ])
        );

        return null;
      });
    } catch (err) {
      logger.error(`${strings.logger.error.reminderJobExecution} ${err.message}`);
    }
  },
  null,
  true,
  config.cronTimeZone
);
