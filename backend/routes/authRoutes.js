const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { createAuth } = require('../controller/authController');

router.post('/', createAuth);
module.exports = router;
