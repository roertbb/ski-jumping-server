const express = require('express');
const router = express.Router();

const seriesResultController = require('../controllers/SeriesResults');
router.post('/', seriesResultController.createSeriesResult);
router.get('/', seriesResultController.getSeriesResult);
router.patch('/', seriesResultController.updateSeriesResult);
router.delete('/', seriesResultController.deleteSeriesResult);

module.exports = router;
