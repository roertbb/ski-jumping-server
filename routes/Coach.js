const express = require('express');
const router = express.Router();

const coachController = require('../controllers/Coach');
router.post('/', coachController.createCoach);
router.get('/', coachController.getCoach);
router.patch('/:id', coachController.updateCoach);
router.delete('/:id', coachController.deleteCoach);

module.exports = router;
