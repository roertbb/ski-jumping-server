const express = require('express');
const router = express.Router();

const coachController = require('../controllers/Coach');
router.post('/', coachController.createCoach);
router.get('/', coachController.getCoach);
router.patch('/', coachController.updateCoach);
router.delete('/', coachController.deleteCoach);

module.exports = router;
