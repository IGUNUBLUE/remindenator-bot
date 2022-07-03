const crypto = require('crypto');

function getUuid() {
  const newUuid = crypto.randomUUID();
  return newUuid;
}

module.exports = getUuid;
