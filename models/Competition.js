const Tournament = require('./Tournament');
const SkiJumpingHill = require('./SkiJumpingHill');

const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Competition = sequelize.define('competition', {
  competition_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  competition_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  start_gate: {
    type: Sequelize.INTEGER(2),
    allowNull: false
  }
});

Competition.belongsTo(Tournament, {
  foreignKey: 'tournament_id',
  constraints: true,
  allowNull: true,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

Competition.belongsTo(SkiJumpingHill, {
  foreignKey: 'hill_id',
  constraints: true,
  allowNull: false,
  onDelete: 'restrict',
  onUpdate: 'restrict'
});

module.exports = Competition;
