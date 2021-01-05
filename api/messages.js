const express = require('express');
const router = express.Router();
const messageTextValidator = require('../utils/messageTextValidator');
const authMiddleware = require('./middleware/authMiddleware');
const Profile = require('../dbSchema/profile');

// GET MESSAGES
// REGISTERED - USER
// GET http://localhost:5000/messages
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Profile.findById(req.profileId).select('messages');
    if (messages.length === 0) {
      return res.json({ error: 'Inbox is empty', isViewed: req.isViewed });
    }
    return res.json({ messages, isViewed: req.isViewed });
  } catch (err) {
    res.json({ error: err });
  }
});

// GET SENT MESSAGES
// REGISTERED - USER
// GET http://localhost:5000/messages/sent
router.get('/sent', authMiddleware, async (req, res) => {
  try {
    const messages = await Profile.findById(req.profileId).select(
      'sentMessages'
    );
    if (messages.length === 0) {
      return res.json({ error: 'Inbox is empty', isViewed: req.isViewed });
    }
    return res.json({ messages, isViewed: req.isViewed });
  } catch (err) {
    res.json({ error: err });
  }
});

// SEND MESSAGE
// REGISTERED - USER
// POST http://localhost:5000/messages/sendMessage/:id
router.post('/sendMessage/:id', authMiddleware, async (req, res) => {
  const { text } = req.body;
  if (messageTextValidator(text)) {
    return res.json({ err: 'Please fill form!' });
  }
  try {
    if (req.profileId === req.params.id) {
      const profile = await Profile.findById(req.profileId);
      if (!profile)
        return res
          .status(500)
          .json({ error: 'Server error', isViewed: req.isViewed });
      profile.sentMessages.unshift({
        email: profile.email,
        text,
      });
      profile.messages.unshift({
        email: profile.email,
        text,
      });
      await profile.save();
      return res.json({ error: 'Message has been sent', isViewed: req.isViewed })
    }
    const profileFrom = await Profile.findById(req.profileId);
    const profileTo = await Profile.findById(req.params.id);
    if (!profileFrom || !profileTo)
      return res
        .status(500)
        .json({ error: 'Server error', isViewed: req.isViewed });

    profileFrom.sentMessages.unshift({
      email: profileTo.email,
      text,
    });

    profileTo.messages.unshift({
      email: profileFrom.email,
      text,
    });
    await profileFrom.save();
    await profileTo.save();
    res.json({ error: 'Message has been sent', isViewed: req.isViewed });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Server error' });
  }
});

// VIEW MESSAGE
// REGISTERED - USER
// PUT http://localhost:5000/messages/viewMessage/:messId
router.put('/viewMessage/:messId', authMiddleware, async (req, res) => {
  try {
    let profile = await Profile.findById(req.profileId);
    if (profile.messages.id(req.params.messId).isViewed === true)
      return res.json({ error: 'Message viewed' });
    profile.messages.id(req.params.messId).isViewed = true;
    await profile.save();
    res.json({ error: 'Message viewed', isViewed: req.isViewed });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Server error', isViewed: req.isViewed });
  }
});
module.exports = router;
