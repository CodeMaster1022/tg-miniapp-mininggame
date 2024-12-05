const express = require('express');
const app = express();
const { generateMockInitData } = require('./utils/testHelpers');

// Test routes
app.get('/test/init-data', (req, res) => {
  const mockInitData = generateMockInitData();
  res.json({ initData: mockInitData });
});

app.get('/test/game-flow/:telegramId', async (req, res) => {
  try {
    const { telegramId } = req.params;
    
    // Test game state retrieval
    const getResponse = await fetch(`http://localhost:${process.env.PORT}/api/games/${telegramId}`);
    const gameState = await getResponse.json();

    // Test game state update
    const updateData = {
      ...gameState,
      gold: gameState.gold + 100,
    };

    const updateResponse = await fetch(
      `http://localhost:${process.env.PORT}/api/games/${telegramId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }
    );

    res.json({
      initial: gameState,
      updated: await updateResponse.json(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;