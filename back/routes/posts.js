const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  getPostsByUser,
} = require('../controllers/posts');

router.get('/', getPosts);
router.get('/:userName', getPostsByUser);
router.post('/', createPost);
router.delete('/:id', deletePost);

module.exports = router;
