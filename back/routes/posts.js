const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getPost,
} = require('../controllers/posts');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
