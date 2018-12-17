const express = require('express');
const router = express.Router();

const competitionController = require('../controllers/Competition');
router.get('/', competitionController.getCompetition);
router.post('/finish-competition', competitionController.finishCompetition);

module.exports = router;
