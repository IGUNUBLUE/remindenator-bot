const internalMessages = require('../../constants/internal-messages.constant');
const formatDates = require('../../constants/format-dates.constant');
const typeChats = require('../../constants/type-chats.constant');
const replaceCases = require('../../constants/replace-cases.constant');
const logger = require('../logger.service');
const EventModel = require('../../db/models/events.model');
const getUuid = require('../../utils/get-uuid.utils');
const importantEvents = require('../../constants/important-events.constant');
const dateModule = require('../../utils/date-module.util');

module.exports = async function addEvent(ctx) {
  logger.info(internalMessages.commands.add.info.log);
  const type = ctx.message.chat.type;
  const textInCommand = ctx.message.text.replace('/add', '');
  const eventName = textInCommand.split('|')[0].trim();
  const eventDate = textInCommand.split('|')[1].trim();

  if (type === typeChats.private || type === typeChats.channel) {
    return ctx.replyWithMarkdown(internalMessages.commands.add.warn.typeChat);
  }
  if (eventName.length <= 3 || eventName.length > 30) {
    return ctx.reply(
      internalMessages.commands.add.warn.minimumCharacterEventName
    );
  }
  if (!dateModule(eventDate, formatDates.user.events, true).isValid()) {
    return ctx.reply(internalMessages.commands.add.warn.validDate);
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
    dateModule(foundEvent.event_date).isSame(new Date(isoDateFormat))
  ) {
    return ctx.replyWithMarkdown(
      `${internalMessages.commands.add.warn.thereIsSimilarEvent}\n➤ ${
        importantEvents[eventName] ? 'My birthday' : eventName
      }\n➤ ${eventDate}\n➤ ${eventDescription}`
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

  if (importantEvents[eventName]) {
    const message = internalMessages.commands.add.info.importantEvent.replace(
      replaceCases.command.messages.importEventName,
      importantEvents[eventName]
    );
    return ctx.replyWithMarkdown(message);
  }

  return ctx.replyWithMarkdown(internalMessages.commands.add.info.normalEvent);
};
