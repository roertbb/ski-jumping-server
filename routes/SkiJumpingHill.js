const express = require('express');
const router = express.Router();

const SkiJumpingHillController = require('../controllers/SkiJumpingHill');
router.post('/', SkiJumpingHillController.createSkiJumpingHill);
router.get('/', SkiJumpingHillController.getSkiJumpingHills);
router.get('/:id', SkiJumpingHillController.getSkiJumpingHill);
router.patch('/', SkiJumpingHillController.updateSkiJumpingHill);
router.delete('/', SkiJumpingHillController.deleteSkiJumpingHill);

module.exports = router;
