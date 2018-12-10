const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Result = sequelize.define('result', {
  place: {
    type: Sequelize.INTEGER(2)
  },
  point: {
    type: Sequelize.INTEGER(3)
  }
});

module.exports = Result;
