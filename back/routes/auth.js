const express = require('express');
const router = express.Router();
const { signup, login, getAllUsers } = require('../controllers/user');

router.post('/signup', signup);

router.post('/login', login);

router.get('/users', getAllUsers);

module.exports = router;
