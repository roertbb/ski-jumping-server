const express = require('express');
const router = express.Router();

const TournamentController = require('../controllers/tournament');
router.post('/', TournamentController.createTournament);
router.get('/', TournamentController.getTournament);
router.patch('/:id', TournamentController.updateTournament);
router.delete('/:id', TournamentController.deleteTournament);

module.exports = router;
