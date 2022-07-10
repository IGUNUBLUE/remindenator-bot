const mongoose = require('mongoose');

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
  { timestamps: true }
);

const EventModel = mongoose.model('Events', eventsSchema);

module.exports = EventModel;
