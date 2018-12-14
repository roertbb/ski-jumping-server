const express = require('express');
const router = express.Router();

const placementController = require('../controllers/Placement');
router.post('/', placementController.createPlacement);
router.get('/', placementController.getPlacement);
router.delete('/', placementController.deletePlacement);

module.exports = router;
