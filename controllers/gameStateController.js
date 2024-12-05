const asyncHandler = require('express-async-handler');
const GameState = require('../models/gameStateModel');
const { getInitialGameState } = require('../utils/gameState');
const { queueGameStateSave } = require('../utils/dbOptimization');

// @desc    Get user's game state by Telegram ID
// @route   GET /api/games/:telegramId
// @access  Public
const getGameState = asyncHandler(async (req, res) => {

  const { telegramId } = req.params;
  console.log("------------------>",telegramId);
  let gameState = await GameState.findOne({ telegramId });

  if (!gameState) {
    gameState = await GameState.create({
      telegramId,
      ...getInitialGameState()
    });
  }

  res.status(200).json(gameState);
});

// @desc    Save game state
// @route   PUT /api/games/:telegramId
// @access  Public
const saveGameState = asyncHandler(async (req, res) => {
  const { telegramId } = req.params;
  
  // Queue the save operation instead of immediate save
  queueGameStateSave(telegramId, req.body);

  res.status(200).json({ success: true });
});

module.exports = {
  getGameState,
  saveGameState,
};