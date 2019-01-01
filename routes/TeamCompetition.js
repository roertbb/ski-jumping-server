const express = require('express');
const router = express.Router();

const teamCompetitionController = require('../controllers/TeamCompetition');
router.post('/', teamCompetitionController.createTeamCompetition);
router.get('/', teamCompetitionController.getTeamCompetitions);
router.get('/:id', teamCompetitionController.getTeamCompetition);
router.patch('/', teamCompetitionController.updateTeamCompetition);
router.delete('/', teamCompetitionController.deleteTeamCompetition);

module.exports = router;
