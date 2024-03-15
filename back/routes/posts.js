const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  getPostsByUser,
  updatePost,
} = require('../controllers/posts');

router.get('/', getPosts);
router.get('/:userName', getPostsByUser);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
