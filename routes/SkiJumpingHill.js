const express = require('express');
const router = express.Router();

const SkiJumpingHillController = require('../controllers/SkiJumpingHill');
router.post('/', SkiJumpingHillController.createSkiJumpingHill);
router.get('/', SkiJumpingHillController.getSkiJumpingHill);
router.patch('/:id', SkiJumpingHillController.updateSkiJumpingHill);
router.delete('/:id', SkiJumpingHillController.deleteSkiJumpingHill);

module.exports = router;
