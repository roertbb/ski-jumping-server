const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Team = sequelize.define('team', {
  team_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  team: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  classification: {
    type: Sequelize.INTEGER(2)
  }
});

module.exports = Team;
