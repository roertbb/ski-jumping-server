const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Placement = sequelize.define('placement', {
  place: {
    type: Sequelize.INTEGER(2)
  },
  point: {
    type: Sequelize.INTEGER(3)
  }
});

module.exports = Placement;
