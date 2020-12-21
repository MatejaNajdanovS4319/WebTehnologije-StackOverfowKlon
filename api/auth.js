const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtSecret');
const registerValidator = require('../utils/registerValidator');
const loginValidator = require('../utils/loginValidator');
const authMiddleware = require('./middleware/authMiddleware');

const Profile = require('../dbSchema/profile');

// REGISTER NEW USER
// GUEST - USER
// POST http://localhost:5000/auth/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, job } = req.body;

  if (registerValidator(firstName, lastName, email, password, job)) {
    return res.json({ error: 'Wrong credentials' });
  }
  try {
    let profile = await Profile.findOne({ email });
    if (profile) {
      return res.json({ error: 'User already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    profile = new Profile({ firstName, lastName, email, passwordHash, job });
    await profile.save();

    const profileToSend = {
      _id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      job: profile.job,
    };

    const jwtProfile = { profile: profile.id };
    jwt.sign(
      { jwtProfile },
      jwtSecret,
      { expiresIn: 36000000 },
      (err, token) => {
        res.json({ token, profile: profileToSend, isViewed: req.isViewed });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGIN USER
// GUEST - USER
// POST http://localhost:5000/auth/login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (loginValidator(email, password))
    return res.json({ error: 'Wrong credentials' });
  try {
    let profile = await Profile.findOne({ email }).select(
      '-messages -sentMessages'
    );
    if (!profile) return res.json({ error: 'Wrong credentials' });

    let match = await bcrypt.compare(password, profile.passwordHash);
    if (!match) return res.json({ error: 'Wrong credentials' });

    const profileToSend = {
      _id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      job: profile.job,
    };
    const jwtProfile = { profile: profile.id };
    jwt.sign(
      { jwtProfile },
      jwtSecret,
      { expiresIn: 36000000 },
      (err, token) => {
        res.json({ token, profileToSend, isViewed: req.isViewed });
      }
    );
  } catch (error) {
    res.json({ error: 'Server error' });
  }
});

// CHECK IF USER IS VALID
// GUEST - USER
// GET http://localhost:5000/auth

router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findById(req.profileId).select(
      '-passwordHash -messages -sentMessages'
    );
    if (!profile) return res.json({ error: 'Not logged in' });
    res.json({ profile, isViewed: req.isViewed });
  } catch (err) {
    res.json({ error: 'Server error' });
  }
});
module.exports = router;
