const express = require('express');
const router = express.Router();
const {
  getGameState,
  saveGameState,
} = require('../controllers/gameStateController');
const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');

router.get('/:telegramId', getGameState);
router.put('/:telegramId', rateLimitMiddleware, saveGameState);

module.exports = router;