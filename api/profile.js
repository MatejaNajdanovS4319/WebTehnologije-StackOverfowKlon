const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware');
const Profile = require('../dbSchema/profile');

// GET LOGED PROFILE
// REGISTERED - USER
// GET http://localhost:5000/profile/
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findById(req.profileId).select(
      '-passwordHash -messages -sentMessages'
    );
    res.json({ profile, isViewed: req.isViewed  });
  } catch (err) {
    res.json({ error: 'Server error' });
  }
});

// VIEW PROFILE
// GUEST - USER
// GET http://localhost:5000/profile/:id
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).select(
      '-passwordHash -messages -sentMessages'
    );
    if (!profile)
      return res.json({ error: "Profile doesn't exist" });
    res.json({ profile });
  } catch (err) {
    res.json({ error: 'Server error' });
  }
});
module.exports = router;
