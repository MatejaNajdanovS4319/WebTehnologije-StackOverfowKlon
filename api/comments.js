const express = require('express');
const router = express.Router();
const Post = require('../dbSchema/post');
const Profile = require('../dbSchema/profile');
const authMiddleware = require('./middleware/authMiddleware');
const createNewCommentValidator = require('../utils/postsValidators/createNewComment');

// GET POST AND ALL IT'S COMMENTS
// GUEST - USER
// GET http://localhost:5000/comments/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ error: "Post doesn't exist" });
    res.json({ post });
  } catch (err) {
    res.json({ error: 'Server error' });
  }
});

// ADD A COMMENT TO POST
// REGISTER - USER
// POST http://localhost:5000/comments/:id
router.post('/:id', authMiddleware, async (req, res) => {
  const { text } = req.body;
  if (createNewCommentValidator(text)) {
    return res.json({ error: 'Enter text in form!' });
  }
  try {
    const { firstName, lastName } = await Profile.findById(
      req.profileId
    ).select('firstName lastName');
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ error: "Post doesn't exist" });
    post.comments.unshift({
      profile: req.profileId,
      firstName,
      lastName,
      text,
    });
    await post.save();
    res.json({ post, isViewed: req.isViewed  });
  } catch (err) {
    res.json({ error: 'Server error' });
  }
});

// DELETE COMMENT
// REGISTER - USER
// DELETE http://localhost:5000/comments/:postId/:commentId
router.delete('/:postId/:commentId', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.json({ error: "Post doesn't exist" });
    if (!post.comments.id(req.params.commentId))
      return res.json({ error: 'Comment doesnt exist!' });

    if (post.comments.id(req.params.commentId).profile !== req.profileId)
      return res.json({ error: 'Not authorized!' });

    post.comments = post.comments.filter((comment) => {
      return comment.id !== req.params.commentId;
    });
    await post.save();
    res.json({ post, isViewed: req.isViewed  });
  } catch (err) {
    res.json({ error: 'Server error' });
  }
});

// LIKE A COMMENT
// REGISTER - USER
// PUT http://localhost:5000/comments/like/:postId/:commentId
router.put('/like/:postId/:commentId', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.json({ error: "Post doesn't exist" });
    const comment = post.comments.id(req.params.commentId);
    // post.comments.id(req.params.commentId)
    if (
      comment.likes.filter((like) => {
        return req.profileId === like.profile;
      }).length > 0
    ) {
      comment.likes = comment.likes.filter((like) => {
        return req.profileId !== like.profile;
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    if (
      comment.dislikes.filter((dislike) => {
        return req.profileId === dislike.profile;
      }).length > 0
    ) {
      comment.dislikes = comment.dislikes.filter((dislike) => {
        return req.profileId !== dislike.profile;
      });
      comment.likes.unshift({
        profile: req.profileId,
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    comment.likes.unshift({
      profile: req.profileId,
    });
    await post.save();
    res.json({ post, isViewed: req.isViewed });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Server error' });
  }
});

// DISLIKE A COMMENT
// REGISTER - USER
// PUT http://localhost:5000/comments/dislike/:postId/:commentId
router.put('/dislike/:postId/:commentId', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.json({ error: "Post doesn't exist" });
    const comment = post.comments.id(req.params.commentId);
    // post.comments.id(req.params.commentId)
    if (
      comment.dislikes.filter((like) => {
        return req.profileId === like.profile;
      }).length > 0
    ) {
      comment.dislikes = comment.dislikes.filter((like) => {
        return req.profileId !== like.profile;
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    if (
      comment.likes.filter((dislike) => {
        return req.profileId === dislike.profile;
      }).length > 0
    ) {
      comment.likes = comment.likes.filter((like) => {
        return req.profileId !== like.profile;
      });
      comment.dislikes.unshift({
        profile: req.profileId,
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    comment.dislikes.unshift({
      profile: req.profileId,
    });
    await post.save();
    res.json({ post, isViewed: req.isViewed });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Server error', isViewed: req.isViewed });
  }
});
module.exports = router;
