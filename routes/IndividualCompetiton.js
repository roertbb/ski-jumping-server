const express = require('express');
const router = express.Router();

const individualcompetitionController = require('../controllers/IndividualCompetition');
router.post('/', individualcompetitionController.createIndividualCompetition);
router.get('/', individualcompetitionController.getIndividualCompetition);
router.patch('/', individualcompetitionController.updateIndividualCompetition);
router.delete('/', individualcompetitionController.deleteIndividualCompetition);

module.exports = router;
