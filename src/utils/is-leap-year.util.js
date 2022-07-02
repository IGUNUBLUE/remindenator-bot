// -- Given a date object, returns whether or not it's a leap year -- //
function isLeapYear(date) {
  const year = date.getUTCFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

module.exports = isLeapYear;
