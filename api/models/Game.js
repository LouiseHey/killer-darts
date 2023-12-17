const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },

  killerPoints: {
    type: Number,
    required: true,
    default: 5,
  },

  canRevivePlayers: {
    type: Boolean,
    required: true,
    default: true,
  },

  players: [
    {
      playerId: {
        type: String,
        required: true,
        unique: true,
      },
      playerName: {
        type: String,
        required: true,
      },
      targetNumber: {
        type: Number,
        required: true,
      },
      currentPoints: {
        type: Number,
        required: true,
        default: 0,
      },
      isEliminated: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],

  currentPlayerIndex: {
    type: Number,
    required: true,
    default: 0,
  },

  inProgress: {
    type: Boolean,
    required: true,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;