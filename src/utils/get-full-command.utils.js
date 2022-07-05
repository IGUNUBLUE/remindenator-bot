module.exports = function getFullCommand(commandName = '/') {
  const fullName = `/${commandName}`;
  const lengthName = fullName.length;
  const result = { fullCmd: fullName, cmdLength: lengthName };

  return result;
};
