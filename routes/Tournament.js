const express = require('express');
const router = express.Router();

const TournamentController = require('../controllers/tournament');
router.post('/', TournamentController.createTournament);
router.get('/', TournamentController.getTournaments);
router.get('/:id', TournamentController.getTournament);
router.patch('/', TournamentController.updateTournament);
router.delete('/', TournamentController.deleteTournament);

module.exports = router;
