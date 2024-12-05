const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  telegramId: {
    type: String,
    required: [true, 'Telegram ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  firstName: String,
  lastName: String,
  languageCode: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);