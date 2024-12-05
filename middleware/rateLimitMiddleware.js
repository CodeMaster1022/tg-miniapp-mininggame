const rateLimit = new Map();

const rateLimitMiddleware = (req, res, next) => {
  const { telegramId } = req.params;
  const now = Date.now();
  const lastUpdate = rateLimit.get(telegramId);

  if (lastUpdate && now - lastUpdate < 900) { // 900ms minimum interval
    return res.status(429).json({ message: 'Too many requests' });
  }

  rateLimit.set(telegramId, now);
  next();
};

module.exports = rateLimitMiddleware;