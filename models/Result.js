const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Result = sequelize.define('result', {
  team_id: {
    type: Sequelize.INTEGER
  },
  place: {
    type: Sequelize.INTEGER(2)
  },
  points: {
    type: Sequelize.INTEGER(3)
  }
});

module.exports = Result;
