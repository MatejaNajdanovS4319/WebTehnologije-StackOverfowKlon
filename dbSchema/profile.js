const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  messages: [
    {
      email: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      isViewed: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  sentMessages: [
    {
      email: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
