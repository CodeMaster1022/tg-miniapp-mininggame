const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { verifyTelegramWebAppData } = require('../utils/telegramAuth');

// @desc    Authenticate Telegram user or create if not exists
// @route   POST /api/users/telegram-auth
// @access  Public
const authenticateTelegramUser = asyncHandler(async (req, res) => {
  const initData = req.body.initData;
  
  // Verify Telegram Web App data
  const telegramUser = verifyTelegramWebAppData(initData);
  if (!telegramUser) {
    res.status(401);
    throw new Error('Invalid Telegram authentication');
  }

  // Find or create user
  let user = await User.findOne({ telegramId: telegramUser.id });

  if (!user) {
    user = await User.create({
      telegramId: telegramUser.id,
      username: telegramUser.username || `user${telegramUser.id}`,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      languageCode: telegramUser.language_code,
    });
  }

  res.status(200).json({
    telegramId: user.telegramId,
    username: user.username,
  });
});

module.exports = {
  authenticateTelegramUser,
};