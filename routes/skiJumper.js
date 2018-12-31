const express = require('express');
const router = express.Router();

const skiJumpersController = require('../controllers/skiJumper');
router.post('/', skiJumpersController.createSkiJumper);
router.get('/', skiJumpersController.getSkiJumpers);
router.get('/:id', skiJumpersController.getSkiJumper);
router.get('/get-bmi', skiJumpersController.getBmi);
router.patch('/', skiJumpersController.updateSkiJumper);
router.delete('/', skiJumpersController.deleteSkiJumper);

module.exports = router;
