const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/jwtSecret');
const Profile = require('../../dbSchema/profile');

const authMiddleware = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  token = token.split(' ')[1];
  try {
    const verified = jwt.verify(token, jwtSecret);
    req.profileId = verified.jwtProfile.profile;
    req.isViewed = true;
    const mess = await Profile.findById(req.profileId).select('messages');
    const { messages } = mess
    if (messages && messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].isViewed === false) {
          req.isViewed = false;
          break;
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Not valid' });
  }
};
module.exports = authMiddleware;
