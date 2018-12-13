const express = require('express');
const router = express.Router();

const placementController = require('../controllers/Placement');
router.post('/', placementController.createPlacement);
router.get('/', placementController.getPlacement);
router.patch('/:id', placementController.updatePlacement);
router.delete('/:id', placementController.deletePlacement);

module.exports = router;
