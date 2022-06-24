function parseDateNoYear(str) {
  var m = str.match(/^(\d{1,2})\/(\d{1,2})$/),
    d = m ? new Date(`1804/${m[2]}/${m[1]} 10:00:00 UTC`) : null,
    matchesPadded =
      d &&
      str == [padZero(d.getUTCDate()), padZero(d.getUTCMonth() + 1)].join('/'),
    matchesNonPadded =
      d && str == [d.getUTCDate(), d.getUTCMonth() + 1].join('/');
  return matchesPadded || matchesNonPadded ? d : null;
}

module.exports = parseDateNoYear;
