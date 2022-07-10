const mongoose = require('mongoose');
const config = require('../../config');

const eventsSchema = new mongoose.Schema(
  {
    _id: String,
    chat_id: Number,
    user_id: Number,
    username: String,
    first_name: String,
    event_date: Date,
    event_name: String,
    event_description: String,
  },
  { collection: config.eventsCollection },
  { timestamps: true }
);

const EventModel = mongoose.model('Events', eventsSchema);

module.exports = EventModel;
