const Competition = require('./Competition');
const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const TeamCompetition = sequelize.define('team-competition', {
  competition_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  }
});

TeamCompetition.belongsTo(Competition, {
  foreignKey: 'competition_id',
  constraints: true,
  primaryKey: true,
  allowNull: false,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

module.exports = TeamCompetition;
