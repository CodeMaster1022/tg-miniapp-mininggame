const crypto = require('crypto');

function generateMockInitData(userData) {
  const defaultUser = {
    id: '12345',
    first_name: 'Test',
    last_name: 'User',
    username: 'testuser',
    language_code: 'en',
    ...userData
  };

  const params = new URLSearchParams({
    user: JSON.stringify(defaultUser),
    auth_date: Math.floor(Date.now() / 1000).toString(),
    query_id: crypto.randomBytes(8).toString('hex'),
  });

  const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.BOT_TOKEN)
    .digest();

  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const hash = crypto
    .createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');

  params.append('hash', hash);
  return params.toString();
}

module.exports = {
  generateMockInitData,
};