const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/team');
router.post('/', TeamController.createTeam);
router.get('/', TeamController.getTeam);
router.patch('/:id', TeamController.updateTeam);
router.delete('/:id', TeamController.deleteTeam);

module.exports = router;
