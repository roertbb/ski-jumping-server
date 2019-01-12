const {
  models: { SeriesResult }
} = require('../db');
const { Op } = require('sequelize');

const relationData = {
  create: {
    'series-result': ['person_id', 'competition_id', 'place', 'point']
  },
  relation: { class: SeriesResult, id: 'series-result' },
  id: ['series_id', 'person_id', 'competition_id'],
  name: 'Series Result'
};

exports.createSeriesResult = async (req, res) => {
  try {
    await SeriesResult.create(req.body);
    res.status(200).json({
      status: 'success',
      message: `Series Result created`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: `Couldn't create Series Result`,
      error
    });
  }
};

exports.getSeriesResult = async (req, res) => {
  const { competition_id, person_id, series_id } = req.query;
  try {
    const result = await SeriesResult.find({
      where: { competition_id, person_id, series_id },
      raw: true
    });

    res.status(200).json({
      status: 'success',
      results: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};

exports.updateSeriesResult = async (req, res) => {
  const { competition_id, person_id, series_id } = req.query;
  try {
    const result = await SeriesResult.update(req.body, {
      where: { competition_id, person_id, series_id }
    });

    res.status(200).json({
      status: 'success',
      results: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      error
    });
  }
};

exports.deleteSeriesResult = async (req, res) => {
  // del(req, res, relationData);
};
