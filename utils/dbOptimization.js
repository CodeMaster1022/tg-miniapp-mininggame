const GameState = require('../models/gameStateModel');

let saveQueue = new Map();
let processingQueue = false;

async function processSaveQueue() {
  if (processingQueue || saveQueue.size === 0) return;
  
  processingQueue = true;
  const currentQueue = new Map(saveQueue);
  saveQueue.clear();

  try {
    const operations = Array.from(currentQueue.entries()).map(([telegramId, gameState]) => ({
      updateOne: {
        filter: { telegramId },
        update: gameState,
        upsert: true
      }
    }));

    await GameState.bulkWrite(operations);
  } catch (error) {
    console.error('Bulk write error:', error);
  }

  processingQueue = false;
  if (saveQueue.size > 0) {
    setTimeout(processSaveQueue, 50);
  }
}

function queueGameStateSave(telegramId, gameState) {
  saveQueue.set(telegramId, gameState);
  setTimeout(processSaveQueue, 50);
}

module.exports = {
  queueGameStateSave
};