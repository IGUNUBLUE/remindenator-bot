require('dotenv').config({ path: './.env' });

module.exports = {
  telegraf_key: process.env.TG_TOKEN,
  mongo_url: process.env.MONGODB_URL,
  mongo_db_name: process.env.BD_NAME,
  eventsCollection: 'events',
  groupsCollection: 'groups',
  cronTimeZone: process.env.CRON_TIME_ZONE,
};
