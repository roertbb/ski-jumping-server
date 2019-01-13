const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const SeriesResult = sequelize.define('series-result', {
    series_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    competition_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
      // references: {
      //   model: 'placements',
      //   key: 'competition_id'
      // }
      // onDelete: 'restrict',
      // onUpdate: 'restrict'
    },
    person_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
      // references: {
      //   model: 'placements',
      //   key: 'person_id'
      // }
      // onDelete: 'restrict',
      // onUpdate: 'restrict'
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

  //SeriesResult.associate = models => {};

  return SeriesResult;
};
