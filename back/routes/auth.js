const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getAllUsers,
  getUserById,
} = require('../controllers/user');

router.post('/signup', signup);

router.post('/login', login);

router.get('/users', getAllUsers);

router.get('/user/:id', getUserById);

module.exports = router;
