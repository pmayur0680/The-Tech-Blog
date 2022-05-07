const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');
// Route to show logged in user posts, rendered to all-posts-admin
router.get('/', withAuth, async (req, res) => {  
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    
    const posts = postData.map((post) => {return post.get({ plain: true })});
    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// Show new post form to logged in user only
router.get('/new', withAuth, (req, res) => {  
  res.render('new-post', {    
    layout: 'dashboard',
  });
});

// Allow user to edit his/her post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
