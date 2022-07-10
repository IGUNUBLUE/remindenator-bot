const typeChats = require('../constants/type-chats.constant');

module.exports = function typeChatVerification(type) {
  if (type === typeChats.channel) {
    return true;
  }
  if (type === typeChats.private) {
    return true;
  }
  if (type === typeChats.group) {
    return true;
  }

  return false;
};
