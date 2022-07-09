const EventModel = require('../../db/models/events.model');
const logger = require('../logger.service');
const textStrings = require('../../constants/text-strings.constant');
const timePeriods = require('../../constants/time-periods.constant');
const defaultEvents = require('../../constants/default-events.constant');
const typeChatVerification = require('../../utils/type-chat-verification.utils');
const getUuid = require('../../utils/get-uuid.utils');
const dayjsPlus = require('../../utils/extended-dayjs.util');
const getFullCommand = require('../../utils/get-full-command.utils');

const MINIMUM_LENGTH = 3;
const MAXIMUM_LENGTH = 30;

module.exports = async function addEvent(ctx, commandName) {
  try {
    if (typeChatVerification(ctx.message.chat.type)) {
      return ctx.replyWithMarkdown(textStrings.main.typeChat);
    } else {
      const { fullCmd } = getFullCommand(commandName);
      const textInCommand = ctx.message.text.replace(fullCmd, '');

      if (!textInCommand.length || !textInCommand.includes('|')) {
        return ctx.reply(textStrings.commands.addEvent.withoutFieldsDividerOrCharacters);
      }

      const eventName = textInCommand.split('|')[0].trim();
      const eventDate = textInCommand.split('|')[1].trim();

      if (
        eventName.length <= MINIMUM_LENGTH ||
        eventName.length > MAXIMUM_LENGTH ||
        !dayjsPlus(eventDate, timePeriods.format.user.eventsDate, true).isValid()
      ) {
        return ctx.reply(textStrings.commands.addEvent.lengthEventNameOrFormatDate);
      }

      const {
        from: { id: userId, first_name: firstName, username },
        chat: { id: chatId },
      } = ctx.message;
      const eventDescription = textInCommand.split('|')[2] || '';
      const [day, month, year] = eventDate.split('-');
      const isoDateFormat = `${year}-${month}-${day}`;
      const foundEvent = await EventModel.findOne({
        user_id: userId,
        event_name: eventName,
        event_date: isoDateFormat,
      }).exec();

      if (
        foundEvent &&
        eventName === foundEvent.event_name &&
        dayjsPlus(foundEvent.event_date).isSame(new Date(isoDateFormat))
      ) {
        return ctx.replyWithMarkdown(
          `${textStrings.commands.addEvent.thereIsSimilarEvent}\n *${
            textStrings.events.fields.eventName
          }*${
            defaultEvents[eventName] ? `My ${defaultEvents[eventName]}` : eventName
          }\n*${textStrings.events.fields.eventDate}*${eventDate}\n*${
            textStrings.events.fields.eventDesc
          }*${eventDescription}`
        );
      }

      const newEvent = new EventModel({
        _id: getUuid(),
        chat_id: chatId,
        user_id: userId,
        username,
        first_name: firstName,
        event_date: isoDateFormat,
        event_name: eventName,
        event_description: eventDescription,
      });
      await newEvent.save();

      if (defaultEvents[eventName]) {
        const [startFragment, endFragment] = textStrings.commands.addEvent.importantEvent;
        ctx.replyWithMarkdown(
          `${startFragment} ${defaultEvents[eventName]}${endFragment}`
        );
      } else {
        ctx.replyWithMarkdown(textStrings.commands.addEvent.normalEvent);
      }

      return logger.info(`${fullCmd} ${textStrings.logger.info.successCmd}`);
    }
  } catch (err) {
    console.log(err);
  }
};
