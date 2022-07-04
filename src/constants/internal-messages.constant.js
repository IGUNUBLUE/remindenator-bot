module.exports = {
  commands: {
    start: {
      info: {
        executionReply: `👋🏻 Hi, I'm remindenator!\nI'm a bot created to help you remember important events.`,
        log: 'Called /start',
      },
    },
    add: {
      info: {
        executionReply: '',
        log: 'Called /add',
        importantEvent: ["I won't forget your", '!! 😎.'],
        normalEvent: 'Great! I will remind you of this event.',
      },
      warn: {
        typeChat: 'Sorry... I just can work in groups.',
        minimumCharacterEventName: 'Please write a real event name.',
        validStringEventName:
          "Ups... Event name can't contain special characters.",
        validDate: "mmm... I think the date don't have the correct format.",
        thereIsSimilarEvent:
          '😲 I think you created this event before. Look at this:',
      },
      error: {},
    },
  },
  importantEvents: {
    birthday: '🥳 HAPPY BIRTHDAY!!',
  },
  others: {
    info: {
      dbConnection: 'Database connected successfully',
      firstStar: 'Bot started successfully!',
      reminderJodStart: 'Cron job has been fired',
    },
    warn: {},
    error: {},
  },
};
