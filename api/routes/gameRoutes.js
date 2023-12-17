const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/start', gameController.startNewGame);
router.get('/:gameId', gameController.getGameById);
router.post('/:gameId', gameController.makeMove);
router.post('/endTurn/:gameId', gameController.endTurn);

module.exports = router;