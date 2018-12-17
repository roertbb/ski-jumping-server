const TeamCompetition = require('./TeamCompetition');
const Result = require('./Result');
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
  },
  classification_points: {
    type: Sequelize.INTEGER(4)
  }
});

Team.belongsToMany(TeamCompetition, {
  through: {
    model: Result,
    unique: false
  },
  primaryKey: true,
  foreignKey: 'team_id',
  otherKey: 'competition_id',
  constraints: true,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

module.exports = Team;
