const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user');

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.patch('/update/user', updateUser);
router.delete('/delete/user', deleteUser);

module.exports = router;
