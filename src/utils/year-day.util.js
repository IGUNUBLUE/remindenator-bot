const month_days = require('../constants/month_days');
// -- Given a date object, returns the number of days elapsed from January 1st of the give year -- //
function yearDay(date) {
  var the_day = date.getUTCDate();
  for (var i = 0; i < date.getUTCMonth(); i++) {
    the_day += month_days[i];
  }
  return the_day;
}

module.exports = yearDay;
