function getInitialGameState() {
    return {
      gold: 100,
      tokens: 0,
      tokensClaimed: 0,
      currentProduction: 0,
      floors: [
        {
          id: 1,
          level: 1,
          managers: [],
          production: 10,
          capacity: 100,
          upgradeCost: 15,
          saveCapacity: 0,
          bottomPosition: 0,
        },
      ],
      currentShaft: 1,
      currentShaftCost: 30,
      elevator: {
        eBottomPosition: 0,
        level: 1,
        loadCapacity: 20,
        movementSpeed: 1.001,
        nextLoadCapacity: 35,
        nextMovementSpeed: 1.002,
        upgradeCost: 14,
        currentLoad: 0,
      },
    };
  }
  
  module.exports = {
    getInitialGameState,
  };