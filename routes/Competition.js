const express = require('express');
const router = express.Router();

const competitionController = require('../controllers/Competition');
router.get('/', competitionController.getCompetition);

module.exports = router;
