module.exports = {
  main: {
    typeChat: 'Sorry... I just can work in groups.',
  },
  commands: {
    start: {
      executionReply: `👋🏻 Hi, I'm remindenator!\nI'm a bot created to help you remember important events.`,
    },
    addEvent: {
      defaultEvent: { partOne: "I won't forget your", partTwo: '!! 😎.' },
      normalEvent: 'Great! I will remind you of this event.',
      lengthEventNameOrFormatDate:
        "Please write a real event name. Perhaps it is too short or too long or I think the date don't have the correct format.",
      withoutFieldsDividerOrCharacters:
        'Are you kidding me? Please, follow the command structure.',
      thereIsSimilarEvent: '😲 I think you created this event before. Look at this:',
    },
  },
  events: {
    reminder: { partOne: 'Hi!, The event: ', partTwo: "you're welcome!🦾" },
    fields: {
      eventName: 'Event Name: ',
      eventDate: 'Event date: ',
      eventDesc: 'Event description: ',
    },
  },
  defaultEvents: {
    birthday: '🥳 HAPPY BIRTHDAY!!',
  },
  logger: {
    info: {
      successCmd: 'command successfully execution',
      dbConnection: 'Database connected successfully',
      firstStar: 'Bot started successfully!',
      reminderJodStart: 'Cron job has been fired',
    },
    warn: {},
    error: {
      reminderJobExecution: 'Something went wrong!',
    },
  },
};
