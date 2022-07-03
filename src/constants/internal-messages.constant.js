const replaceCases = require('./replace-cases.constant');

module.exports = {
  commands: {
    start: {
      info: {
        executionReply: `👋🏻 Hi, I'm remindenator!\nI'm a bot created to help you remember important events. \nType /help to show you how to use my commands..`,
        log: 'Called /start',
      },
    },
    add: {
      info: {
        executionReply: '',
        log: 'Called /add',
        importantEvent: `I won't forget your ${replaceCases.command.messages.importEventName}!! 😎`,
        normalEvent: 'Great! I will remind you of this event.',
      },
      warn: {
        typeChat: 'Sorry... I just can work in groups.',
        minimumCharacterEventName: 'Please write a real event name.',
        validStringEventName:
          "Ups... Event name can't contain special characters",
        validDate: "mmm... I think the date don't have the correct format.",
      },
      error: {},
    },
  },
  app: {
    info: {
      db: {
        connect: 'Database connected successfully',
      },
      bot: {
        firstStar: 'Bot started successfully!',
      },
    },
    warn: {},
    error: {},
  },
};
