const monthDays = require('../constants/month-days.constants');
// -- Given a date object, returns the number of days elapsed from January 1st of the give year -- //
function yearDay(date) {
  let theDay = date.getUTCDate();
  for (let i = 0; i < date.getUTCMonth(); i++) {
    theDay += monthDays[i];
  }
  return theDay;
}

module.exports = yearDay;
