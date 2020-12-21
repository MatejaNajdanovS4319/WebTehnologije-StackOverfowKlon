const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  profile: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  comments: [
    {
      profile: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      likes: [
        {
          profile: {
            type: String,
          },
        },
      ],
      dislikes: [
        {
          profile: {
            type: String,
          },
        },
      ],
      date: {
          type: Date,
          default: Date.now,
      }
    },
  ],
  likes: [
    {
      profile: {
        type: String,
      },
    },
  ],
  dislikes: [
    {
      profile: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
}
});
module.exports = Post = mongoose.model('Post', PostSchema);
