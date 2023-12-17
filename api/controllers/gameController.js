const Game = require('../models/Game');
const { v4: uuidv4 } = require('uuid');

const startNewGame = async (req, res) => {
    try {
      const { killerPoints, canRevivePlayers, players } = req.body;
  
      const newGame = new Game({
        gameId: uuidv4(),
        killerPoints: killerPoints,
        canRevivePlayers: canRevivePlayers,

        players: players.map(player => ({
          playerId: uuidv4(),
          playerName: player.name,
          targetNumber: player.targetNumber,
        })),

        currentPlayerIndex: 0,
      });
  
      await newGame.save();
  
      res.status(201).json({ message: 'New game started', gameId: newGame.gameId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const makeMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { hitNumber, timesHit } = req.body;

    const game = await Game.findOne({ gameId });
    const currentPlayer = game.players[game.currentPlayerIndex]

    if (currentPlayer.currentPoints === game.killerPoints) {
      game.players.forEach(async player => {
        if (player.targetNumber === hitNumber) {
          const updatedPoints = player.currentPoints - timesHit;
          await updatePlayerPoints(game.gameId, player.playerId, updatedPoints);
        }
      });
    } else if (currentPlayer.targetNumber === hitNumber) {
      const summedPoints = currentPlayer.currentPoints + timesHit;

      if (summedPoints > game.killerPoints) {
        const pointsOver = summedPoints - game.killerPoints;
        const updatedPoints = game.killerPoints - pointsOver;

        await updatePlayerPoints(game.gameId, currentPlayer.playerId, updatedPoints);
      } else {
        await updatePlayerPoints(game.gameId, currentPlayer.playerId, summedPoints);
      }
    }

    await game.save();

    const updatedGame = await Game.findOne({ gameId });
    res.status(200).json({ message: 'Move successful', gameState: updatedGame });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePlayerPoints = async (gameId, playerId, newPoints) => {

  console.log(gameId, playerId, newPoints)
  await Game.updateOne(
    { gameId, 'players.playerId': playerId },
    { $set: { 'players.$.currentPoints': newPoints } }
  );
};

module.exports = {
  startNewGame,
  getGameById,
  makeMove,
};