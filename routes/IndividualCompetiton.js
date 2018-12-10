const express = require('express');
const router = express.Router();

const individualcompetitionController = require('../controllers/IndividualCompetition');
router.post('/', individualcompetitionController.createIndividualCompetition);
router.get('/', individualcompetitionController.getIndividualCompetition);
router.patch(
  '/:id',
  individualcompetitionController.updateIndividualCompetition
);
router.delete(
  '/:id',
  individualcompetitionController.deleteIndividualCompetition
);

module.exports = router;
