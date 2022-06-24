function padZero(x) {
  return (('' + x).length == 2 ? '' : '0') + x;
}

module.exports = padZero;
