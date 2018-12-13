const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const SeriesResult = sequelize.define('series-result', {
  series_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  competition_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'placements',
      key: 'competition_id'
    },
    constraints: true,
    onDelete: 'restrict',
    onUpdate: 'restrict'
  },
  ski_jumper_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: { model: 'placements', key: 'ski_jumper_id' },
    constraints: true,
    onDelete: 'restrict',
    onUpdate: 'restrict'
  },
  state: {
    type: Sequelize.STRING(3),
    allowNull: false
  },
  distance: {
    type: Sequelize.FLOAT(4, 1)
  },
  gate: {
    type: Sequelize.INTEGER(2)
  },
  style_points: {
    type: Sequelize.FLOAT(4, 1)
  },
  distance_points: {
    type: Sequelize.FLOAT(4, 1)
  },
  gate_points: {
    type: Sequelize.FLOAT(4, 1)
  },
  wind_points: {
    type: Sequelize.FLOAT(4, 1)
  }
});

module.exports = SeriesResult;
