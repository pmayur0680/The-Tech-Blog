const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Save new post to database. allowed to logged in user only
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update new post to database. allowed to logged in user only
router.put('/:id', withAuth, async (req, res) => {  
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete user post. allowed to logged in user only
router.delete('/:id', withAuth, async (req, res) => {  
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedPost) {
      res.status(200).json({message: 'Post has been deleted.'});
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
