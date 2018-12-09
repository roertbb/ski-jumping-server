const express = require('express');
const router = express.Router();

const skiJumpersController = require('../controllers/skiJumper');
router.post('/', skiJumpersController.createSkiJumper);
router.get('/', skiJumpersController.getSkiJumper);
router.patch('/:id', skiJumpersController.updateSkiJumper);
router.delete('/:id', skiJumpersController.deleteSkiJumper);

module.exports = router;
