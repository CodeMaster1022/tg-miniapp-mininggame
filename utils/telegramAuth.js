const crypto = require('crypto');

const BOT_TOKEN = process.env.BOT_TOKEN;

function verifyTelegramWebAppData(initData) {
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get('hash');
  urlParams.delete('hash');

  // Sort parameters alphabetically
  const paramsList = Array.from(urlParams.entries())
    .sort(([a], [b]) => a.localeCompare(b));
  
  // Create data check string
  const dataCheckString = paramsList
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  // Create HMAC-SHA256 hash
  const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN)
    .digest();
  
  const generatedHash = crypto
    .createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');

  if (generatedHash !== hash) {
    return null;
  }

  // Parse user data
  const user = JSON.parse(urlParams.get('user'));
  return user;
}

module.exports = {
  verifyTelegramWebAppData,
};