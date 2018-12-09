const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Tournament = sequelize.define('tournament', {
  tournament_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  edition: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  }
});

module.exports = Tournament;
