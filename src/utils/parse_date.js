function parseDate(str) {
  var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/),
    d = m ? new Date(`${m[3]}/${m[2]}/${m[1]} 10:00:00 UTC`) : null,
    matchesPadded =
      d &&
      str ==
        [
          padZero(d.getUTCDate()),
          padZero(d.getUTCMonth() + 1),
          d.getUTCFullYear(),
        ].join('/'),
    matchesNonPadded =
      d &&
      str ==
        [d.getUTCDate(), d.getUTCMonth() + 1, d.getUTCFullYear()].join('/');
  return matchesPadded || matchesNonPadded ? d : null;
}

module.exports = parseDate;
