const SeriesResult = require('../models/SeriesResult');
const { Op } = require('sequelize');

const relationData = {
  create: {
    'series-result': ['person_id', 'competition_id', 'place', 'point']
  },
  search: {
    'series-result': {
      series_id: {
        op: Op.eq
      },
      competition_id: {
        op: Op.eq
      },
      ski_jumper_id: {
        op: Op.eq
      },
      state: {
        op: Op.eq
      },
      distance_to: {
        value: 'distance',
        op: Op.gte
      },
      distance_to: {
        value: 'distance',
        op: Op.lte
      },
      gate_to: {
        value: 'gate',
        op: Op.gte
      },
      gate_to: {
        value: 'gate',
        op: Op.lte
      },
      style_points_to: {
        value: 'style_points',
        op: Op.gte
      },
      style_points_to: {
        value: 'style_points',
        op: Op.lte
      },
      distance_points_to: {
        value: 'distance_points',
        op: Op.gte
      },
      distance_points_to: {
        value: 'distance_points',
        op: Op.lte
      },
      gate_points_to: {
        value: 'gate_points',
        op: Op.gte
      },
      gate_points_to: {
        value: 'gate_points',
        op: Op.lte
      },
      wind_points_to: {
        value: 'wind_points',
        op: Op.gte
      },
      wind_points_to: {
        value: 'wind_points',
        op: Op.lte
      }
    }
  },
  relation: { class: SeriesResult, id: 'series-result' },
  id: ['series_id', 'ski_jumper_id', 'competition_id'],
  name: 'Series Result'
};

// const { get, create, update, del } = require('../utils/compound');

exports.createSeriesResult = async (req, res) => {
  // create(req, res, relationData);
};

exports.getSeriesResult = async (req, res) => {
  // get(req, res, relationData);
};

exports.updateSeriesResult = async (req, res) => {
  // update(req, res, relationData);
};

exports.deleteSeriesResult = async (req, res) => {
  // del(req, res, relationData);
};
