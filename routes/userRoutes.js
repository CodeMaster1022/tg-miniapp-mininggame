const express = require('express');
const router = express.Router();
const { authenticateTelegramUser } = require('../controllers/userController');

router.post('/telegram-auth', authenticateTelegramUser);

module.exports = router;