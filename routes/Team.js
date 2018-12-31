const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/team');
router.post('/', TeamController.createTeam);
router.get('/', TeamController.getTeams);
router.patch('/', TeamController.updateTeam);
router.delete('/', TeamController.deleteTeam);

module.exports = router;
