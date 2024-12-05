const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
  id: Number,
  type: String,
  level: Number,
  production: Number,
});

const floorSchema = mongoose.Schema({
  id: Number,
  level: Number,
  managers: [managerSchema],
  production: Number,
  capacity: Number,
  upgradeCost: Number,
  saveCapacity: Number,
  bottomPosition: Number,
});

const elevatorSchema = mongoose.Schema({
  eBottomPosition: Number,
  level: Number,
  loadCapacity: Number,
  movementSpeed: Number,
  nextLoadCapacity: Number,
  nextMovementSpeed: Number,
  upgradeCost: Number,
  currentLoad: Number,
});

const gameStateSchema = mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
    unique: true,
  },
  gold: {
    type: Number,
    default: 0,
  },
  tokens: {
    type: Number,
    default: 0,
  },
  tokensClaimed: {
    type: Number,
    default: 0,
  },
  currentProduction: {
    type: Number,
    default: 0,
  },
  floors: [floorSchema],
  currentShaft: {
    type: Number,
    default: 1,
  },
  currentShaftCost: {
    type: Number,
    default: 500,
  },
  elevator: elevatorSchema,
}, {
  timestamps: true,
});

module.exports = mongoose.model('GameState', gameStateSchema);