const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const {
	createUser,
	getUser,
	loginUser,
} = require('../controller/userController');
const auth = require('../middleware/auth');

router.post('/', createUser);
router.get('/me', auth, getUser);
router.post('/login', loginUser);
module.exports = router;
