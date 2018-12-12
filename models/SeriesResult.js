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
  }
});

module.exports = SeriesResult;
