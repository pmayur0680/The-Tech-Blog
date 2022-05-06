const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
// Import the custom middleware
const withAuth = require('../utils/auth');
// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => {return post.get({ plain: true})})
    res.render('all-posts', { 
      posts,
      loggedIn: req.session.loggedIn,
     });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', withAuth, async (req, res) => {
 try {
  const postData = await Post.findByPk(req.params.id);
  const post = postData.get({ plain: true });
  res.render('single-post', { post, loggedIn: req.session.loggedIn });

 } catch (err) {
  console.log(err);
  res.status(500).json(err);
 }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
