module.exports = function buildMultilineMessage(arrayWords = ['']) {
  const strings = arrayWords.map((word, index) => {
    if (index > 0) {
      return `\n${word}`;
    }
    return word;
  });

  return strings.join('');
};
