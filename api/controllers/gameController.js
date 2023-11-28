const Game = require('../models/Game');
const { v4: uuidv4 } = require('uuid');

const startNewGame = async (req, res) => {
    try {
      const { players } = req.body;
  
      const newGame = new Game({
        gameId: uuidv4(),
        killerPoints: 5,
        canRevivePlayers: true,

        players: players.map(player => ({
          playerId: uuidv4(),
          playerName: player.name,
          targetNumber: player.targetNumber,
        })),
      });
  
      await newGame.save();
  
      res.status(201).json({ message: 'New game started', gameId: newGame.gameId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  startNewGame,
};