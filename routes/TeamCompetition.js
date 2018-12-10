const express = require('express');
const router = express.Router();

const teamCompetitionController = require('../controllers/TeamCompetition');
router.post('/', teamCompetitionController.createTeamCompetition);
router.get('/', teamCompetitionController.getTeamCompetition);
router.patch('/:id', teamCompetitionController.updateTeamCompetition);
router.delete('/:id', teamCompetitionController.deleteTeamCompetition);

module.exports = router;
