const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware');
const createNewPost = require('../utils/postsValidators/createNewPost');
const Post = require('../dbSchema/post');
const Profile = require('../dbSchema/profile');

// GET ALL SEARCHED POSTS
// REGISTERED - USER
// POSTS http://localhost:5000/posts/search
router.post('/search', async (req, res) => {
  try {
    let { searchString } = req.body;
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) return res.json({ error: 'Server error' });
    const searchedPosts = posts.filter((post) => {
      return post.subject.toLowerCase().includes(searchString.toLowerCase());
    });
    return res.json({ searchedPosts });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Server error' });
  }
});

// POST 15 POSTS
// GUEST - USER
// POST http://localhost:5000/posts/get15
router.post('/get15', async (req, res) => {
  let { numPage } = req.body;
  numPage = Number.parseInt(numPage);
  try {
    if (!numPage) {
      const posts = await Post.find()
        .sort({ date: -1 })
        .limit(10)
        .select('-comments');
      return res.json({ posts });
    }
    const posts = await Post.find()
      .sort({ date: -1 })
      .limit(15)
      .skip(numPage * 10)
      .select('-comments');
    if (posts.length === 0 || !posts)
      return res.json({ error: 'There is no more posts!' });
    res.json({ posts });
  } catch (err) {
    return res.json({ error: 'Server error' });
  }
});

// POST A QUESTION
// REGISTERED - USER
// POST http://localhost:5000/posts/
router.post('/', authMiddleware, async (req, res) => {
  const { subject, text } = req.body;
  if (createNewPost(subject, text))
    return res.json({ error: 'Fill in the form correctly' });

  try {
    let { firstName, lastName } = await Profile.findById(req.profileId).select(
      'firstName lastName'
    );
    let post = new Post({
      profile: req.profileId,
      firstName,
      lastName,
      subject,
      text,
    });
    await post.save();
    res.json({ post, isViewed: req.isViewed });
  } catch (err) {
    res.json({ error: 'Server error', isViewed: req.isViewed });
  }
});

// DELETE A POST
// REGISTERED - USER
// DELETE http://localhost:5000/posts/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ error: "Post doesn't exist" });
    if (post.profile !== req.profileId)
      return res.json({ error: 'Not authorized' });
    await post.remove();
    res.json({ msg: 'Post deleted', isViewed: req.isViewed });
  } catch (err) {
    res.json({ error: 'Server error', isViewed: req.isViewed });
  }
});

// LIKE A POST
// REGISTERED - USER
// PUT http://localhost:5000/posts/like/:id
router.put('/like/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.json({ error: "Post doesn't exist", isViewed: req.isViewed });
    if (
      post.likes.filter((like) => {
        return req.profileId === like.profile;
      }).length > 0
    ) {
      post.likes = post.likes.filter((like) => {
        return req.profileId !== like.profile;
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    if (
      post.dislikes.filter((dislike) => {
        return req.profileId === dislike.profile;
      }).length > 0
    ) {
      post.dislikes = post.dislikes.filter((dislike) => {
        return req.profileId !== dislike.profile;
      });
      post.likes.unshift({
        profile: req.profileId,
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    post.likes.unshift({
      profile: req.profileId,
    });
    await post.save();
    res.json({ post, isViewed: req.isViewed });
  } catch (err) {
    res.json({ error: 'Server error', isViewed: req.isViewed });
  }
});

// DISLIKE A POST
// REGISTERED - USER
// PUT http://localhost:5000/posts/dislike/:id
router.put('/dislike/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ error: "Post doesn't exist" });
    if (
      post.dislikes.filter((dislike) => {
        return req.profileId === dislike.profile;
      }).length > 0
    ) {
      post.dislikes = post.dislikes.filter((dislike) => {
        return req.profileId !== dislike.profile;
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    if (
      post.likes.filter((like) => {
        return req.profileId === like.profile;
      }).length > 0
    ) {
      post.likes = post.likes.filter((like) => {
        return req.profileId !== like.profile;
      });
      post.dislikes.unshift({
        profile: req.profileId,
      });
      await post.save();
      return res.json({ post, isViewed: req.isViewed });
    }
    post.dislikes.unshift({
      profile: req.profileId,
    });
    await post.save();
    res.json({ post, isViewed: req.isViewed });
  } catch (err) {
    res.json({ error: 'Server error', isViewed: req.isViewed });
  }
});
module.exports = router;
