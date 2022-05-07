const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
// Import the custom middleware
const withAuth = require('../utils/auth');
// get all posts for homepage
router.get('/', async (req, res) => {  
  try {
    const postData = await Post.findAll({
      include: [
        {model: User}
      ]}
    );
    const posts = postData.map((post) => {return post.get({ plain: true})})
    console.log(posts);
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
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {model: User}
    ]});
  const post = postData.get({ plain: true }); 
  res.render('single-post', { post, loggedIn: req.session.loggedIn });
 } catch (err) {
  console.log(err);
  res.status(500).json(err);
 }
});

// show login page to new user, logged in redirect to home page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// show signup page to new user, logged in redirect to home page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
