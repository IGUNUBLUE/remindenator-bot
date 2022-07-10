const EventModel = require('../../db/models/events.model');
const logger = require('../logger.service');
const strings = require('../../constants/strings.constant');
const timePeriods = require('../../constants/time-periods.constant');
const defaultEvents = require('../../constants/default-events.constant');
const typeChatVerification = require('../../utils/type-chat-verification.utils');
const getUuid = require('../../utils/get-uuid.utils');
const dayjsPlus = require('../../utils/extended-dayjs.util');
const getFullCommand = require('../../utils/get-full-command.utils');
const buildMultilineMessage = require('../../utils/build-multiline-message.utils');

const MINIMUM_LENGTH = 3;
const MAXIMUM_LENGTH = 30;

module.exports = async function addEvent(ctx, commandName) {
  try {
    if (typeChatVerification(ctx.message.chat.type)) {
      return ctx.replyWithMarkdown(strings.main.typeChat);
    } else {
      const { fullCmd } = getFullCommand(commandName);
      const textInCommand = ctx.message.text.replace(fullCmd, '');

      if (!textInCommand.length || !textInCommand.includes('|')) {
        return ctx.replyWithMarkdown(
          strings.commands.addEvent.withoutFieldsDividerOrCharacters
        );
      }

      const eventName = textInCommand.split('|')[0].trim();
      const eventDate = textInCommand.split('|')[1].trim();

      if (
        eventName.length <= MINIMUM_LENGTH ||
        eventName.length > MAXIMUM_LENGTH ||
        !dayjsPlus(eventDate, timePeriods.format.user.eventsDate, true).isValid()
      ) {
        return ctx.replyWithMarkdown(
          strings.commands.addEvent.lengthEventNameOrFormatDate
        );
      }

      const {
        from: { id: userId, first_name: firstName, username },
        chat: { id: chatId },
      } = ctx.message;

      const eventDescription = textInCommand.split('|')[2] || '';
      const [day, month, year] = eventDate.split('-');
      const isoDate = `${year}-${month}-${day}`;
      const foundEvent = await EventModel.findOne({
        user_id: userId,
        event_name: eventName,
        event_date: isoDate,
      }).exec();

      if (
        foundEvent &&
        eventName === foundEvent.event_name &&
        dayjsPlus(foundEvent.event_date).isSame(new Date(isoDate))
      ) {
        const event = defaultEvents[eventName];
        return ctx.replyWithMarkdown(
          buildMultilineMessage([
            strings.commands.addEvent.thereIsSimilarEvent,
            `*${strings.events.fields.eventName}* ${event ? `My ${event}` : eventName}`,
            `*${strings.events.fields.eventDate}* ${eventDate}`,
            `*${strings.events.fields.eventDesc}* ${eventDescription}`,
          ])
        );
      }

      const newEvent = new EventModel({
        _id: getUuid(),
        chat_id: chatId,
        user_id: userId,
        username,
        first_name: firstName,
        event_date: isoDate,
        event_name: eventName,
        event_description: eventDescription,
      });
      await newEvent.save();

      if (defaultEvents[eventName]) {
        const { partOne, partTwo } = strings.commands.addEvent.defaultEvent;
        ctx.replyWithMarkdown(`${partOne} ${defaultEvents[eventName]}${partTwo}`);
      } else {
        ctx.replyWithMarkdown(strings.commands.addEvent.normalEvent);
      }

      return logger.info(`${fullCmd} ${strings.logger.info.successCmd}`);
    }
  } catch (err) {
    console.log(err);
  }
};
