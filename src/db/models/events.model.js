const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  group_id: String,
  user_id: String,
  username: String,
  first_name: String,
  event_date: Date,
  event_name: String,
  event_description: String,
});

const eventsModel = mongoose.model('Events', eventsSchema);

module.exports = eventsModel;
